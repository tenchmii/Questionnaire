import { PrismaClient } from '../../generated/prisma'; 
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request) {
  console.log("API /api/submit POST request received"); 

  try {
    const data = await request.json();
    console.log("Received data on server:", JSON.stringify(data, null, 2)); 

    const { section, responses } = data;

    if (!section || typeof responses === 'undefined') { 
      console.error("Validation Error: Missing section or responses", { section, responses });
      return NextResponse.json({ success: false, message: "Missing section or responses" }, { status: 400 });
    }

    if (typeof responses !== 'object' && !Array.isArray(responses) && responses !== null) {
        console.error("Validation Error: 'responses' is not a JSON-compatible object or array.", { responses });
        return NextResponse.json({ success: false, message: "'responses' must be a JSON-compatible object or array." }, { status: 400 });
    }


    console.log("Attempting to create form submission in database...");
    const submission = await prisma.formSubmission.create({
      data: {
        section,
        responses, 
      },
    });
    console.log("Form submission successful:", submission);

    return NextResponse.json({ success: true, data: submission }, { status: 201 });
  } catch (error) {
    console.error("ERROR in /api/submit:", error); // Log the full error object
    return NextResponse.json({
        success: false,
        message: "An error occurred while saving the data.",

        errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined,
        errorCode: error.code // Prisma errors often have a code
    }, { status: 500 });
  } finally {
    try {
        await prisma.$disconnect();
        console.log("Prisma client disconnected.");
    } catch (disconnectError) {
        console.error("Error disconnecting Prisma client:", disconnectError);
    }
  }
}