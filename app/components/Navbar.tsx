import { NavLink } from "@remix-run/react";

export default function Navbar() {
    return (
        <nav className="bg-slate-100 z-10 fixed top-0 left-0 w-full font-semibold text-xl p-2 shadow-md flex flex-row gap-4">
            <NavLink 
            to={'/'}
            className={({isActive}) => 
                isActive ? 
                'border-b-2 border-black' :
                'border-b-2 border-transparent'
            }
            >
                Home
            </NavLink>
            <NavLink 
            to={'/signin'}
            className={({isActive}) => 
                isActive ? 
                'ms-auto border-b-2 border-black' :
                'ms-auto border-b-2 border-transparent'
            }
            >
                Sign In
            </NavLink>
            <NavLink 
            to={'/signup'}
            className={({isActive}) => 
                isActive ? 
                'border-b-2 border-black' :
                'border-b-2 border-transparent'
            }
            >
                Sign Up
            </NavLink>
        </nav>
    )
}