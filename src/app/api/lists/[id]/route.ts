import { NextResponse, NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await prisma.list.delete({ where: { id } });
  return NextResponse.json({ success: true });
}