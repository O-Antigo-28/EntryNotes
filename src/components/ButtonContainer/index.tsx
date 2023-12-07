import "./buttonContainer.css"
import { ReactNode } from "react"

const ButtonContainer = ({children} : {children: ReactNode[]}) => {

    function handleKeyDownEvent( ) :void { 

    }

    return (
    <div className="container__Button" onKeyDown={handleKeyDownEvent}>
        {children}
    </div>
    )
}

export default ButtonContainer