import "./systemInput.css"
import { CSSProperties, ReactNode, useId } from "react"

const SystemInput = ({children, value, style}: {children: ReactNode, value:string, style?: CSSProperties}) => { 
    const systemInputID = useId()
    return (
        <div className="systemInput__container" style={style}>
            <label className="systemInput__label" htmlFor={systemInputID}>{children}</label>
            
            <input className="systemInput__value" type="text" id={systemInputID} value={value} />
        </div>
    )
}

export default SystemInput