import { useId } from "react"
import "./arraysysteminput.css"

const ArraySystemInput = ({label, value}: {label: string, value: string}) => { 

    const arraySystemInputID = useId()
    return (
        <div className="ArraySystemInput">
            <label className="label__ArraySystemInput" htmlFor={arraySystemInputID}>{label}</label>
            <input className="input__ArrayS" type="text" name="" id={arraySystemInputID} value={value} />
        </div>
    )
}

export default ArraySystemInput