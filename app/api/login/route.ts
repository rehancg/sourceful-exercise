import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const token = `dummy_token_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Return dummy user data
    const user = {
      id: '1',
      email,
      name: email.split('@')[0],
      balance: 16,
      tier: "free",
    };

    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

