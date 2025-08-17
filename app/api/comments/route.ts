import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await prisma.comment.findMany({
      include: { event: { select: { title: true } } },
    });
    const formatted = data.map((e) => ({
      name: e.name,
      id: e.id,
      createdAt: e.createdAt,
      eventId: e.eventId,
      content: e.content,
      eventName: e.event.title,
    }));
    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch comments: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
