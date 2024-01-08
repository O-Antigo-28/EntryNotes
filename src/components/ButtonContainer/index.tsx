import "./buttonContainer.css"
import { CSSProperties, ReactNode } from "react"

const ButtonContainer = ({children, style = undefined} : {children: ReactNode[], style?: CSSProperties}) => {

    function handleKeyDownEvent( ) :void { 
        
    }

    return (
    <div className="container__Button" style={style} onKeyDown={handleKeyDownEvent}>
        {children}
    </div>
    )
}

export default ButtonContainer