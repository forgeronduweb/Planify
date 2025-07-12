import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma'; // adapte si ton chemin est différent

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const response = NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });

    // 🍪 On crée un cookie "user_id" après l'inscription
    response.cookies.set('user_id', String(newUser.id), {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 jour
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
