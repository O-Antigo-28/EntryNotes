import React, {ButtonHTMLAttributes, ReactNode } from "react"
import "./button.css"

type TPresetStyle = 'p' | 'lg'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    listener(...args: any):void,
    presetStyle?: TPresetStyle,
    
}

const Button : React.FC<ButtonProps> = ({children, listener, presetStyle = 'lg', ...props}) => { 
    function handleClick(): void{
        listener()
    }
    return (
        <>
            <button className={presetStyle === 'lg'? "button button--large": "button button--small"}  style={props.style} onClick={handleClick}>
                {children}
            </button>
        </>
    )

}

export default Button