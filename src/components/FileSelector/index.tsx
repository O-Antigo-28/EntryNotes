import React, { useId, useState } from "react"
import questionSVG from '../../assets/icons/fileSelector/question-circle.svg'
import infoSVG from '../../assets/icons/fileSelector/info-circle.svg'
import checkSVG from '../../assets/icons/fileSelector/check-circle-fill.svg'
import "./fileSelector.css"
import { FileType } from "../../FileType"
import {MyFile} from "../../MyFile"
const FileSelector = ({onChange, fileType} : {fileType: FileType, onChange(file: MyFile, fileTypeName: string): void }) => { 
    
    const[ path, setPath] = useState("")
    const selectorFileId = useId()

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) { 
        const selectedFile = e.target.files[0]
        if(selectedFile){ 

            const choosenFile = new MyFile(selectedFile.name, selectedFile.path)
            
            setPath(selectedFile.name)

            onChange(choosenFile, fileType.name)
        }
    }

    return (
        <section className="fileSelector">
            <div className="container__fileSelector">
                <div>
                    <h4 className="fileSelector__title">{fileType.name}</h4>
                    <p>{path}</p>
                </div>

                <div>
                    <label className="inputLabel" htmlFor={selectorFileId}>buscar</label>
                    <input onChange={(event) => {handleOnChange(event) }} type="file" id={selectorFileId} accept={fileType.acceptsToString()} style={{display: "none"}} />
                </div>
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