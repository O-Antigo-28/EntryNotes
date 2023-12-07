import "./manual.css"
import Title from        "../../components/Title"
import LinkButton from   "../../components/LinkButton"
import { MyRoutes } from "../../MyRoutes"
const ManualPage = () => { 
    return (
        <>
            <Title>comming soon</Title>
            <p>{location.pathname}</p>
            <LinkButton to={MyRoutes.HOME} >Voltar para o inicio</LinkButton>
        </>
    )
}

export default ManualPage