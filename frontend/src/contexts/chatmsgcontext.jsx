import { createContext, useRef, useState } from "react";

export const ChatMsgContext= createContext()

export function ChatMsgProvider({children}){
    const[Msg,setMsg]=useState([])
    const tempChatId = useRef(null)

    return(
        <ChatMsgContext.Provider value={{Msg,setMsg,tempChatId}}>
            {children}
        </ChatMsgContext.Provider>
    )

}