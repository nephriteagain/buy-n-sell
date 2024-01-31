import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState, useRef } from "react"
import { faker } from '@faker-js/faker'
import posts from 'sample.json'

import { SlLike } from "react-icons/sl";
import { FiMessageSquare } from "react-icons/fi";
import { FaRegComment } from "react-icons/fa";
import { IoMdClose } from "react-icons/io"

import CommentBox from "~/components/CommentBox"
import MessageBox from "~/components/MessageBox"

const fakeComments = Array.from({length:10}, () => {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        comment: faker.lorem.sentence({min:4, max: 15})
    }
})

const fakeMessages = Array.from({length:5}, () => {
    return {
        id: faker.string.uuid(),                
        message: faker.lorem.sentence({min:6, max: 20}),
        isSelfMsg: Boolean(Math.random() > 0.5),
        date: faker.date.recent({days:6})
    }
})

export async function loader({params}: LoaderFunctionArgs) {
    const post = posts.find(post => post.id === params.id)
    if (!post) {
        throw new Response('not found', {status:404})
    }
    return json(post)
}

export default function Post() {
    const {title, price, description, seller} = useLoaderData<typeof loader>()
    const [isCommentsShown, setIsCommentsShown] = useState(false)
    const [isMessageShown, setIsMessageShown] = useState(false)
    const [comments, setComments] = useState(fakeComments)
    const [messages, setMessages] = useState(fakeMessages)
    const commentRef = useRef<HTMLTextAreaElement>(null)
    const messageRef = useRef<HTMLTextAreaElement>(null)

    function addComment() {
        if (!commentRef.current) return
        const textarea = commentRef.current;
        const msg = textarea.value;
        if (!msg) return     
        textarea.value = ''
        const newComment  = {
            id: faker.string.uuid(),
            name:  faker.person.fullName(),
            comment: msg
        }
        const newComments = [newComment, ...comments]
        setComments(newComments)
    }

    function addMessage() {
        if (!messageRef.current) return;
        const textarea = messageRef.current;        
        const msg = textarea.value
        if (!msg) return;
        textarea.value = '';
        const newMessage = {
            id: faker.string.uuid(),                
            message: msg,
            isSelfMsg: true,
            date: new Date(Date.now())
        }
        setMessages(m => [...m, newMessage])
    
    }


    return (
        <>
        <div 
        className="flex flex-col gap-2 bg-slate-200 border-2 border-blue-300 rounded-lg px-4 py-2 shadow-lg w-[420px]"
        >
            <p className="font-bold text-2xl">{title}</p>
            <p className="font-semibild text-lg opacity-70">{seller}</p>
            <p className="w-1/2 text-sm">{description}</p>
            <div className="aspect-square w-[250px] rounded-lg bg-gray-300">
                <img 
                src="https://picsum.photos/250" 
                className="rounded-lg shadow-lg" 
                alt="post image"
                />
            </div>
            <p className="mt-auto w-fit bg-green-300 text-green-950 p-1 font-bold rounded-md shadow-sm">$ {price}</p>
            <hr className="border border-blue-200" />
            <div className="flex flex-row gap-4">
                <button 
                type="button" 
                className="flex flex-row gap-2 items-center text-lg border border-blue-300 px-2 py-1 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 active:bg-blue-500 active:scale-90  transition-all duration-200"
                >
                    <span>like</span>
                    <SlLike />
                </button>
                <button 
                type="button" 
                className="flex flex-row gap-2 items-center text-lg border border-blue-300 px-2 py-1 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 active:bg-blue-500 active:scale-90  transition-all duration-200"
                onClick={() => setIsCommentsShown(comment => !comment)}
                >
                    <span>comment</span>
                    <FaRegComment />
                </button>
                <button 
                type="button" 
                className="flex flex-row gap-2 items-center text-lg border border-blue-300 px-2 py-1 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 active:bg-blue-500 active:scale-90  transition-all duration-200"
                onClick={() => setIsMessageShown(msg => !msg)}
                >
                    <span>message</span>
                    <FiMessageSquare />
                </button>
            </div>
                { isCommentsShown && <>
                <hr className="border-2 border-blue-300" />
                <CommentBox 
                addComment={addComment} 
                commentRef={commentRef}
                />
                <ul
                className="p-2 bg-slate-100 rounded-lg shadow-inner flex flex-col gap-2"
                >
                    {comments.map(({id, name, comment}) => {
                        return (
                            <li key={id}>
                                <p className="font-semibold">{name}</p>
                                <p className="opacity-85 border-b border-blue-200 p-2 text-sm">{comment}</p>
                            </li>
                        )
                    })}
                </ul>
                </> }
        </div>    
        { isMessageShown && 
        <div className={
            `fixed bottom-0 right-8 border-2 flex flex-col gap-2 border-blue-300 shadow-lg rounded-lg w-[300px] h-[420px] bg-slate-100 px-3 py-2`}
        >
            <div className="flex flex-row items-center">
                <p className="font-semibold text-lg border-b border-blue-300">{seller}</p>
                <button 
                type="button"
                className="ms-auto text-xl p-1 rounded-full hover:bg-gray-300 hover:scale-105 active:scale-105 transition-all duration-150"
                onClick={() => setIsMessageShown(false)}
                >
                <IoMdClose />
                </button>                
            </div>
            
            <ul className="bg-gray-200 shadow-inner shadow-gray-400   p-2 flex flex-col gap-4 h-[300px] overflow-y-auto">
                {messages.map(({id, message, isSelfMsg, date}) => (
                    <li key={id} className={`w-5/6 ${isSelfMsg? 'ms-auto text-right' : ''}`}>
                        <p className={`
                        ${isSelfMsg ? 'ms-auto bg-blue-500 text-white' : 'me-auto border-2 border-blue-500'}
                        w-fit px-2 py-1 rounded-md shadow-md
                        `}
                        >
                            {message}
                        </p>
                        <p className="text-sm opacity-70 italic">
                            {date.toDateString()}
                        </p>
                    </li>
                ))}
            </ul>
            <MessageBox 
            addMessage={addMessage}
            messageRef={messageRef}
            />
        </div>
        }
        </>
    )
}