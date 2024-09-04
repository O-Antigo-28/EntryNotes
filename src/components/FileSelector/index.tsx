import React, { useId, useState } from "react"
import questionSVG from '../../assets/icons/fileSelector/question-circle.svg'
import infoSVG from '../../assets/icons/fileSelector/info-circle.svg'
import checkSVG from '../../assets/icons/fileSelector/check-circle-fill.svg'
import "./fileSelector.css"
import { FileType } from "../../FileType"
import {FileIdentifier} from "../../FileIdentifier"
import { FileChooser } from "../../FileChooser"
import { useGetFileIdentifierByID, useUpdateFileIdentifierByID } from "./../../atoms/fileIdentifiers"
const FileSelector = ({fileChooser, children} : {fileChooser: FileChooser, children?: React.ReactNode }) => { 
    const updateFileIdentifier = useUpdateFileIdentifierByID()
    const getFileIdentifierByID = useGetFileIdentifierByID()
    const[ path, setPath] = useState<string>("")
    const selectorFileId = useId()
    
    
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) { 
        const selectedFile = e.target.files[0]

        if(selectedFile){ 
            
            console.log(`o arquivo ${selectedFile.name} tem o id: ${fileChooser.idFileIdentifier}`)
            updateFileIdentifier(fileChooser.idFileIdentifier, selectedFile.name, selectedFile.path)
            setPath(selectedFile.name)
            
        }
        // etapa de verificação
        const fileIdentifier = getFileIdentifierByID(fileChooser.idFileIdentifier)
        console.log(`O FileIdentifier de ID: ${fileIdentifier.id} foi atualizado com sucesso com o arquivo de caminho ${fileIdentifier.path} `)

    }

    return (
        <section className="fileSelector">
            <div className="container__fileSelector">
                <div>
                    <h4 className="fileSelector__title">{fileChooser.fileType.typeData}</h4>
                    <p>{path}</p>
                </div>

                <div>
                    <label className="inputLabel" htmlFor={selectorFileId}>buscar</label>
                    <input onChange={(event) => {handleOnChange(event) }} type="file" id={selectorFileId} accept={fileChooser.fileType.acceptsToString()} style={{display: "none"}} />
                </div>

                {children}
            </div>

            <div className="fileSelector__containerInfo">
                {path.length <= 0 && <img src={questionSVG} alt="" />}
                {path.length > 0 && <img src={checkSVG} alt=""/>}
                {path.length > 0 && <img src={infoSVG} alt=""/>}

            </div>


        </section>
    ) 
}


export default FileSelector