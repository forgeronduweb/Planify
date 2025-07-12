// app/api/users/route.ts (ou pages/api/users.ts si tu es en pages router)
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}
