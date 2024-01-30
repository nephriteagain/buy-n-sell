import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState, useRef } from "react"
import { faker } from '@faker-js/faker'
import posts from 'sample.json'

import { SlLike } from "react-icons/sl";
import { TfiComment } from "react-icons/tfi";
import { IoSend } from "react-icons/io5";

const fakeComments = Array.from({length:10}, () => {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        comment: faker.lorem.sentence({min:4, max: 15})
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
    const [comments, setComments] = useState(fakeComments)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const buttonRef  = useRef<HTMLButtonElement>(null)

    function addComment() {
        if (!textareaRef.current) return
        console.log('invoked')
        const textarea = textareaRef.current;
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


    return (
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
                    <TfiComment />
                </button>
            </div>
                { isCommentsShown && <>
                <hr className="border-2 border-blue-300" />
                {/* TODO: replace this with fetcher.Form when backend is OK */}
                <form className="flex flex-row gap-1" onSubmit={e => {
                    e.preventDefault()
                    addComment()
                }}>
                    <textarea 
                    placeholder="write a comment..."                    
                    className="resize-none text-sm p-2 basis-5/6 bg-slate-200 shadow-inner border border-blue-300 rounded-md"                    
                    maxLength={200}
                    ref={textareaRef}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey &&  buttonRef.current) {
                            buttonRef.current.click()
                        }
                    }}
                    />
                    <button type="submit"
                    className="basis-1/6 bg-blue-400 hover:bg-blue-500 active:outline-blue-500 active:scale-90 rounded-md flex items-center justify-center text-3xl text-white transition-all duration-200"
                    ref={buttonRef}
                    >
                        <IoSend />
                    </button>
                </form>
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
    )
}