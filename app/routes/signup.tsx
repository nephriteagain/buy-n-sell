import { useFetcher, Link } from "@remix-run/react"
import { redirect } from '@remix-run/node'
import { useReducer, useEffect } from "react"
import { SignupSchema } from "types"
import { formData,  formReducer, ActionKind } from "~/lib/signupUtils"
import { ZodError } from 'zod'

import SignupWarnings from "~/components/SignupWarnings"

// TODO: add implement
export function action() {
    return redirect('/')
}



export default function Signup() {
    const fetcher = useFetcher()
    const [ 
        {
            firstName, 
            lastName, 
            email, 
            birthDate, 
            password, 
            confirmPassword, 
            disabled,
            validPassword
        } ,
        dispatch 
    ] = useReducer(formReducer, formData)

    useEffect(() => {
        console.log('password checker')
        try {
            SignupSchema.parse({firstName, lastName, email, birthDate, password,  confirmPassword, validPassword})

            dispatch({type: ActionKind.DISABLE_CHANGE, payload: false})
        } catch (error) {
            dispatch({type: ActionKind.DISABLE_CHANGE, payload: true})
            console.error(error)
        }

    }, [
        firstName, 
        lastName, 
        email, 
        birthDate, 
        password, 
        confirmPassword, 
        validPassword
    ])

    return (
        <div className="flex flex-col items-center gap-6 bg-slate-100 p-6 pb-10 rounded-xl shadow-lg border-2 border-blue-300">
            <h1 className="font-bold  text-xl">Create a New Account</h1>
            <fetcher.Form 
            method="post" 
            action=""
            className="flex flex-col gap-4 w-[320px]"
            >
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="first_name" className="font-semibold">first name</label>
                    <input 
                    type="string"
                    name="first_name"
                    value={firstName}
                    onChange={(e) => dispatch({type: ActionKind.FIRSTNAME_CHANGE, payload: e.currentTarget.value})}
                    className="px-4 py-1 rounded-md shadow-inner"
                    />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="last_name" className="font-semibold">last name</label>
                    <input 
                    className="px-4 py-1 rounded-md shadow-inner"
                    type="string"
                    name="last_name"
                    value={lastName}
                    onChange={(e) => dispatch({type: ActionKind.LASTNAME_CHANGE, payload: e.currentTarget.value})}
                    />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="email" className="font-semibold">email</label>
                    <input
                    type="email"
                    className="px-4 py-1 rounded-md shadow-inner"
                    name="email"
                    value={email}
                    onChange={(e) => dispatch({type: ActionKind.EMAIL_CHANGE, payload: e.currentTarget.value})}

                    />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="birth_date" className="font-semibold">birth date</label>
                    <input 
                    type="date"
                    className="px-4 py-1 rounded-md shadow-inner"
                    name="birth_date"
                    value={birthDate}
                    onChange={(e) => dispatch({type: ActionKind.BIRTHDATE_CHANGE, payload: e.currentTarget.value})}                
                    />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="password"  className="font-semibold">password</label>
                    <input 
                    type="password"
                    className="px-4 py-1 rounded-md shadow-inner"                    
                    name="password"
                    value={password}
                    onChange={(e) => dispatch({type: ActionKind.PASSWORD_CHANGE, payload: e.currentTarget.value})}                
                    />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <label htmlFor="confirm_password" className="font-semibold">confirm password</label>
                    <input 
                    type="password"
                    className="px-4 py-1 rounded-md shadow-inner"
                    name="confirm_password"
                    value={confirmPassword}
                    onChange={(e) => dispatch({type: ActionKind.CONFIRMPASS_CHANGE, payload: e.currentTarget.value})}
                    />
                </div>
                <SignupWarnings 
                password={password}
                confirmPassword={confirmPassword}
                dispatch={dispatch}
                />
                <button 
                type="submit" 
                className="font-semibold text-lg bg-blue-300 py-1 rounded-lg shadow-lg hover:scale-105 active:scale-95 disabled:opacity-60 transition-all duration-150"
                disabled={disabled}
                >
                    signup
                </button>
                <Link to='/signin'
                className="w-fit text-sm opacity-70 hover:opacity-100 font-semibold border-b-2 border-transparent hover:border-b-black transition-all duration-150"
                >
                    already have an account? go to sign in page
                </Link>
            </fetcher.Form>
        </div>
    )
}