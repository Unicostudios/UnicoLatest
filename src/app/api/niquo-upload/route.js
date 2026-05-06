import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Extracts text from a PDF using OpenAI's file API
async function extractPDFText(base64Data) {
  try {
    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");
    const blob = new Blob([buffer], { type: "application/pdf" });
    const file = new File([blob], "upload.pdf", { type: "application/pdf" });

    // Use OpenAI to extract text via vision on each page
    // For PDFs we send as a user message with document content
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extract all text content from this document. Return only the raw text content — no formatting, no commentary, no preamble. Just the text as it appears in the document.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:application/pdf;base64,${base64Data}`,
              },
            },
          ],
        },
      ],
      max_tokens: 3000,
    });
    return response.choices[0].message.content;
  } catch (e) {
    console.error("PDF extraction error:", e.message);
    return null;
  }
}

// Extracts text/description from an image using GPT-4o vision
async function extractImageContent(base64Data, mimeType) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "This is a business document, brochure, product catalogue, or company material. Extract all relevant business information: company name, products/services, pricing, target customers, unique selling points, contact details, and any other business-relevant content. Return as plain text.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${mimeType};base64,${base64Data}`,
              },
            },
          ],
        },
      ],
      max_tokens: 2000,
    });
    return response.choices[0].message.content;
  } catch (e) {
    console.error("Image extraction error:", e.message);
    return null;
  }
}

export async function POST(request) {
  try {
    const { fileData, fileName, mimeType } = await request.json();

    if (!fileData) {
      return Response.json({ error: "No file data provided" }, { status: 400 });
    }

    let extractedContent = null;

    if (mimeType === "application/pdf") {
      extractedContent = await extractPDFText(fileData);
    } else if (mimeType.startsWith("image/")) {
      extractedContent = await extractImageContent(fileData, mimeType);
    } else {
      return Response.json({ error: "Unsupported file type. Please upload a PDF or image." }, { status: 400 });
    }

    if (!extractedContent) {
      return Response.json({ error: "Could not extract content from file." }, { status: 500 });
    }

    return Response.json({
      success: true,
      content: extractedContent.slice(0, 4000), // Cap at 4000 chars like website scraping
      fileName,
    });

  } catch (error) {
    console.error("Upload API error:", error);
    return Response.json({ error: "Something went wrong processing your file." }, { status: 500 });
  }
}
