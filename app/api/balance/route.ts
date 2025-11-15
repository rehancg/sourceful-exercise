import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    balance: 16,
    tier: 'free',
    resetDate: '2035-11-12T20:51:38.818Z',
  };

  return NextResponse.json({
    data,
    error: null,
  });
}

