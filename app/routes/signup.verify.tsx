import { ActionFunctionArgs, redirect } from "@remix-run/node"
import { useFetcher, useLocation } from "@remix-run/react"


export async function action({request}:ActionFunctionArgs) {
    const formData = await request.formData();
    const code = formData.get('code')
    if (!code) {
        throw new Response(null, {status:400})
    }
    const url = request.url;
    const email = new URLSearchParams(url).get('email')
    if (!email) {
        throw new Response(null, {status:400})
    }

    return redirect(`/signin?email=${email}`)
}


export default function VerifyEmail() {
    const location = useLocation()
    const search = location.search
    const email = new URLSearchParams(search).get('email')

    if (email === null) {
        throw new Error('invald email')
    }

    const fetcher = useFetcher()
    return (
        <div className="flex flex-col items-center gap-6 bg-slate-100 p-6 pb-10 rounded-xl shadow-lg border-2 border-blue-300">
            <h1 className="font-bold  text-xl">Verify Email</h1>
            <p className="text-sm font-semibold">a code was sent to {email}</p>
            <fetcher.Form 
            method="post" 
            action=""
            className="flex flex-col gap-4 w-[320px]"
            >   <div className="flex flex-row gap-4 items-center">
                    <label htmlFor="code" className="font-semibold">enter code: </label>
                    <input 
                    type="text"
                    className="border border-blue-300 flex-grow px-4 py-1 rounded-md shadow-inner"
                    name="code"
                    />
                </div>
                <p className="flex flex-row gap-2 text-sm">
                    <span className="opacity-80">didn't received code?</span>
                    <button 
                    type="button"
                    className="text-red-600 hover:text-red-600 active:text-red-950 transition-all duration-150"
                    >
                        resend code
                    </button>
                </p>
                <button 
                type="submit" 
                className="font-semibold text-lg bg-blue-300 py-1 rounded-lg shadow-lg hover:scale-105 active:scale-95 disabled:opacity-60 transition-all duration-150"
                >
                    verify
                </button>
            </fetcher.Form>
        </div>
    )
}