import { createContext, useEffect, useRef, useState } from "react"

export const ChatIdsContext = createContext([])

export function ChatIdsProvider({ children }) {
  const [chatIds, setChatIds] = useState([])
  const currentChatId= useRef(null)
  useEffect(()=>{
    const chatidloader= async()=>{
      const chats=await((await fetch("/api/chat/get")).json())
      setChatIds(chats)
    }
    chatidloader()

  },[])

  return (
    <ChatIdsContext.Provider value={{ chatIds, setChatIds ,currentChatId}}>
      {children}
    </ChatIdsContext.Provider>
  )
}
