import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.event.findMany({
      orderBy: [
        {
          date: "asc",
        },
      ],
    });
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch events: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
