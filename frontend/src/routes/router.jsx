import { createBrowserRouter } from "react-router-dom"
import AppLayout from "@/layout/AppLayout"
import EmptyChat from "@/pages/EmptyChat"
import ChatPage from "@/pages/ChatPage"
import chatLoader from "@/Loaders/ChatLoader"
import MainPage from "@/layout/MainPage"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import AboutPage from "@/pages/AboutPage"
import ContactPage from "@/pages/ContactPage"
import LearnMorePage from "@/pages/LearnMorePage"
import PrivacyPage from "@/pages/PrivacyPage"


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    {
        path: "/about",
        element: <AboutPage />
    },
    {
        path: "/contact",
        element: <ContactPage />
    },
    {
        path: "/learn-more",
        element: <LearnMorePage />
    },
    {
        path: "/privacy",
        element: <PrivacyPage />
    },
    {
        path: "/ai",
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <EmptyChat />,
            },
            {
                path: "chat/:chatId",
                element: <ChatPage />,
                loader: chatLoader
            },
        ],
    },

]

)

export { router }