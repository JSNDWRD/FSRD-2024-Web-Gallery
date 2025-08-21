import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, content, eventId } = body;
  try {
    const res = await prisma.comment.create({
      data: {
        name: name,
        content: content,
        eventId: eventId,
      },
    });
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to post comment: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
