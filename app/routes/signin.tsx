import { useFetcher } from "@remix-run/react"
import { useEffect, useState } from "react"
import { LoginSchema } from "types"
import { redirect } from "@remix-run/node"

// TODO: implement signin logic
export function action() {
    return redirect('/')
}

export default function Signin() {

    const fetcher = useFetcher()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [disabled, setDisabled] = useState(true)
    
    useEffect(() => {
        
        try {
            LoginSchema.parse({email, password})
            setDisabled(false)            
        } catch (error) {
            console.log('incorrect')
            setDisabled(true)
        }

    }, [email, password])

    return (
        <div className="flex flex-col items-center gap-6 bg-slate-100 p-6 pb-10 rounded-xl shadow-lg border-2 border-blue-300">
            <h1 className="font-bold  text-xl">Signin To Continue</h1>
            <fetcher.Form 
            method="post" 
            action=""
            className="flex flex-col gap-4 w-[320px]"
            >
                <div className="flex justify-between items-center">
                    <label className="font-semibold">
                        email
                    </label>
                    <input type="email" 
                    className="px-4 py-1 rounded-md shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <label className="font-semibold">
                        password
                    </label>
                    <input type="password" 
                    className="px-4 py-1 rounded-md shadow-inner"
                    value={password}
                    onChange={(e)  => setPassword(e.currentTarget.value)}
                    />
                </div>
                <button 
                type="submit" 
                className="font-semibold text-lg bg-blue-300 py-1 rounded-lg shadow-lg hover:scale-105 active:scale-95 disabled:opacity-60 transition-all duration-150"
                disabled={disabled}
                >
                    signin
                </button>
            </fetcher.Form>
        </div>
    )
}