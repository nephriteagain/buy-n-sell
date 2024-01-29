import { useNavigate } from "@remix-run/react";
import { MouseEvent, useState } from "react";

export default function Search() {
    const navigate = useNavigate()
    const [ searchVal, setSearchVal ] = useState('')

    function query(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if (!searchVal) {
            navigate('')
        }
        navigate(`?q=${searchVal}`)
    }

    return (
        <form className="py-2 flex flex-row gap-4">
            
            <input 
            type="text" 
            value={searchVal}
            onChange={(e) => setSearchVal(e.currentTarget.value)}
            className="px-4 py-1 font-semibold bg-gray-100 shadow-inner rounded-md"
            />
            <button 
            type="submit" 
            onClick={query}
            className="bg-green-300 px-3 py-1 rounded-md shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            >
                search
            </button>
        </form>
    )
}