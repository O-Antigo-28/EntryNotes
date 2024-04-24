import { useId } from "react";


const CheckBox = ({label}: {label: string}) => {
    const id = useId()
    return (
        <div className="checkBox"> 
            <label id={id}>{label}</label>
            <input type="checkbox" name="" id={id} />
        </div>
    )
}

export default CheckBox;