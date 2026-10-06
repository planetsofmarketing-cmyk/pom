import { NextRequest, NextResponse } from 'next/server';
import { sendAdminNotification, sendAutoReply } from '@/lib/email';
import { checkRateLimit } from '@/lib/rateLimit';

const formServiceOptions: Record<string, { choices: string[]; other?: string }> = {
  'SEO & Search Marketing': { choices: ['Search Engine Optimization (SEO)'] },
  'Social Media Marketing': { choices: ['Performance & Social Media Marketing'] },
  'Paid Advertising': {
    choices: ['Meta Ads (Facebook & Instagram)', 'Google Ads (PPC / Search / Display)'],
  },
  'Brand Strategy & Identity': { choices: ['Brand Strategy & Content Creation'] },
  'Content Marketing': { choices: ['Content Writing'] },
  'Email Marketing & Automation': { choices: [], other: 'Email Marketing & Automation' },
  'Website Design & Development': { choices: [], other: 'Website Design & Development' },
  'Analytics & Reporting': { choices: [], other: 'Analytics & Reporting' },
  'Full-Service Package': { choices: ['Full-Funnel Digital Marketing'] },
  'Not Sure — Need Guidance': { choices: [], other: 'Not Sure — Need Guidance' },
};

const formBudgets: Record<string, string> = {
  'under-25k': 'Below ₹25,000 / month',
  '25k-50k': '₹25,000 – ₹50,000 / month',
  '50k-1l': '₹50,000 – ₹1,00,000 / month',
  '1l-3l': 'Above ₹1,00,000 / month',
  '3l+': 'Above ₹1,00,000 / month',
};

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/<[^>]*>/g, '').slice(0, 1000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function readHiddenInput(html: string, name: string): string | undefined {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const input = html.match(
    new RegExp(`<input\\b(?=[^>]*\\bname=["']${escapedName}["'])[^>]*>`, 'i')
  )?.[0];
  const value = input?.match(/\bvalue=["']([^"']*)["']/i)?.[1];

  return value
    ?.replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

async function submitToGoogleForm({
  name,
  email,
  phone,
  company,
  service,
  budget,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}) {
  const formId = process.env.GOOGLE_FORM_ID;
  if (!formId) throw new Error('Google Form is not configured');

  const formUrl = `https://docs.google.com/forms/d/e/${formId}`;
  const formPageResponse = await fetch(`${formUrl}/viewform`, {
    cache: 'no-store',
    signal: AbortSignal.timeout(10000),
  });
  if (!formPageResponse.ok) throw new Error('Could not load the Google Form');

  const formPage = await formPageResponse.text();
  const fbzx = readHiddenInput(formPage, 'fbzx');
  if (!fbzx) throw new Error('Google Form submission token was unavailable');

  const serviceMapping = formServiceOptions[service];
  const formBudget = formBudgets[budget];
  if (!serviceMapping || !formBudget) throw new Error('Invalid service or budget selection');

  const submission = new URLSearchParams();
  submission.set('entry.712829560', name);
  submission.set('entry.904164833', email);
  submission.set('entry.258520928', phone);
  submission.set('entry.467932140', company);
  submission.set('entry.1947788290', formBudget);
  submission.set('entry.95325480', message);
  submission.set('entry.1058610953_sentinel', '');
  submission.set('fvv', readHiddenInput(formPage, 'fvv') ?? '1');
  submission.set('partialResponse', readHiddenInput(formPage, 'partialResponse') ?? '');
  submission.set('pageHistory', readHiddenInput(formPage, 'pageHistory') ?? '0');
  submission.set('fbzx', fbzx);
  submission.set('submissionTimestamp', readHiddenInput(formPage, 'submissionTimestamp') ?? '-1');

  serviceMapping.choices.forEach((choice) => submission.append('entry.1058610953', choice));
  if (serviceMapping.other) {
    submission.append('entry.1058610953', '__other_option__');
    submission.set('entry.1058610953.other_option_response', serviceMapping.other);
  }

  const response = await fetch(`${formUrl}/formResponse`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: submission,
    redirect: 'follow',
    cache: 'no-store',
    signal: AbortSignal.timeout(15000),
  });
  const responseText = await response.text();
  if (!response.ok || /there was a problem with your submission/i.test(responseText)) {
    throw new Error('Google Form did not accept the submission');
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const { allowed } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check — if filled, reject silently (return success to fool bots)
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    // Sanitize inputs
    const name = sanitize(body.name);
    const email = sanitize(body.email);
    const phone = sanitize(body.phone);
    const companyName = sanitize(body.company);
    const serviceInterestedIn = sanitize(body.service);
    const monthlyBudgetINR = typeof body.budget === 'string' ? body.budget.trim() : '';
    const mission = sanitize(body.message);

    // Server-side validation
    if (!name || name.length < 2) {
      return NextResponse.json({ error: 'Name is required (min 2 characters).' }, { status: 400 });
    }
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!serviceInterestedIn) {
      return NextResponse.json({ error: 'Please select a service.' }, { status: 400 });
    }
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }
    if (!companyName || !mission) {
      return NextResponse.json(
        { error: 'Company or website and project goals are required.' },
        { status: 400 }
      );
    }
    if (!formBudgets[monthlyBudgetINR]) {
      return NextResponse.json({ error: 'Please select a monthly budget.' }, { status: 400 });
    }

    const leadData = {
      name,
      email,
      phone,
      companyName,
      serviceInterestedIn,
      monthlyBudgetINR: formBudgets[monthlyBudgetINR],
      mission,
      source: 'website',
    };

    await submitToGoogleForm({
      name,
      email,
      phone,
      company: companyName,
      service: serviceInterestedIn,
      budget: monthlyBudgetINR,
      message: mission,
    });

    const createdAt = new Date().toISOString();
    const emailData = { ...leadData, createdAt };

    await Promise.allSettled([
      sendAdminNotification(emailData),
      sendAutoReply(emailData),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead submission error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Something went wrong. Please try again.' },
      { status: 502 }
    );
  }
}
