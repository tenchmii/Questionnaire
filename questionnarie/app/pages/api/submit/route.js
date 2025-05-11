// app/api/submit/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await prisma.formSubmission.create({
      data: {
        section: body.section,
        responses: body.responses,
      },
    });

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
