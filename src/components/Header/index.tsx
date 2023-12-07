import React, {ButtonHTMLAttributes, ReactNode } from "react"
import AppLogo from "../AppLogo"


const Header = ({children = <></>}: {children: ReactNode }) => { 

    return (
        <header>
            <AppLogo>entrada notinhas</AppLogo>
            <div>
                {children}
            </div>
        </header>
    )
}


export default Header


