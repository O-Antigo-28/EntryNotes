import "./modeChoicePage.css"
import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import LinkButton from "./../../components/LinkButton"
import Header from "../../components/Header"
import Title from "../../components/Title"
import ButtonContainer from "../../components/ButtonContainer"
const ModeChoicePage = () => {




    return (
    <>
        <Header><></></Header>
        <main className="modeChoice__main">
            <Title>Qual modo você irá escolher? </Title>
            <ButtonContainer>
                <LinkButton to="/manual/fileSelection">Manual</LinkButton>
                <LinkButton to="/automatic/fileSelection">Automático</LinkButton>
            </ButtonContainer>
  
        </main>

    </>
    )
}

export default ModeChoicePage