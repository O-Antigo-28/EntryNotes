import "./modeChoicePage.css"
import {  CSSProperties } from "react"
import LinkButton from "../../components/LinkButton"
import Header from "../../components/Header"
import Title from "../../components/Title"
import ButtonContainer from "../../components/ButtonContainer"
import { MyRoutes } from "../../MyRoutes"
const ModeChoicePage = () => {

    const pageQuestion = "Qual modo você irá escolher?"

    const modes = [
        {name: "Automático", link:MyRoutes.AUTO_FILE_SELECTION},
        {name: "Manual", link:MyRoutes.MANUAL_MODE}
    ]

    return (
    <>
        <Header><></></Header>
        <main className="modeChoice__main">
            <Title> {pageQuestion}</Title>
            <ButtonContainer>
                {modes.map((mode, index)=> {
                    return <LinkButton key={index} to={mode.link}>{mode.name}</LinkButton>
                })}
            </ButtonContainer>

        </main>

    </>
    )
}

export default ModeChoicePage