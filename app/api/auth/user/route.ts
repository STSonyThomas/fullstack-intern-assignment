import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

interface DecodedToken {
  username: string;
}

// Export a function for the GET method (assuming that's your intention)
export async function GET(req: NextRequest) {
  // Existing logic for handling authorization and user information
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
      return NextResponse.json({ username: decoded.username },{status:200});
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' },{status:401});
    }
  } else {
    return NextResponse.json({ message: 'No token provided' },{status:401});
  }
}

// You can add similar named exports for other HTTP methods if needed
// (e.g., POST, PUT, DELETE)
