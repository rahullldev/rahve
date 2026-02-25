import { Chat, Message,Contact } from "../dbschema.js"
import { askai,askaiStream, embed } from "../services/gemini.js"
import { askOpenaiStream } from "../services/openai.js"
// console.log("STEP 1")

// import { Chat, Message } from "../dbschema.js"
// console.log("STEP 2")

// import askai from "../services/gemini.js"
// console.log("STEP 3")

export const createChat = async (req, res) => {
  const chat = await Chat.create({ userId: req.user._id })
  res.json({ chatId: chat._id })
}

export const getChats = async (req, res) => {
  const chats = await Chat.find(
    { userId: req.user._id },
    { _id: 1 }
  ).sort({ createdAt: -1 });

  const chatIds = chats.map(chat => chat._id);

  res.json(chatIds);
};

export const getChatMessages = async (req, res) => {
  const { chatId } = req.params
  console.log(chatId,req.user._id)

  const chat = await Chat.findOne({
    _id: chatId,
    userId: req.user._id
  })

  if (!chat) {
    return res.status(404).json({ error: "Chat not found" })
  }

  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 })

  const history = messages.map(item => ({
    key: item._id,
    role: item.role,
    content: item.content
  }))

  res.json(history)
}

// export const sendMessage = async (req, res) => {
//   const { chatId } = req.params
//   const { content } = req.body

//   if (!content) {
//     return res.status(400).json({ error: "message content required" })
//   }

//   const chat = await Chat.findOne({
//     _id: chatId,
//     userId: req.user._id
//   })

//   if (!chat) {
//     return res.status(404).json({ error: "Chat not found" })
//   }

//   const messages = await Message.find({ chatId })
//     .sort({ createdAt: 1 })

//   const history = messages.map(item => ({
//     role: item.role === "assistant" ? "model" : "user",
//     parts: [{ text: item.content }]
//   }))

//   await Message.create({
//     chatId,
//     role: "user",
//     content
//   })

//   const aiResponse = await askai(history, content)

//   await Message.create({
//     chatId,
//     role: "assistant",
//     content: aiResponse
//   })

//   res.json({ aiResponse })
// }


// export const sendMessage = async (req, res) => {
//   try {
//     const { chatId } = req.params
//     const { content } = req.body

//     if (!content) {
//       return res.status(400).json({ error: "message content required" })
//     }

//     const chat = await Chat.findOne({
//       _id: chatId,
//       userId: req.user._id
//     })

//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" })
//     }

//     const messages = await Message.find({ chatId })
//       .sort({ createdAt: 1 })

//     // const history = messages.map(item => ({
//     //   role: item.role === "assistant" ? "model" : "user",
//     //   parts: [{ text: item.content }]
//     // }))
//     const history = messages.map(item => ({
//       role: item.role,
//       content:item.content
//     }))

//     // Save user message first
//     await Message.create({
//       chatId,
//       role: "user",
//       content
//     })

//     // Set streaming headers once
//     res.setHeader("Content-Type", "text/plain; charset=utf-8")
//     res.setHeader("Transfer-Encoding", "chunked")

//     // Stream response
//     const fullResponse = await askOpenaiStream(history, content, res)

//     // Save assistant message AFTER stream completes
//     await Message.create({
//       chatId,
//       role: "assistant",
//       content: fullResponse
//     })

//     res.end()

//   } catch (error) {
//     console.error("Streaming error:", error)
//     if (!res.headersSent) {
//       res.status(500).json({ error: "Something went wrong" })
//     }
//   }
// }

