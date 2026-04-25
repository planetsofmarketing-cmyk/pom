import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

function checkAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;

  const base64 = authHeader.slice(6);
  const decoded = Buffer.from(base64, 'base64').toString('utf-8');
  const [user, pass] = decoded.split(':');

  return user === process.env.ADMIN_USER && pass === process.env.ADMIN_PASS;
}

function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Dashboard"' },
    }
  );
}

// GET /api/admin/leads — list all leads
export async function GET(request: NextRequest) {
  if (!checkAuth(request)) return unauthorizedResponse();

  try {
    const { db } = await connectToDatabase();
    const leads = await db
      .collection('leads')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert ObjectId to string for JSON serialization
    const serialized = leads.map((lead) => ({
      ...lead,
      _id: lead._id.toString(),
      createdAt: lead.createdAt instanceof Date ? lead.createdAt.toISOString() : lead.createdAt,
      updatedAt: lead.updatedAt instanceof Date ? lead.updatedAt.toISOString() : lead.updatedAt,
    }));

    return NextResponse.json({ leads: serialized });
  } catch (error) {
    console.error('Admin Leads GET error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 503 });
  }
}

// PATCH /api/admin/leads — update lead status
export async function PATCH(request: NextRequest) {
  if (!checkAuth(request)) return unauthorizedResponse();

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Missing id or status' }, { status: 400 });
    }

    const validStatuses = ['new', 'contacted', 'converted', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('leads').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 503 });
  }
}

// DELETE /api/admin/leads — delete a lead
export async function DELETE(request: NextRequest) {
  if (!checkAuth(request)) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const result = await db.collection('leads').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Database error' }, { status: 503 });
  }
}
