import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';
export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "How to say hello in french?",
      temperature: 0.6,
    });
    const responseText = completion.data.choices[0].text;
    return NextResponse.json({ responseText })
  } catch (error) {
    return NextResponse.json({ error })
  }
}
