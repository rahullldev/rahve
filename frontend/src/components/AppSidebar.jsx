import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { SquarePlus, Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { ChatIdsContext } from "@/contexts/chatidscontext"
import { useAuth } from "@/contexts/auth-context"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "./ui/button"

const MotionMenuItem = motion(SidebarMenuItem)

const AppSidebar = () => {
    const { chatIds, setChatIds, currentChatId } = useContext(ChatIdsContext)
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            })
        } catch (err) { }

        logout()
        navigate("/", { replace: true })
    }
    // useEffect(() => {
    //     const handler = () => setShowProfileMenu(false)
    //     document.addEventListener("click", handler)
    //     return () => document.removeEventListener("click", handler)
    // }, [])

    const createnewchat = async () => {
        const { chatId } = await (
            await fetch("/api/chat/", { method: "POST" })
        ).json()

        setChatIds((prev) => [chatId, ...prev])
    }

    const toggleDark = () => {
        const isDark = document.documentElement.classList.toggle("dark")

        localStorage.setItem("theme", isDark ? "dark" : "light")
    }

    return (
        <Sidebar className="border-r bg-card/80 backdrop-blur-md">

            {/* HEADER */}
            <div className="px-6 pt-6 pb-4">
                <Link
                    to="/"
                    className="flex items-center gap-3 group"
                >
                    {/* Logo */}
                    <img
                        src="/logo.svg"
                        alt="Rahve logo"
                        className="h-8 w-8 transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Brand Text */}
                    <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-3 bg-clip-text text-transparent transition-opacity duration-300 group-hover:opacity-80">
                        Rahve
                    </span>
                </Link>
            </div>

            <SidebarContent className="px-3">

                {/* NEW CHAT */}
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    onClick={createnewchat}
                                    className="bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-xl transition"
                                >
                                    <SquarePlus className="h-4 w-4" />
                                    <span>New chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* CHAT LIST */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground">
                        Your chats
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {chatIds.map((item, index) => {
                                const isActive = currentChatId?.current === item

                                return (
                                    <MotionMenuItem
                                        key={item}
                                        whileHover={{ x: 4 }}
                                        transition={{ type: "spring", stiffness: 300 }}
                                    >
                                        <SidebarMenuButton
                                            asChild
                                            className={`
                                                    rounded-xl transition
                                                    ${isActive
                                                    ? "bg-primary/15 text-primary font-medium"
                                                    : "hover:bg-primary/10 hover:text-primary"
                                                }`}
                                        >
                                            <Link to={`chat/${item}`}>
                                                {`Chat ${index + 1}`}
                                            </Link>
                                        </SidebarMenuButton>
                                    </MotionMenuItem>
                                )
                            })}

                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>

            {/* FOOTER */}
            <SidebarFooter className="px-4 pb-6 space-y-3">

                {/* Profile */}
                {user && (
                    <div className="relative">
                        <div
                            onClick={() => setShowProfileMenu(prev => !prev)}
                            className="cursor-pointer rounded-xl px-3 py-2 bg-muted hover:bg-muted/70 transition text-sm"
                        >
                            <div className="font-medium truncate">
                                {user.email}
                            </div>
                        </div>

                        {showProfileMenu && (
                            <div className="absolute bottom-12 left-0 w-full bg-card border rounded-xl shadow-lg p-2">
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-destructive/10 hover:text-destructive transition"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Footer Row */}
                <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                        Rahve AI
                    </span>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleDark}
                        className="rounded-full"
                    >
                        <Moon className="h-4 w-4 dark:hidden" />
                        <Sun className="hidden h-4 w-4 dark:block" />
                    </Button>
                </div>

            </SidebarFooter>

        </Sidebar>
    )
}

export default AppSidebar