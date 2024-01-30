import { FaCheck, FaX } from "react-icons/fa6";
import { z } from "zod";
import { useEffect, useState, Dispatch } from "react";
import { Action, ActionKind } from "~/lib/signupUtils";

type SignupWarningsProps = {
    password: string;
    confirmPassword: string;
    dispatch: Dispatch<Action>
}

const match = 'password must match'
const upper = 'should contain at least one uppercase letter'
const num = 'should contain at least one number'

const RegexUppercase = new RegExp('^(?=.*[A-Z]).+$')
const RegexNumber = new RegExp('^(?=.*[0-9]).+$')

const upperChecker = z.string().regex(RegexUppercase)
const numberChecker = z.string().regex(RegexNumber)

export default function SignupWarnings({password, confirmPassword, dispatch}: SignupWarningsProps) {
    const [isMatched, setIsMatched] = useState(false)
    const [hasUppercase, setHasUppercase] = useState(false)
    const [hasNumber, setHasNumber] = useState(false)

    useEffect(() => {  
        
        setIsMatched(password === confirmPassword)

        try {            
            upperChecker.parse(password)
            setHasUppercase(true)
        } catch (error) {
            setHasUppercase(false)
        }

        try {
            numberChecker.parse(password)
            setHasNumber(true)
        } catch (error) {
            setHasNumber(false)
        }

        
        
        

    }, [password, confirmPassword])

    useEffect(() => {
        dispatch({
            type: ActionKind.VALIDATE_PASSWORD,
            payload: Boolean(isMatched && hasUppercase && hasNumber)
        })
    }, [isMatched, hasNumber, hasUppercase])

    return (
        <div>
            <p className={`${isMatched ? 'text-green-700': 'text-red-700'} text-sm  `} >
                {match}
                {isMatched ? <FaCheck className="inline ms-1" /> : <FaX className="inline ms-1" /> }
            </p>
            <p className={`${hasUppercase ? 'text-green-700': 'text-red-700'} text-sm  `} >
                {upper}
                {hasUppercase ? <FaCheck className="inline ms-1" /> : <FaX className="inline ms-1" /> }
            </p>
            <p className={`${hasNumber ? 'text-green-700': 'text-red-700'} text-sm  `} >
                {num}
                {hasNumber ? <FaCheck className="inline ms-1" /> : <FaX className="inline ms-1" /> }
            </p>
        </div>
    )
}