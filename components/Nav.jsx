"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders} from 'next-auth/react'
import Provider from "./Provider";

const Nav = () => {
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, settoggleDropdown] = useState(false)
    useEffect(()=> {
        const setUpProviders = async () => {
            const response = await getProviders();
            setProviders(response)
        }
        setUpProviders();
    }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href={"/"} className="flex gap-2 flex-center">
            <Image
            src={"/assets/images/logopai.png"}
            alt="Logo"
            width={130}  
            height={30}
            className="object-contain"
            />
            {/* <p className="logo_text">Promtopia</p> */}
        </Link>
        <div className="sm:flex hidden">
            {session?.user ? (
                <div className="flex gap-3 md:gap-5">
                    <Link href={'/create-prompt'} className="black_btn">
                        Create post
                    </Link>

                    <button type="button" onClick={signOut} className="outline_btn">Signt Out</button>

                    <Link href={'/profile'}>
                        <Image 
                            src={session?.user.image} 
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="Profile"
                        />
                    </Link>
                </div>
            ) : (
                <>
                    {providers && Object.values(providers).map((provider) => (
                        <button
                        type="button"
                        key={provider.name}
                        onClick={()=> signIn(provider.id)}
                        className="black_btn"
                        >
                            Sign In
                        </button>
                    ))}
                </>
            )}
        </div>

        <div className="sm:hidden flex relative">
            {session?.user ? (
                <div className="flex">
                <Image 
                    src={session?.user.image} 
                    width={37}
                    height={37}
                    className="rounded-full"
                    alt="Profile"
                    onClick={()=> settoggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                href={"/profile"}
                                className="dropdown_link"
                                onClick={()=> settoggleDropdown(false)}>
                                    My propfile
                                </Link>
                                <Link
                                href={"/create-prompt"}
                                className="dropdown_link"
                                onClick={()=> settoggleDropdown(false)}>
                                    Create prompt
                                </Link>
                                <button
                                type="button"
                                onClick={()=> {
                                    settoggleDropdown(false);
                                    signOut();
                                }}
                                className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                            </div>
                        )}
                </div>
            ):(<>
                {providers && Object.values(providers).map((provider) => (
                        <button
                        type="button"
                        key={provider.name}
                        onClick={()=> signIn(provider.id)}
                        className="black_btn"
                        onClick={()=> settoggleDropdown((prev) => !prev)}
                        >
                            Sign In
                        </button>
                    ))}
            </>)}
        </div>
    </nav>
  )
}

export default Nav