export const sendMessage = async (req, res) => {

  const controller = new AbortController();
  let aborted = false;

  try {
    const { chatId } = req.params;
    const { content } = req.body;

    if (!content?.trim()) {
      return res.status(400).json({ error: "message content required" });
    }

    const chat = await Chat.findOne({
      _id: chatId,
      userId: req.user._id
    });

    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    // Detect client disconnect
    req.on("close", () => {
      aborted = true;
      controller.abort();
      console.log("Client disconnected. Aborting stream.");
    });

    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 });

    const history = messages.map(item => ({
      role: item.role,
      content: item.content
    }));


    // Set streaming headers
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");

    // Stream AI response
    const fullResponse = await askOpenaiStream({
      history,
      content,
      res,
      signal: controller.signal
    });

    // Save user message first
    await Message.create({
      chatId,
      role: "user",
      content
    });

    // Save assistant message ONLY if not aborted
    if (!aborted && fullResponse) {
      await Message.create({
        chatId,
        role: "assistant",
        content: fullResponse
      });
    }

    if (!res.writableEnded) {
      res.end();
    }

  } catch (error) {

    if (error.name === "AbortError") {
      console.log("Request safely aborted.");
      return;
    }

    console.error("Streaming error:", error);

    if (!res.headersSent) {
      res.status(500).json({ error: "Something went wrong" });
    } else if (!res.writableEnded) {
      res.write("\n\n⚠️ Server error occurred.");
      res.end();
    }
  }
};


export const submitContact = async (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" })
  }

  await Contact.create({ name, email, message })

  res.json({ message: "Message stored successfully" })
}





// export const sendMessage = async (req, res) => {
//   try {
//     const { chatId } = req.params
//     const { content } = req.body

//     if (!content) {
//       return res.status(400).json({ error: "message content required" })
//     }

//     const chat = await Chat.findOne({
//       _id: chatId,
//       userId: req.user._id
//     })

//     if (!chat) {
//       return res.status(404).json({ error: "Chat not found" })
//     }

//     // -----------------------------
//     // 1️⃣ Embed user query
//     // -----------------------------
//     const queryEmbedding = await embed(content)

//     // -----------------------------
//     // 2️⃣ Retrieve relevant chunks
//     // -----------------------------
//     const vectorResults = await Message.aggregate([
//       {
//         $vectorSearch: {
//           index: "vector_index",
//           queryVector: queryEmbedding,
//           path: "embedding",
//           numCandidates: 100,
//           limit: 5
//         }
//       },
//       {
//         $match: { chatId }
//       }
//     ])

//     const retrievedContext = vectorResults
//       .map(item => `${item.role}: ${item.content}`)
//       .join("\n")

//     // -----------------------------
//     // 3️⃣ Get last 3 recent messages (short-term memory)
//     // -----------------------------
//     const recentMessages = await Message.find({ chatId })
//       .sort({ createdAt: -1 })
//       .limit(3)

//     const recentContext = recentMessages
//       .reverse()
//       .map(item => `${item.role}: ${item.content}`)
//       .join("\n")

//     // -----------------------------
//     // 4️⃣ Save user message (raw)
//     // -----------------------------
//     const userMessage = await Message.create({
//       chatId,
//       role: "user",
//       content,
//       embedding: queryEmbedding
//     })

//     // -----------------------------
//     // 5️⃣ Build final prompt
//     // -----------------------------
//     const finalPrompt = `
// You are an intelligent assistant.

// Relevant long-term memory:
// ${retrievedContext || "None"}

// Recent conversation:
// ${recentContext || "None"}

// User: ${content}

// Answer clearly.

// After answering, provide a short semantic summary of this turn in this format:

// ---SUMMARY---
// <short summary>
// ---END---
// `

//     // -----------------------------
//     // 6️⃣ Call Gemini LLM
//     // -----------------------------
//     const aiRawResponse = await askai(finalPrompt)

//     // -----------------------------
//     // 7️⃣ Extract summary using regex
//     // -----------------------------
//     const summaryMatch = aiRawResponse.match(
//       /---SUMMARY---([\s\S]*?)---END---/
//     )

//     const summary = summaryMatch
//       ? summaryMatch[1].trim()
//       : content.slice(0, 200) // fallback

//     const cleanResponse = aiRawResponse
//       .replace(/---SUMMARY---([\s\S]*?)---END---/, "")
//       .trim()

//     // -----------------------------
//     // 8️⃣ Embed summary
//     // -----------------------------
//     const summaryEmbedding = await embed(summary)

//     // -----------------------------
//     // 9️⃣ Save assistant message
//     // -----------------------------
//     await Message.create({
//       chatId,
//       role: "assistant",
//       content: cleanResponse,
//       embedding: summaryEmbedding
//     })

//     return res.json({ aiResponse: cleanResponse })

//   } catch (error) {
//     console.error("RAG error:", error)
//     return res.status(500).json({ error: "Something went wrong" })
//   }
// }

