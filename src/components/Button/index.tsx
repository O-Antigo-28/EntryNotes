import React, {ButtonHTMLAttributes, ReactNode } from "react"
import "./button.css"
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    listener(...args: any):void,
    
}

const Button : React.FC<ButtonProps> = ({children, listener,...props}) => { 
    function handleClick(): void{
        listener()
    }
    return (
        <>
            <button className="button" style={props.style} onClick={handleClick}>
                {children}
            </button>
        </>
    )

}

export default Button