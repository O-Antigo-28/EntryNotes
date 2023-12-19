import "./systemInput.css"
import { ReactNode, useId } from "react"

const SystemInput = ({children, value}: {children: ReactNode, value:string}) => { 
    const systemInputID = useId()
    return (
        <div>
            <label htmlFor={systemInputID}>{children}</label>
            
            <input type="text" id={systemInputID} value={value} />
        </div>
    )
}

export default SystemInput