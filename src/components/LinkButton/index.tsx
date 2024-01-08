import "./linkButton.css"
import { Link } from "react-router-dom"
import { ReactNode } from "react"

const LinkButton = ({children, to, leaving}: {children: ReactNode, to:string, leaving?():void}) => { 

    return (
        <Link className="linkButton" to={to} onClick={leaving}>{children}</Link>
    )
}

export default LinkButton