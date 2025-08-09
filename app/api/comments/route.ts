import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { GetEventCommentResponseDto, PostCommentResponseDto } from "../dto";

// Get comments for specific event
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId") || "";

  try {
    const data = await prisma.comment.findMany({ where: { eventId: eventId } });
    const formatted: GetEventCommentResponseDto = data.map((e) => ({
      id: e.id,
      name: e.name,
      content: e.content,
      createdAt: e.createdAt,
    }));
    return NextResponse.json(formatted, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch comments: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

// Post a comment for specific
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { eventId, name, content } = body;
  try {
    const comment = await prisma.comment.create({
      data: {
        eventId: eventId,
        name: name,
        content: content,
      },
    });

    const formatted: PostCommentResponseDto = {
      success: true,
      name: name,
      content: content,
      createdAt: comment.createdAt,
    };

    return NextResponse.json(formatted, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to post comment: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
