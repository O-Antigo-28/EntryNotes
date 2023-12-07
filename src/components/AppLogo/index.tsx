import React, {ButtonHTMLAttributes, ReactNode } from "react"
import "./applogo.css"
const AppLogo = ({children}: {children: ReactNode}) => { 

    return (
            <h2 className="appLogo">
                {children}
                
            </h2>
   
    )
}


export default AppLogo