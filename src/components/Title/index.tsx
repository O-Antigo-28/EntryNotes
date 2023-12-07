import { ReactNode } from "react"
import "./title.css"
const Title = ({children}:{children: ReactNode}) =>{ 
    return (
        <h1 className="choiceTitle">
            {children}
        </h1>

    ) 
}

export default Title