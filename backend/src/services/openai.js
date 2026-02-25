// import OpenAI from "openai";
// const client = new OpenAI({apiKey:"sk-abcdef1234567890abcdef1234567890abcdef12"});

// const response = await client.responses.create({
//   model: "gpt-5.2",
//   input: "Write a short bedtime story about a unicorn.",
// });

// console.log(response.output_text);

import "dotenv/config";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.SAMBANOVA_API_KEY,
  baseURL: process.env.SAMBANOVA_BASE_URL, // IMPORTANT
});

// export const askOpenaiStream = async function (history, content, res) {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "Meta-Llama-3.1-8B-Instruct", // or whichever SambaNova model you use
//       messages: [
//         ...history, // must be array of { role, content }
//         { role: "user", content }
//       ],
//       stream: true,
//     });

//     let fullResponse = "";

//     for await (const chunk of completion) {
//       const text = chunk.choices?.[0]?.delta?.content;
//       if (text) {
//         fullResponse += text;
//         res.write(text); // stream to frontend
//       }
//     }

//     res.end(); // close stream
//     return fullResponse;

//   } catch (error) {
//     console.error("Streaming error:", error);
//     res.status(500).end();
//   }
// };


export const askOpenaiStream = async ({
  history,
  content,
  res,
  signal
}) => {

  let fullResponse = "";

  try {

    const completion = await openai.chat.completions.create({
      model: "Meta-Llama-3.1-8B-Instruct",
      messages: [
        ...history,
        { role: "user", content }
      ],
      stream: true,
      signal
    });

    for await (const chunk of completion) {

      // Stop if response already closed
      if (res.writableEnded) break;

      const text = chunk.choices?.[0]?.delta?.content;

      if (text) {
        fullResponse += text;
        res.write(text);
      }
    }

    return fullResponse;

  } catch (error) {

    if (error.name === "AbortError") {
      console.log("Model stream aborted.");
      return null;
    }

    console.error("Model API error:", error);

    if (!res.headersSent) {
      res.status(500).json({ error: "Model service unavailable" });
    }

    return null;
  }
};