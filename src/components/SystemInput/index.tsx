import "./systemInput.css"
import { CSSProperties, ChangeEvent, ReactNode, useId, useState } from "react"

const SystemInput = ({children, value, style}: {children: ReactNode, value:string, style?: CSSProperties}) => { 
    const systemInputID = useId()
 
    function handleChange(event: ChangeEvent<HTMLInputElement> ){
        
    }
    return (
        <div className="systemInput__container"  >
            <label className="systemInput__label" htmlFor={systemInputID}>{children}</label>
            
            <input className="systemInput__value" onChange={handleChange} style={style} type="text" id={systemInputID} value={value} />
        </div>
    )
}

export default SystemInput