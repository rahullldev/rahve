// import "dotenv/config"
// import { GoogleGenAI } from "@google/genai";
// console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);



// // The client gets the API key from the environment variable `GEMINI_API_KEY`.
// const ai = new GoogleGenAI({});

// const askai=async function main(history,content) {
//   console.log("inside ai function")
//   const chat = ai.chats.create({
//     model: "gemini-3-flash-preview",
//     history

//   })
//   console.log("ai history created")
//   const response =await chat.sendMessage({
//     message: content,
//   });
//   console.log(response.text);
//   return response.text
// }

// export default askai

import "dotenv/config"
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

// ------------------------
// LLM Chat Function
// ------------------------
export const askai = async function (history, content) {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",   // use stable model
    history
  })

  const response = await chat.sendMessageStream({
    message: content
  })

  console.log(response.text);

  return response.text
}

export const askaiStream = async function (history, content, res) {
  const chat = ai.chats.create({
    model: "gemini-2.0-flash",
    history
  })

  const stream = await chat.sendMessageStream({
    message: content
  })

  let fullResponse = ""

  for await (const chunk of stream) {
    const text = chunk.text
    if (text) {
      fullResponse += text
      res.write(text) // stream to client
    }
  }

  return fullResponse
}

// ------------------------
// Embedding Function
// ------------------------
export const embed = async function () {
  const result = await ai.models.embedContent({
    model: "text-embedding-004",
    contents: text
  })

  console.log("embeddings",result)

  return result.embeddings[0].values
}


