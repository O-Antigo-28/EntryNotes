import React, { useId, useRef, useState } from "react"
import questionSVG from '../../assets/icons/fileSelector/question-circle.svg'
import infoSVG from '../../assets/icons/fileSelector/info-circle.svg'
import checkSVG from '../../assets/icons/fileSelector/check-circle-fill.svg'
import closeXFill from '../../assets/icons/fileSelector/x-red-circle-fill.svg'
import closeX from '../../assets/icons/fileSelector/x-red-circle.svg'
import { BsXCircle } from "react-icons/bs";
import "./fileSelector.css"
import { FileChooser } from "../../FileChooser"
import { useUpdateFileIdentifierByID } from "./../../atoms/fileIdentifiers"
const FileSelector = ({fileChooser, children} : {fileChooser: FileChooser, children?: React.ReactNode }) => { 
    const updateFileIdentifier = useUpdateFileIdentifierByID()
    const refInputFile = useRef(null)


    const[ path, setPath] = useState<string>("")
    const selectorFileId = useId()
    
    
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) { 
        const selectedFile = e.target.files[0]
        if(selectedFile){ 
            
            updateFileIdentifier(fileChooser.idFileIdentifier, selectedFile.name, selectedFile.path)
            setPath(selectedFile.name)
            
        }
        refInputFile.current.value = null


    }
    function handleClickEraseFile(){
        refInputFile.current.value = null
        updateFileIdentifier(fileChooser.idFileIdentifier, "", "")
        setPath("")
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
                    <input onChange={handleOnChange} type="file" id={selectorFileId} accept={fileChooser.fileType.acceptsToString()} ref={refInputFile} style={{display: "none"}} />
                </div>

                {children}
            </div>

            <div className="fileSelector__containerInfo">
                {path.length <= 0 && <img src={questionSVG} alt="" />}
                {path.length > 0 && <img src={checkSVG} alt=""/>}
                {path.length > 0 && <img src={closeX} onClick={handleClickEraseFile} alt=""/>}

            </div>


        </section>
    ) 
}


export default FileSelector