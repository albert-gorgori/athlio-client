import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ API key not configured" },
        { status: 500 }
      );
    }
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // # LLaMA 3 API call
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    });

    

    const raw = response.choices[0].message.content ?? "";
    const text = raw.replace(/\\n/g, "\n").trim();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Error generating response:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
