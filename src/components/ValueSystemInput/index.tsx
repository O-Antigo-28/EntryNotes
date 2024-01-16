import { ReactNode, useId, CSSProperties } from "react"
import SystemInput from "../SystemInput"

const ValueSystemInput = ({children, value, fixed = 2, style, colors}: {children: ReactNode, value:number, fixed?: number, style?: CSSProperties, colors?: boolean}) => {  
    if(colors){
        if(!style){
            style = {} 
        }
        style.color = value >= 0? "#0FAD1F": "#FF1717" 
    }
    const systemInputID = useId()
    return (
        <SystemInput style={style} value={`R$ ${value.toFixed(fixed)}`}>{children}</SystemInput>
    )
}

export default ValueSystemInput
