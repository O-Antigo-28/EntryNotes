import { ReactNode, useId } from "react"
import SystemInput from "../SystemInput"

const ValueSystemInput = ({children, value, fixed = 2}: {children: ReactNode, value:number, fixed?: number}) => { 
    const systemInputID = useId()
    return (
        <SystemInput value={`R$ ${value.toFixed(fixed)}`}>{children}</SystemInput>
    )
}

export default ValueSystemInput
