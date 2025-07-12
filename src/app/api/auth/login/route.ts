// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: 'Identifiants invalides' }, { status: 401 });
  }

  const response = NextResponse.json({ message: 'Connexion réussie' });

  // 🍪 On crée un cookie "user_id"
  response.cookies.set('user_id', String(user.id), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 jour
  });

  return response;
}
