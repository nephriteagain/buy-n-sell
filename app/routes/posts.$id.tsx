import { LoaderFunctionArgs, json } from "@remix-run/node"
import { useLoaderData, useNavigate } from "@remix-run/react"
import { useEffect, useRef } from "react"
import posts from 'sample.json'

export async function loader({params}: LoaderFunctionArgs) {
    const post = posts.find(post => post.id === params.id)
    if (!post) {
        throw new Response('not found', {status:404})
    }
    return json(post)
}

export default function Post() {
    const {title, price, description, seller} = useLoaderData<typeof loader>()
    const navigate = useNavigate()
    const bodyRef  = useRef(document.body)

    function back(e:globalThis.MouseEvent) {
        if (e.currentTarget === e.target) {
            navigate('..')
        }
    }

    useEffect(() => {
        if (bodyRef) {
            bodyRef.current.addEventListener('click', back)
        }
        return () =>  bodyRef.current.removeEventListener('click', back)
    }, [])

    return (
        <div className="flex flex-col py-2 bg-slate-200 rounded-lg p-4 shadow-lg h-[500px]">
            <p className="font-bold text-2xl">{title}</p>
            <p className="font-semibild text-lg opacity-70">{seller}</p>
            <p className="w-1/2">{description}</p>
            <div className="py-4">
                <img 
                src="https://picsum.photos/250" 
                className="rounded-lg shadow-lg" 
                alt="post image"
                />
            </div>
            <p className="w-fit bg-green-300 text-green-950 p-1 font-bold rounded-md shadow-sm">$ {price}</p>
            <div className="flex flex-grow items-center justify-center">
            </div>
           
        </div>        
    )
}