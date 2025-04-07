import "./automaticFileSelection.css"
import Header from "../../components/Header"
import React, {ReactNode, useRef, useState } from "react"

import { FileChooser } from "./../../FileChooser"
import { FileExtensions } from "../../FileExtensions"
import LinkButton from "../../components/LinkButton"
import ButtonContainer from "../../components/ButtonContainer"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"
import { FileType } from "../../FileType"
import { Navigate } from "react-router-dom"
import { FileIdentifier } from "../../FileIdentifier"
import FormFileSelector from "../../components/FormFileSelector"
import WarningModal from "../../components/WarningModal"

import { useCaixaFileIdentifier, usePixFileIdentifier, useRedeFileIdentifier, useStockFileIdentifier } from "./../../atoms/fileIdentifiers"
import Button from 'react-bootstrap/Button';
const FILENAME_SIMILAR_STOCK = "POSICAODEESTOQUE.CSV"
const FILENAME_SIMILAR_REDE = "Rede_Rel_Vendas_Do_Dia.... .csv"
const FILENAME_SIMILAR_CAIXA = "Relatorio_De_Vendas_"

const REDE_INSPECT_FILENAME = /^Rede_Rel_Vendas_*/
const CAIXA_INSPECT_FILENAME = /^Relatorio_de_Vendas_*/


// import Button from 'react-bootstrap/Button';



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
const pixExtension = [
  FileExtensions.CSV,
]

function createCorrectionMessageForFilenames(to: string, CorrectFilename: string, incorrectFilename: string){
  return `o arquivo selecionado ${incorrectFilename} para ${to} não é o correto! Tente um arquivo parecido com ${CorrectFilename}`
}


const redeFileType = new FileType("REP.REDE", redeExtensions, "OPTIONAL")
const caixaFileType = new FileType("REP.CAIXA", caixaExtensions, "OPTIONAL")
const fileTypePix = new FileType("REP.PIX", pixExtension, "OPTIONAL")
const stockFileType = new FileType("REP.ESTOQUE", stockExtensions)

const AutomaticFileSelection = () => {
    const redeFileIdentifier = useRedeFileIdentifier()
    const caixaFileIdentifier = useCaixaFileIdentifier()
    const stockFileIdentifier = useStockFileIdentifier()
    const pixFileIdentifier = usePixFileIdentifier()
    
    const [showModalInvalidStockInvalid, setShowModalInvalidStockInvalid] = useState<boolean>(false)
    const [allVeryWell, setAllVeryWell] = useState(false)
    const contentModal = useRef<string | Array<string>>("")


    const subject = typeof contentModal.current === "string" ? "Selecione outro arquivo": "Selecione outros arquivos"


    const filesIdentifiers: FileIdentifier[] = [
        pixFileIdentifier,
        redeFileIdentifier,
        caixaFileIdentifier,
        stockFileIdentifier,
      ]

    const filesChoosers: FileChooser[] = [ 
        new FileChooser(pixFileIdentifier.id, fileTypePix),
        new FileChooser(redeFileIdentifier.id, redeFileType),
        new FileChooser(caixaFileIdentifier.id, caixaFileType), 
        new FileChooser(stockFileIdentifier.id, stockFileType),
    ]


    function validateFiles(): void{
        let isValidFiles: boolean = true
        let count = 0 
        let numberOfFileChooser = filesChoosers.length
        
        
        while(isValidFiles && count < numberOfFileChooser){
            // VERIFICANDO OS ARQUIVOS QUE NÃO FORAM SELECIONADOS SÃO OPCIONAIS 
            if (!filesChoosers[count].fileType.isOptional && !filesIdentifiers[count].fileIdentified()){
                isValidFiles = false
                return
            }
            count++
        }

        if(isValidFiles){
          { // VERIFICANDO SE OS ARQUIVOS SELECIONADOS TEM O NOME CORRETO PARA CADA ARQUIVO

            const messageForEachIncorrectFilename: string[] = []

            if(redeFileIdentifier.fileName.length > 3 && !REDE_INSPECT_FILENAME.test(redeFileIdentifier.fileName)){
              messageForEachIncorrectFilename.push(createCorrectionMessageForFilenames(redeFileType.typeData ,FILENAME_SIMILAR_REDE, redeFileIdentifier.fileName))
              isValidFiles = false
            }

            if(caixaFileIdentifier.fileName.length > 3 && !CAIXA_INSPECT_FILENAME.test(caixaFileIdentifier.fileName)){
              messageForEachIncorrectFilename.push(createCorrectionMessageForFilenames(caixaFileType.typeData, FILENAME_SIMILAR_CAIXA, caixaFileIdentifier.fileName))
              isValidFiles = false
            }

            if(stockFileIdentifier.fileName !== FILENAME_SIMILAR_STOCK){
              messageForEachIncorrectFilename.push(createCorrectionMessageForFilenames(stockFileType.typeData, FILENAME_SIMILAR_STOCK, stockFileIdentifier.fileName))
              isValidFiles = false
            }
            

            if(!isValidFiles){
              if( messageForEachIncorrectFilename.length === 1){ 
                contentModal.current = messageForEachIncorrectFilename[0]
                setShowModalInvalidStockInvalid(true)
              }
              else if(messageForEachIncorrectFilename.length > 1){
                contentModal.current = messageForEachIncorrectFilename
                setShowModalInvalidStockInvalid(true)
              }
      
            }
            
          } // END VERIFICANDO OS NOMES

          
        }



        
        setAllVeryWell(isValidFiles)
    }

    return (
    <div className="automaticFileSelection">
        <Header><></></Header>
        <main className="automaticFileSelection__main">
            <Title>Configurando Modo Automático</Title>

            <FormFileSelector fileChoosers={filesChoosers} />

            <ButtonContainer>
                <Button variant="primary" onClick={validateFiles}>confirmar</Button>
                <LinkButton to={MyRoutes.HOME}>Voltar</LinkButton>
            </ButtonContainer>  
            <WarningModal subject={subject}  content={contentModal.current}  modalProps={{show: showModalInvalidStockInvalid, onHide:() => {setShowModalInvalidStockInvalid(false)}
            }}/>

            {allVeryWell ? ((redeFileIdentifier.path.length > 0 || caixaFileIdentifier.path.length > 0 || pixFileIdentifier.path.length > 0) ? <Navigate to={MyRoutes.BASE_AUTO_MODE}/> : <Navigate to={MyRoutes.BASE_MANUAL_MODE}/>) : <></>}
        
        </main>
    </div>
    )
}

export default AutomaticFileSelection