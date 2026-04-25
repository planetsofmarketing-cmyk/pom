import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    let { username, password } = body;
    username = username?.trim();

    const expectedUser = process.env.ADMIN_USER;
    const expectedPass = process.env.ADMIN_PASS;

    // More detailed debugging
    console.log('=== LOGIN DEBUG ===');
    console.log('Input username:', username);
    console.log('Input password:', password);
    console.log('Expected user:', expectedUser);
    console.log('Expected pass:', expectedPass);
    console.log('User match:', username === expectedUser);
    console.log('Pass match:', password === expectedPass);
    console.log('Pass length check:', password?.length, expectedPass?.length);
    console.log('==================');

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate against environment variables
    if (username === expectedUser && password === expectedPass) {
      const token = Buffer.from(`${username}:${password}`).toString('base64');
      return NextResponse.json({ 
        success: true, 
        token,
        user: username
      });
    }

    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}