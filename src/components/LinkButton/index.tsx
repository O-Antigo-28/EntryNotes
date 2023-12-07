import "./linkButton.css"
import { Link } from "react-router-dom"
import { ReactNode } from "react"

const LinkButton = ({children, to}: {children: ReactNode, to:string}) => { 

    return (
        <Link className="linkButton" to={to}>{children}</Link>
    )
}

export default LinkButton