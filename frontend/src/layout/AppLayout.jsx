import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import AppSidebar from "@/components/AppSidebar";
import { useForm } from "react-hook-form";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChatIdsContext, ChatIdsProvider } from "@/contexts/chatidscontext";
import { Button } from "@/components/ui/button";
import { ChatMsgContext, ChatMsgProvider } from "@/contexts/chatmsgcontext"
import { ChatContainerRefContext } from "@/contexts/chatcontainerrefcontext";
import { motion } from "motion/react"
import { useAuth } from "@/contexts/auth-context"
import { Send, Square } from "lucide-react"


const AppLayout = () => {
    const { user, loading } = useAuth()
    console.log(user, loading)

    if (loading) return null

    if (!user) {
        return <Navigate to="/login" replace />
    }

    const MotionButton = motion.button
    const MotionTrigger = motion(SidebarTrigger)
    const navigate = useNavigate()

    const { chatIds, setChatIds, currentChatId } = useContext(ChatIdsContext)
    const { Msg, setMsg, tempChatId } = useContext(ChatMsgContext)
    const { ChatContainerRef } = useContext(ChatContainerRefContext)
    const tempkey = useRef(1)
    const [streaming, setStreaming] = useState(false)
    const abortRef = useRef(null)
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm()
    const chatValue = watch("chat")
    const cancelOperation = () => {
        abortRef.current?.abort();
    };
    useEffect(() => {
        function handleFill(e) {
            setValue("chat", e.detail, {
                shouldDirty: true,
                shouldTouch: true,
            })
        }

        window.addEventListener("fillPrompt", handleFill)
        return () => window.removeEventListener("fillPrompt", handleFill)
    }, [setValue])

    const onSubmit = useCallback(async function (data) {

        if (!data.chat?.trim()) return;

        // Prevent double-send while streaming
        if (streaming) return;
        if (!currentChatId.current) {
            const { chatId } = await (
                await fetch("/api/chat/", { method: "POST" })
            ).json()

            setChatIds((prev) => [chatId, ...prev])
            currentChatId.current = chatId
            tempChatId.current = chatId
            navigate(`chat/${chatId}`)
        }



        // Reset input immediately
        reset({ chat: "" });

        // Create fresh abort controller
        abortRef.current = new AbortController();

        // 1️⃣ Add user message
        const userKey = tempkey.current++;
        setMsg(prev => [
            ...prev,
            { key: userKey, role: "user", content: data.chat }
        ]);

        // 2️⃣ Add assistant placeholder
        const assistantKey = tempkey.current++;
        setMsg(prev => [
            ...prev,
            { key: assistantKey, role: "assistant", content: "" }
        ]);

        setStreaming(true);

        try {

            const response = await fetch(
                `/api/chat/${currentChatId.current}/message`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ content: data.chat }),
                    signal: abortRef.current.signal
                }
            );

            // ❗ Handle server errors (500, 400 etc.)
            if (!response.ok) {
                throw new Error(`Server error: ${response.status}`);
            }

            if (!response.body) {
                throw new Error("No response body");
            }
            console.log("streaming started")

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");

            let fullText = "";

            while (true) {

                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                fullText += chunk;

                setMsg(prev =>
                    prev.map(msg =>
                        msg.key === assistantKey
                            ? { ...msg, content: fullText }
                            : msg
                    )
                );
            }

        } catch (err) {

            if (err.name === "AbortError") {
                console.log("User aborted stream");
                // Optional: mark message as stopped
                setMsg(prev =>
                    prev.map(msg =>
                        msg.key === assistantKey
                            ? { ...msg, content: msg.content + " ⛔" }
                            : msg
                    )
                );

            } else {

                console.error("Network / Server error:", err);

                // Show safe fallback message
                setMsg(prev =>
                    prev.map(msg =>
                        msg.key === assistantKey
                            ? {
                                ...msg,
                                content: "⚠️ Something went wrong. Please try again."
                            }
                            : msg
                    )
                );
            }

        } finally {

            setStreaming(false);
            console.log("streaming ended")
            abortRef.current = null;
        }

    }, [reset, setMsg, streaming]);



    return (
        <div className=" h-screen flex bg-background text-foreground">
            {/* <Topbar className="h-14 flex-none bg-[#2e2e2e]   border-slate-200" /> */}
            {/* <div className="flex flex-1 " > */}

            <div className="sidebar">
                <SidebarProvider>
                    <AppSidebar />
                    <MotionTrigger
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="m-3 rounded-xl p-2 hover:bg-primary/10 transition"
                    />
                </SidebarProvider>
            </div>
            <div className="main flex flex-1 flex-col " >
                <div ref={ChatContainerRef} className=" flex-1 overflow-y-auto p-4  " >
                    <Outlet />

                </div>
                <div className="  formcontainer w-full flex justify-center  py-5">

                    <form className=" relative w-full  max-w-3xl flex  rounded-2xl border px-4 py-3 bg-background" onSubmit={handleSubmit(onSubmit)} >
                        <textarea
                            rows={1}
                            {...register("chat")}
                            initial={{ opacity: 0.9 }}
                            animate={{ opacity: 1 }}
                            className="
    w-full
    max-h-40
    resize-none
    border-0
    shadow-none
    outline-none
    pr-12
    text-base
    leading-6
    text-inherit
    
  " placeholder="Message Rahve…"
                            onInput={(e) => {
                                e.currentTarget.style.height = "auto"
                                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px"
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    if (!chatValue?.trim())
                                        return
                                    handleSubmit(onSubmit)()
                                }
                            }}
                        />

                        <MotionButton
                            type={streaming ? "button" : "submit"}
                            onClick={streaming ? cancelOperation : undefined}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={streaming ? false : !chatValue?.trim()}
                            className={`absolute bottom-2 right-2 h-8 w-8 rounded-xl flex
  justify-center items-center transition
  ${streaming
                                    ? "bg-destructive  shadow-md hover:opacity-90"
                                    : !chatValue?.trim()
                                        ? "bg-muted text-muted-foreground cursor-not-allowed opacity-60"
                                        : "bg-primary text-primary-foreground shadow-md hover:opacity-90"
                                }
`}
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