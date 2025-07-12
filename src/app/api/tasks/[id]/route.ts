// PATCH, DELETE
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { status, title, description, priority, category } = await req.json();

  const updatedTask = await prisma.task.update({
    where: { id: Number(params.id) },
    data: {
      ...(status !== undefined && {
        status,
        completedAt: status === 'accomplie' ? new Date() : null,
      }),
      ...(title !== undefined && { title }),
      ...(description !== undefined && { description }),
      ...(priority !== undefined && { priority }),
      ...(category !== undefined && { category }),
    },
  });

  return NextResponse.json(updatedTask);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await prisma.task.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: 'Tâche supprimée' });
}
