import "./systemInput.css"
import { ReactNode, useId } from "react"

const SystemInput = ({children, value}: {children: ReactNode, value:string}) => { 
    const systemInputID = useId()
    return (
        <div className="systemInput__container">
            <label className="systemInput__label" htmlFor={systemInputID}>{children}</label>
            
            <input className="systemInput__value" type="text" id={systemInputID} value={value} />
        </div>
    )
}

export default SystemInput