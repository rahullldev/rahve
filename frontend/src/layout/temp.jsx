import { Navigate, Outlet } from "react-router-dom"
import { useState, useCallback, useContext, useRef } from "react"
import AppSidebar from "@/components/AppSidebar"
import { useForm } from "react-hook-form"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ChatIdsContext } from "@/contexts/chatidscontext"
import { ChatMsgContext } from "@/contexts/chatmsgcontext"
import { ChatContainerRefContext } from "@/contexts/chatcontainerrefcontext"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { Send, Square } from "lucide-react"

const AppLayout = () => {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  const MotionButton = motion.button
  const MotionTrigger = motion(SidebarTrigger)

  const { currentChatId } = useContext(ChatIdsContext)
  const { setMsg } = useContext(ChatMsgContext)
  const { ChatContainerRef } = useContext(ChatContainerRefContext)

  const tempkey = useRef(1)
  const [streaming, setStreaming] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm()

  const cancelOperation = () => {
    // Placeholder — add abort controller later
    setStreaming(false)
  }

  const onSubmit = useCallback(
    async function (data) {
      reset({ chat: "" })

      const userKey = tempkey.current++
      setMsg((prev) => [
        ...prev,
        { key: userKey, role: "user", content: data.chat },
      ])

      const assistantKey = tempkey.current++
      setMsg((prev) => [
        ...prev,
        { key: assistantKey, role: "assistant", content: "" },
      ])

      setStreaming(true)

      // Simulate streaming state
      setTimeout(() => {
        setStreaming(false)
      }, 2000)
    },
    [reset, setMsg]
  )

  return (
    <div className="h-screen flex bg-background text-foreground">

      {/* SIDEBAR */}
      <div className="sidebar">
        <SidebarProvider>
          <AppSidebar />

          {/* Modern Trigger */}
          <MotionTrigger
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="m-3 rounded-xl p-2 hover:bg-primary/10 transition"
          />
        </SidebarProvider>
      </div>

      {/* MAIN */}
      <div className="main flex flex-1 flex-col">

        {/* CHAT AREA */}
        <div
          ref={ChatContainerRef}
          className="flex-1 overflow-y-auto p-6 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.05),transparent_50%)]"
        >
          <div className="max-w-3xl mx-auto">
            <Outlet />
          </div>
        </div>

        {/* INPUT */}
        <div className="w-full flex justify-center py-6 px-4 border-t bg-background/70 backdrop-blur-md">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative w-full max-w-3xl"
          >
            <motion.textarea
              rows={1}
              {...register("chat")}
              placeholder="Message Rahve…"
              initial={{ opacity: 0.9 }}
              animate={{ opacity: 1 }}
              className="
                w-full
                max-h-40
                resize-none
                rounded-3xl
                border
                bg-card
                px-6
                py-4
                pr-16
                text-base
                shadow-sm
                outline-none
                transition
                focus:ring-2
                focus:ring-primary/40
                focus:border-primary/40
              "
              onInput={(e) => {
                e.currentTarget.style.height = "auto"
                e.currentTarget.style.height =
                  e.currentTarget.scrollHeight + "px"
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(onSubmit)()
                }
              }}
            />

            {/* SEND / STOP BUTTON */}
            <MotionButton
              type={streaming ? "button" : "submit"}
              onClick={streaming ? cancelOperation : undefined}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              disabled={isSubmitting}
              className="
                absolute
                right-4
                bottom-4
                h-10
                w-10
                flex
                items-center
                justify-center
                rounded-xl
                bg-primary
                text-primary-foreground
                shadow-md
                transition
              "
            >
              {streaming ? (
                <Square className="h-4 w-4" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </MotionButton>
          </form>
        </div>

      </div>
    </div>
  )
}

export default AppLayout