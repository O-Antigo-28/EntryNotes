import React, {ButtonHTMLAttributes, ReactNode } from "react"
import "./button.css"

type TPresetStyle = 'p' | 'lg'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: ReactNode,
    
    presetStyle?: TPresetStyle,
    
}

const Button : React.FC<ButtonProps> = ( {children, presetStyle = 'lg'}, props) => { 

    return (
        <>
            <button className={presetStyle === 'lg'? "button button--large": "button button--small"}   {...props}>
                {children}
            </button>
        </>
    )

}

export default Button