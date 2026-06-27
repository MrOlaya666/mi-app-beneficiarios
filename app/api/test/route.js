import { NextResponse } from 'next/server';

export async function GET() {
  const url = process.env.DATABASE_URL;
  return NextResponse.json({
    existe: !!url,
    primeros20: url ? url.substring(0, 20) : 'VACIA'
  });
}