import "./automaticFileSelection.css"
import Header from "../../components/Header"
import { ReactNode, useState } from "react"
import FileSelector from "../../components/FileSelector"
import { FileExtensions } from "../../FileExtensions"
import LinkButton from "../../components/LinkButton"
import ButtonContainer from "../../components/ButtonContainer"
import Button from "../../components/Button"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"
import { FileType } from "../../FileType"
import { Navigate } from "react-router-dom"
import { MyFile } from "../../MyFile"
import FormFileSelector from "../../components/FormFileSelector"



const AutomaticFileSelection = () => {
    const [allVeryWell, setAllVeryWell] = useState(false)



    const [filesType, setFilesType] = useState([ 
        {fileType: new FileType("estoque", [FileExtensions.CSV]), myFile: null}, 
        {fileType: new FileType("caixa", [FileExtensions.CSV]),   myFile: null},
        {fileType: new FileType("rede",  [FileExtensions.CSV]),   myFile: null}
    ])



    function check(): void{
        let isNotValidFiles: boolean = false 
        filesType.forEach((item) => { 
            if(!item.fileType || !item.myFile){
                isNotValidFiles = true
                return
            }
            else if(item.myFile.path === undefined || item.myFile.fileName === undefined ){
                isNotValidFiles = true
                return
            }
            
        })
        if(!isNotValidFiles){
            setAllVeryWell(true)
        }
    }

    return (
    <>
        <Header><></></Header>
        <main>
            <Title>Configurando Modo Automático</Title>

            <FormFileSelector filesType={filesType} onChange={(newFilesType) =>{setFilesType(newFilesType)}} />

            <ButtonContainer>
                <Button listener={check}>confirmar</Button>
                <LinkButton to={MyRoutes.HOME}>Voltar</LinkButton>
            </ButtonContainer>

            {allVeryWell && <Navigate to={MyRoutes.AUTO_MODE} replace={true}/>}

        </main>
    </>
    )
}

export default AutomaticFileSelection