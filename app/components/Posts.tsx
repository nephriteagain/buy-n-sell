import { Link, json } from '@remix-run/react'

type PostsProps = {
    posts: Array<{
        title:string;
        price:number;
        seller:string;
        id:string;
    }>
}

export default function Posts({posts}: PostsProps) {

    return (
        <div className="posts flex flex-row gap-4 flex-wrap max-w-[640px]">
            {posts.map(({title, price, seller, id}) => {
                return (
                    <Link key={id} to={`posts/${id}`}>
                        <div 
                        className="post p-2 flex flex-col border-2 border-blue-300 bg-slate-200 w-44 aspect-square shadow-lg rounded-md hover:scale-110  transition-all duration-200"
                        >
                            <p className='font-semibold text-lg'>{title}</p>
                            <p className='font-semibold opacity-70 text-sm'>{seller}</p>
                            <p className='ms-auto mt-auto'>$ {price}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}