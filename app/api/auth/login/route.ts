import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

export async function POST(req: NextRequest) {
    const { username, password } = await req.json();

    if (username === 'admin' && password === 'admin') {
      const token = await jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
      return NextResponse.json({ token },{status:200});
    } else {
      return NextResponse.json({ message: 'Invalid credentials' },{status:401});
    }
}
