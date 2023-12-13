import "./modeChoicePage.css"
import React, { ButtonHTMLAttributes, ReactNode } from "react"
import { Link } from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import Header from "../../components/Header"
import Title from "../../components/Title"
import ButtonContainer from "../../components/ButtonContainer"
import { Indexer } from "../../Indexer"
import { Note } from "../../Note"
import NotesPanel from "../../components/NotesPanel"
const ModeChoicePage = () => {

    const notes=[
        new Note("REDE", "DEBITO", 29.30, new Date(), "ALELO"),
        new Note("REDE", "DEBITO", 30.30, new Date(), "ALELO"),
        new Note("CAIXA", "CREDITO", 31.30, new Date(), "ALELO"),
        new Note("CAIXA", "DEBITO", 32.30, new Date(), "ALELO"),
        new Note("REDE", "DEBITO", 33.30, new Date(), "ALELO"),
        new Note("CAIXA", "DEBITO", 34.30, new Date(), "ALELO"),
        new Note("REDE", "PARCELADO", 35.30, new Date(), "ALELO"),
        new Note("CAIXA", "DEBITO", 36.30, new Date(), "ALELO"),
        new Note("CAIXA", "DEBITO", 37.30, new Date(), "ALELO"),
        new Note("REDE", "DEBITO", 38.30, new Date(), "ALELO"),
        new Note("CAIXA", "DEBITO", 39.30, new Date(), "ALELO")

    ]
    const indexedNotes = new Indexer<Note>(notes)

    return (
    <>
        <Header><></></Header>
        <main className="modeChoice__main">
            <Title>Qual modo você irá escolher? </Title>
            <ButtonContainer>
                <LinkButton to="/manual/fileSelection">Manual</LinkButton>
                <LinkButton to="/automatic/fileSelection">Automático</LinkButton>
            </ButtonContainer>
            
            <NotesPanel notes={indexedNotes}/>

        </main>

    </>
    )
}

export default ModeChoicePage