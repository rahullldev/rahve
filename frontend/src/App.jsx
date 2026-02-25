import './App.css'
import { router } from "@/routes/router"
import { RouterProvider } from 'react-router-dom'
import { ChatMsgProvider } from './contexts/chatmsgcontext'
import { ChatIdsProvider } from './contexts/chatidscontext'
import { ChatContainerRefProvider } from "./contexts/chatcontainerrefcontext"
import { AuthProvider } from "@/contexts/auth-context"


function App() {


  return (
    <AuthProvider>
      <ChatIdsProvider>
        <ChatMsgProvider>
          <ChatContainerRefProvider>
            <RouterProvider router={router}>


            </RouterProvider>
          </ChatContainerRefProvider>
        </ChatMsgProvider>
      </ChatIdsProvider>
    </AuthProvider>




  )
}

export default App
