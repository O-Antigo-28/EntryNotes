import "./systemInput.css"
import React, { CSSProperties, ChangeEvent, ReactNode, useId, InputHTMLAttributes} from "react"
interface ISystemInput extends InputHTMLAttributes<HTMLInputElement> { 
    children: ReactNode, 

}
const SystemInput: React.FC<ISystemInput> = ({children, value, style, onKeyDown, onChange}) => { 
    const systemInputID = useId()
 
    return (
        <div className="systemInput__container"  >
            <label className="systemInput__label" htmlFor={systemInputID}>{children}</label>
            
            <input className="systemInput__value" onKeyDown={onKeyDown} onChange={onChange} style={style} type="text" id={systemInputID} value={value} />
        </div>
    )
}

export default SystemInput