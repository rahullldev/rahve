import { ChatMsgContext } from "@/contexts/chatmsgcontext"
import { useContext } from "react"

export default async function chatLoader({ params }) {
  const {chatId}=params
  const res = await fetch(`/api/chat/${chatId}`)

  if (!res.ok) {
    throw new Response("Chat not found", { status: 404 })
  }

  const data = await res.json()
  console.log("data from chatloader",chatId,data)
  return {data,chatId}
}

