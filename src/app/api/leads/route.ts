import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { sendAdminNotification, sendAutoReply } from '@/lib/email';
import { checkRateLimit } from '@/lib/rateLimit';

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/<[^>]*>/g, '').slice(0, 1000);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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
    const monthlyBudgetINR = sanitize(body.budget);
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

    const now = new Date();
    const createdAt = now.toISOString();

    // MongoDB: upsert by email
    let db;
    try {
      const conn = await connectToDatabase();
      db = conn.db;
    } catch {
      console.error('MongoDB connection failed');
      return NextResponse.json(
        { error: 'Our systems are temporarily unavailable. Please try again in a few minutes.' },
        { status: 503 }
      );
    }

    const leadData = {
      name,
      email,
      phone,
      companyName,
      serviceInterestedIn,
      monthlyBudgetINR,
      mission,
      source: 'website',
    };

    const existingLead = await db.collection('leads').findOne({ email });

    if (existingLead) {
      await db.collection('leads').updateOne(
        { email },
        {
          $set: {
            ...leadData,
            updatedAt: now,
          },
        }
      );
    } else {
      await db.collection('leads').insertOne({
        ...leadData,
        createdAt: now,
        status: 'new',
      });
    }

    // Send emails (non-blocking — don't fail the submission)
    const emailData = { ...leadData, createdAt };

    try {
      await Promise.allSettled([
        sendAdminNotification(emailData),
        sendAutoReply(emailData),
      ]);
    } catch (emailErr) {
      console.error('Email sending failed:', emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Lead submission error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
