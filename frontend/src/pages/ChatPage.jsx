import { useLoaderData } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { useContext, useEffect, useRef, useState } from "react"
import { ChatMsgContext } from "@/contexts/chatmsgcontext"
import { ChatIdsContext } from "@/contexts/chatidscontext"
import { Button } from "@/components/ui/button"
import { CircleChevronDown } from "lucide-react"
import { ChatContainerRefContext } from "@/contexts/chatcontainerrefcontext"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatPage() {
  const { data, chatId } = useLoaderData()

  const { Msg, setMsg, tempChatId } = useContext(ChatMsgContext)
  const { currentChatId } = useContext(ChatIdsContext)
  const bottomRef = useRef(null)
  const containerRef = useRef(null)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const { ChatContainerRef } = useContext(ChatContainerRefContext)

  useEffect(() => {
    currentChatId.current = chatId
    console.log("data from chatpage:", chatId, data)
    if (!(tempChatId.current == chatId)) {
      setMsg(data)
    }
    return (() => {
      currentChatId.current = null
    })
  }, [chatId])

  // Auto-scroll when near bottom
  useEffect(() => {
    if (!containerRef.current) return

    const { scrollHeight, clientHeight, scrollTop } = containerRef.current
    if (scrollHeight - scrollTop - clientHeight < 100) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [Msg.length])

  // Scroll button visibility
  useEffect(() => {
    const container = ChatContainerRef.current
    if (!container) return

    function handleScroll() {
      const { scrollHeight, scrollTop, clientHeight } = container
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100
      setShowScrollBtn(!isAtBottom)
    }

    container.addEventListener("scroll", handleScroll)
    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="space-y-6 pb-10">

      <AnimatePresence initial={false}>
        {Msg.map((item) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex w-full ${item.role === "user" ? "justify-end" : "justify-start"
              }`}
          >
            <div
              className={`
                max-w-[75%]
                rounded-2xl
                px-5
                py-3
                text-sm
                shadow-sm
                transition
                ${item.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border text-foreground"
                }
              `}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div ref={bottomRef} />

      {/* Modern Scroll Button */}
      {showScrollBtn && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-8"
        >
          <Button
            size="icon"
            onClick={() =>
              bottomRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="rounded-full shadow-lg bg-primary hover:opacity-90 transition"
          >
            <CircleChevronDown className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </div>
  )
}