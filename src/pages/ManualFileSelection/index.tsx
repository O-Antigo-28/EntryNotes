import "./ManualFileSelection.css"
import Title from "../../components/Title"
import LinkButton from "../../components/LinkButton"
import { FileExtensions } from "../../FileExtensions"
import Header from "../../components/Header"
import FileSelector from "../../components/FileSelector"
import ButtonContainer from "../../components/ButtonContainer"
import Button from "../../components/Button"
import {Navigate} from 'react-router-dom'
import { useState } from "react"
import { MyRoutes } from "../../MyRoutes"
import { FileIdentifier } from "../../MyFile"
import { FileType } from "../../FileType"
import FormFileSelector from "../../components/FormFileSelector"


const ManualFileSelection = () => {

    const [allVeryWell, setAllVeryWell] = useState(false)

    const [filesType, setFilesType] = useState([ 
        {fileType: new FileType("estoque", [FileExtensions.CSV]), myFile: null}
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
        <Header><></>
        </Header>
        <main className="automaticFileSelection__main">
            <Title>Configurando modo manual</Title>


            <FormFileSelector filesType={filesType} onChange={(item) => {setFilesType(item)}}/>

            <ButtonContainer>
                <Button listener={check}>Confirmar</Button>
                <LinkButton to={MyRoutes.HOME}>voltar</LinkButton>
            </ButtonContainer>
            {/* { allVeryWell && <Navigate to={`${MyRoutes.BASE_MANUAL_MODE}/${encodeURIComponent(filesType[0])}`}/>} */}
        </main>
        
    </>
    )
}

export default ManualFileSelection