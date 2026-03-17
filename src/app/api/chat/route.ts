import { NextRequest, NextResponse } from "next/server";
import { processMessage } from "@/services/chatService";

/**
 * POST /api/chat
 * Processes a user's French message and returns a chatbot response
 * with French/English text, grammar feedback, and optional image challenge.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, messageCount } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Simulate slight delay for natural conversation feel
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = processMessage(message, messageCount ?? 0);
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
