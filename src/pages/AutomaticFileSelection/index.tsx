import "./automaticFileSelection.css"
import Header from "../../components/Header"
import { ReactNode, useState } from "react"
import FileSelector from "../../components/FileSelector"
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
import { useRecoilValue } from "recoil"
import {  stockFileIdentifier, useCaixaFileIdentifier, useFileIdentifierByID, useIDCaixaFIValue, useIDEstoqueFIValue, useIDRedeFIValue, useRedeFileIdentifier, useStockFileIdentifier } from "./../../atoms/fileIdentifiers"

import Button from 'react-bootstrap/Button';
const StockConfigFilename = "POSICAODEESTOQUE.CSV"

// import Button from 'react-bootstrap/Button';
import Modal, { ModalProps } from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
function MyVerticallyCenteredModal(props: ModalProps) {
  return (
    <Modal

      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Algo deu errado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Arquivo de configuração de estoque está incorreto.</h4>
        <p>
          por favor tente escolher o arquivo com o nome {StockConfigFilename}
        </p>
      </Modal.Body>

    </Modal>
  );
}

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>


//       />
//     </>
//   );
// }

// render(<App />);

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




const fileTypeRede = new FileType("REP.REDE", redeExtensions, "OPTIONAL")
const fileTypeCaixa = new FileType("REP.CAIXA", caixaExtensions, "OPTIONAL")
const fileTypeStock = new FileType("REP.ESTOQUE", stockExtensions)

const AutomaticFileSelection = () => {
    const redeFileIdentifier = useRedeFileIdentifier()
    const caixaFileIdentifier = useCaixaFileIdentifier()
    const stockFileIdentifier = useStockFileIdentifier()
    
    const [showModalInvalidStockInvalid, setShowModalInvalidStockInvalid] = useState<boolean>(false)
    const [allVeryWell, setAllVeryWell] = useState(false)


    const filesIdentifiers: FileIdentifier[] = [
        redeFileIdentifier,
        caixaFileIdentifier,
        stockFileIdentifier]

    const filesChoosers: FileChooser[] = [ 
        new FileChooser(redeFileIdentifier.id, fileTypeRede),
        new FileChooser(caixaFileIdentifier.id, fileTypeCaixa), 
        new FileChooser(stockFileIdentifier.id, fileTypeStock)
    ]


    function validateFiles(): void{
        let isValidFiles: boolean = true
        let count = 0 
        let numberOfFileChooser = filesChoosers.length
        
        while(isValidFiles && count < numberOfFileChooser){
            console.log(filesIdentifiers[count].fileName === StockConfigFilename)
            console.log(filesIdentifiers[count].fileName)
            if (!filesChoosers[count].fileType.isOptional && !filesIdentifiers[count].fileIdentified()){
                isValidFiles = false
                return
            }

            if(filesChoosers[count].fileType.typeData === "REP.ESTOQUE" && filesIdentifiers[count].fileName !== StockConfigFilename){
                setShowModalInvalidStockInvalid(true)
                isValidFiles = false
            }

            count++
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
            <MyVerticallyCenteredModal show={showModalInvalidStockInvalid}
            onHide={() => {setShowModalInvalidStockInvalid(false)}}/>

            {allVeryWell && <Navigate to={`${MyRoutes.BASE_AUTO_MODE}/${encodeURIComponent(stockFileIdentifier.path)}/${encodeURIComponent(redeFileIdentifier.path)}/${encodeURIComponent(caixaFileIdentifier.path)}/`} />}

        </main>
    </div>
    )
}

export default AutomaticFileSelection