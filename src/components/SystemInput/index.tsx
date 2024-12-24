import "./systemInput.css"
import React, { CSSProperties, ChangeEvent, ReactNode, useId, InputHTMLAttributes, forwardRef} from "react"
interface ISystemInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value"> { 
    children: ReactNode, 
    propValue?: string, 
}

const SystemInput = forwardRef<HTMLInputElement, ISystemInput>(({children, propValue,onChange, onKeyDown,...props}, ref) => { 
    const systemInputID = useId()

    return (
        <div className="systemInput__container"  >
            <label className="systemInput__label" htmlFor={systemInputID}>{children}</label>
            
            <input className="systemInput__value" ref={ref} type="text" id={systemInputID} value={propValue} onChange={onChange} onKeyDown={onKeyDown} {...props}/>
        </div>
    )
})

export default SystemInput