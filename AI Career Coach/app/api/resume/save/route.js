import { saveResume } from "@/actions/resume";

export async function POST(req) {
  const { content } = await req.json();
  try {
    const result = await saveResume(content);
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
} 