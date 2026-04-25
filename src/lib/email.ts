import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface LeadData {
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceInterestedIn: string;
  monthlyBudgetINR?: string;
  mission?: string;
  createdAt: string;
}

export async function sendAdminNotification(lead: LeadData): Promise<void> {
  const emailUser = process.env.EMAIL_USER;
  if (!emailUser) return;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0D1A; color: #F8FAFC; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7C3AED, #A855F7, #F97316); padding: 32px 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #fff;">🚀 New Lead Received!</h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Planets of Marketing — CRM Alert</p>
      </div>
      <div style="padding: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">Name</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #F8FAFC; font-size: 14px;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #F8FAFC; font-size: 14px;"><a href="mailto:${lead.email}" style="color: #A855F7;">${lead.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #F8FAFC; font-size: 14px;">${lead.phone || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Company</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #F8FAFC; font-size: 14px;">${lead.companyName || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Service</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #F97316; font-size: 14px; font-weight: 600;">${lead.serviceInterestedIn}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Budget</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #F8FAFC; font-size: 14px;">${lead.monthlyBudgetINR || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mission</td>
            <td style="padding: 12px 8px; border-bottom: 1px solid #2A2D45; color: #F8FAFC; font-size: 14px;">${lead.mission || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 8px; color: #94A3B8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Submitted</td>
            <td style="padding: 12px 8px; color: #F8FAFC; font-size: 14px;">${lead.createdAt}</td>
          </tr>
        </table>
      </div>
      <div style="padding: 16px 24px; background: #12152A; text-align: center;">
        <p style="margin: 0; color: #94A3B8; font-size: 12px;">Planets of Marketing — Lead Management System</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Planets of Marketing" <${emailUser}>`,
    to: emailUser,
    subject: `🚀 New Lead: ${lead.name} — ${lead.serviceInterestedIn}`,
    html,
  });
}

export async function sendAutoReply(lead: LeadData): Promise<void> {
  const emailUser = process.env.EMAIL_USER;
  if (!emailUser) return;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0D1A; color: #F8FAFC; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #7C3AED, #A855F7, #F97316); padding: 32px 24px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px; color: #fff;">🚀 Mission Received!</h1>
        <p style="margin: 8px 0 0; color: rgba(255,255,255,0.85); font-size: 14px;">Planets of Marketing</p>
      </div>
      <div style="padding: 32px 24px;">
        <p style="font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Hi <strong>${lead.name}</strong>,</p>
        <p style="font-size: 14px; line-height: 1.7; color: #CBD5E1; margin: 0 0 16px;">
          Thank you for reaching out to Planets of Marketing! We've received your inquiry about <strong style="color: #F97316;">${lead.serviceInterestedIn}</strong> and our team is already reviewing your mission details.
        </p>
        <p style="font-size: 14px; line-height: 1.7; color: #CBD5E1; margin: 0 0 16px;">
          A member of our team will be in touch with you within <strong style="color: #A855F7;">24 hours</strong> with a personalized strategy recommendation.
        </p>
        <p style="font-size: 14px; line-height: 1.7; color: #CBD5E1; margin: 0 0 24px;">
          In the meantime, feel free to reply to this email if you have any additional details to share.
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://planetsofmarketing.in" style="display: inline-block; padding: 12px 32px; background: linear-gradient(135deg, #7C3AED, #A855F7); color: #fff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Visit Our Website</a>
        </div>
        <p style="font-size: 14px; line-height: 1.7; color: #CBD5E1; margin: 0;">
          Best regards,<br />
          <strong style="color: #F8FAFC;">The Planets of Marketing Team</strong>
        </p>
      </div>
      <div style="padding: 16px 24px; background: #12152A; text-align: center;">
        <p style="margin: 0; color: #94A3B8; font-size: 12px;">Banjara Hills, Hyderabad · Telangana 500034</p>
        <p style="margin: 4px 0 0; color: #64748B; font-size: 11px;">You're receiving this because you submitted an inquiry on our website.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Planets of Marketing" <${emailUser}>`,
    to: lead.email,
    subject: `Thanks ${lead.name}! We received your mission 🚀`,
    html,
  });
}
