import { ReactNode, useId } from "react"
import "./arraysysteminput.css"

const ArraySystemInput = ({children, value}: {children: ReactNode, value: string}) => { 

    const arraySystemInputID = useId()
    return (
        <div className="ArraySystemInput">
            <label className="label__ArraySystemInput" htmlFor={arraySystemInputID}>{children}</label>
            <input className="input__ArraySystemInput" type="text" name="" id={arraySystemInputID} value={value} />
        </div>
    )
}

export default ArraySystemInput