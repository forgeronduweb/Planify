// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Déconnecté' });
  response.cookies.set('user_id', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  });
  return response;
}
