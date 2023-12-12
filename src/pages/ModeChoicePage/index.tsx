import "./modeChoicePage.css"
import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import Header from "../../components/Header"
import Title from "../../components/Title"
import ButtonContainer from "../../components/ButtonContainer"

import NoteElement from "../../components/NoteElement"
import { Note } from "../../Note"
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
            <NoteElement note={new Note("REDE", "CREDITO", 8.40, new Date(), "MASTERCARD")}/>

        </main>

    </>
    )
}

export default ModeChoicePage