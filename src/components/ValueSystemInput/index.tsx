import { ReactNode, useId, CSSProperties } from "react"
import SystemInput from "../SystemInput"

const ValueSystemInput = ({children, value, fixed = 2, style, colors}: {children: ReactNode, value:number, fixed?: number, style?: CSSProperties, colors?: boolean}) => {  
    const COLOR_SIMILAR_TO_GREEN = "#0FAD1F"
    const COLOR_SIMILAR_TO_RED = "#FF1717" 
    if(colors){
        if(!style){
            style = {} 
        }
        style.color = value > 0? COLOR_SIMILAR_TO_GREEN : COLOR_SIMILAR_TO_RED
        style.color = value === 0? "black": style.color
    }

    return (
        <SystemInput readOnly={true} style={style} propValue={`R$ ${value.toFixed(fixed)}`}>{children}</SystemInput>
    )
}

export default ValueSystemInput
