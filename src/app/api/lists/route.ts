import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const lists = await prisma.list.findMany({ orderBy: { createdAt: 'asc' } });
  return NextResponse.json(lists);
}

export async function POST(req: NextRequest) {
  const { name, emoji } = await req.json();
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });
  const list = await prisma.list.create({ data: { name, emoji } });
  return NextResponse.json(list);
}