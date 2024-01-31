import { RefObject, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

type MessageBoxProps = {
    addMessage(): void;
    messageRef: RefObject<HTMLTextAreaElement>
}

export default function MessageBox({addMessage, messageRef}:MessageBoxProps) {
    const buttonRef  = useRef<HTMLButtonElement>(null)

    return (
        <form className="flex flex-row gap-1" 
        onSubmit={e => {
            e.preventDefault()
            addMessage()
        }}
    >
        <textarea 
        placeholder="write a comment..."                    
        className="resize-none text-sm p-2 basis-5/6 bg-slate-200 shadow-inner border border-blue-300 rounded-md"
        maxLength={200}
        ref={messageRef}
        onKeyUp={(e) => {
            if (e.key === 'Enter' && !e.shiftKey &&  buttonRef.current) {
                buttonRef.current.click()
            }
        }}
        />
        <button type="submit"
        className="basis-1/6 bg-blue-400 hover:bg-blue-500 active:outline-blue-500 active:scale-90 rounded-md flex items-center justify-center text-xl text-white transition-all duration-200"
        ref={buttonRef}
        >
            <IoSend />
        </button>
    </form>
    )
    
}