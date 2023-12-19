import "./systemInput.css"
import { ReactNode, useId } from "react"
import SystemInput from "../SystemInput"

const ValueSystemInput = ({children, value}: {children: ReactNode, value:number}) => { 
    const systemInputID = useId()
    return (
        <SystemInput value={`R$ ${value.toString()}`}>{children}</SystemInput>
    )
}

export default ValueSystemInput
