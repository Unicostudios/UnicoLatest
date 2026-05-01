import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { message } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI assistant for Unico Studios, a digital marketing agency in Bangalore. 
          You help businesses grow through SEO, Paid Ads, Social Media, and Website Development.
          You are friendly, professional and always try to understand the user's business needs.
          At the end of every conversation try to book a discovery call via this link: https://calendly.com/unicostudioss/30min`,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
