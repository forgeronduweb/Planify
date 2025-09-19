import { NextResponse } from 'next/server';
import { prisma } from '../../../../../src/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await prisma.list.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 