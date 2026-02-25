import { useContext, createContext, useRef } from "react"

export const ChatContainerRefContext=createContext()

export const ChatContainerRefProvider=({children})=>{

    const ChatContainerRef=useRef(null)
    return(
        <ChatContainerRefContext.Provider value={{ChatContainerRef}}>
            {children}
        </ChatContainerRefContext.Provider>
    )

}