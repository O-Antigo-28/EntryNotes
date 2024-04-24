import "./automaticFileSelection.css"
import Header from "../../components/Header"
import { ReactNode, useState } from "react"
import FileSelector from "../../components/FileSelector"
import { FileChooser } from "./../../FileChooser"
import { FileExtensions } from "../../FileExtensions"
import LinkButton from "../../components/LinkButton"
import ButtonContainer from "../../components/ButtonContainer"
import Button from "../../components/Button"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"
import { FileType } from "../../FileType"
import { Navigate } from "react-router-dom"
import { FileIdentifier } from "../../FileIdentifier"
import FormFileSelector from "../../components/FormFileSelector"
import { useRecoilValue } from "recoil"
import {  useIDCaixaFIValue, useIDEstoqueFIValue, useIDRedeFIValue } from "./../../atoms/fileIdentifiers"




const stockExtensions = [
    FileExtensions.CSV
]

const redeExtensions = [
    FileExtensions.CSV,
    FileExtensions.EXCEL
]

const caixaExtensions = [ 
    FileExtensions.CSV,
    FileExtensions.EXCEL
]




const fileTypeRede = new FileType("REP.REDE", redeExtensions)
const fileTypeCaixa = new FileType("REP.CAIXA", caixaExtensions)
const fileTypeStock = new FileType("REP.ESTOQUE", stockExtensions)

const AutomaticFileSelection = () => {
    const idFIRede = useIDRedeFIValue()
    const idFICaixa = useIDCaixaFIValue()
    const idFIStock = useIDEstoqueFIValue()

    const [allVeryWell, setAllVeryWell] = useState(false)

    const [fileChoosers, setFileChoosers] = useState([ 
        new FileChooser(idFIRede, fileTypeRede),
        new FileChooser(idFICaixa, fileTypeCaixa), 
        new FileChooser(idFIStock, fileTypeStock)
    ])



    // function read(): void{
    //     let isNotValidFiles: boolean = false 
    //     filesType.forEach((item) => { 
    //         if(!item.fileType || !item.myFile){
    //             isNotValidFiles = true
    //             return
    //         }
    //         else if(item.myFile.path === undefined || item.myFile.fileName === undefined ){
    //             isNotValidFiles = true
    //             return
    //         }
            
    //     })
    //     if(!isNotValidFiles){
    //         setAllVeryWell(true)
    //     }
    // }

    return (
    <div className="automaticFileSelection">
        <Header><></></Header>
        <main className="automaticFileSelection__main">
            <Title>Configurando Modo Automático</Title>

            <FormFileSelector filesType={filesType} />

            <ButtonContainer>
                <Button listener={read}>confirmar</Button>
                <LinkButton to={MyRoutes.HOME}>Voltar</LinkButton>
            </ButtonContainer>

            {allVeryWell && <Navigate to={`${MyRoutes.BASE_AUTO_MODE}/${encodeURIComponent(filesType[0].myFile.path)}/${encodeURIComponent(filesType[2].myFile.path)}/${encodeURIComponent(filesType[1].myFile.path)}/`} />}

        </main>
    </div>
    )
}

export default AutomaticFileSelection