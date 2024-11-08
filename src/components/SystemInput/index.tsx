import "./systemInput.css"
import React, { CSSProperties, ChangeEvent, ReactNode, useId, InputHTMLAttributes} from "react"
interface ISystemInput extends InputHTMLAttributes<HTMLInputElement> { 
    children: ReactNode, 
    propValue: string, 
    refInput?: React.MutableRefObject<any>

}
const SystemInput: React.FC<ISystemInput> = ({children, propValue, style, onKeyDown, onChange, maxLength, readOnly, refInput}) => { 
    const systemInputID = useId()

    
    return (
        <div className="systemInput__container"  >
            <label className="systemInput__label" htmlFor={systemInputID}>{children}</label>
            
            <input className="systemInput__value" onKeyDown={onKeyDown} ref={refInput} onChange={onChange} style={style} type="text" id={systemInputID} value={propValue} maxLength={maxLength} readOnly={readOnly}/>
        </div>
    )
}

export default SystemInput