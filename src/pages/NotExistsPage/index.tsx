import { Link, useLocation } from "react-router-dom" 
import "./notexistspage.css"
import LinkButton from "../../components/LinkButton"
import Title from "../../components/Title"


const NotExistsPage = () => {

    const location = useLocation()

    return (
    <>
        <Title>Página não existe</Title>
        <p>{location.pathname}</p>
        <LinkButton to="/main_window" >Voltar para o inicio</LinkButton>
    </>
    )
}

export default NotExistsPage