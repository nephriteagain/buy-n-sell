import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { json } from "react-router";
import posts from 'sample.json'

import Posts from "~/components/Posts";
import Search from "~/components/Search";

export const meta: MetaFunction = () => {
    return [
        { title: "Buy N Sell" },
        { name: "description", content: "homepage" },
    ];
};

export const loader = async ({request}: LoaderFunctionArgs) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    if (!q) {
        return json(posts)
    }
    const regex = new RegExp(`${q}`, 'gi')
    const filteredPost = posts.filter(post => regex.test(post.title) )
    return json(filteredPost)
}

export default function Index() {
    const posts = useLoaderData<typeof loader>()

    return (
        <div className="flex flex-col items-center gap-4">
            <p className="text-center font-bold text-4xl">
                Buy N Sell
            </p>
            <Search />
            <Posts posts={posts} />
        </div>
    );
}
