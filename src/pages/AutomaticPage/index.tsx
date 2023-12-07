import LinkButton from "../../components/LinkButton"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"

const AutomaticPage = () => { 
    return (
    <>
        <Title>comming soon</Title>
        <p>{location.pathname}</p>
        <LinkButton to={MyRoutes.HOME} >Voltar para o inicio</LinkButton>
    </>
    )
}   

export default AutomaticPage