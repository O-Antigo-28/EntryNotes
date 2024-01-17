import "./formFileSelector.css"
import { MyFile } from "../../MyFile"
import { FileType } from "../../FileType"
import FileSelector from "../FileSelector"

const FormFileSelector = ({filesType, onChange}: {filesType: {fileType: FileType, myFile: MyFile}[], onChange(newFilesType: {fileType: FileType, myFile: MyFile}[]):void}) => { 

    function handleChoiceFile(choiceFile: MyFile, name: string): void{
        filesType.forEach((file, index) => { 
            if(file.fileType.name === name){ 
                onChange(updateFile(index, choiceFile))
                return
            } 
        })

    }

    function updateFile(index: number, data: MyFile){ 
        const updatedFiles = [...filesType]
        updatedFiles[index].myFile = data
        return updatedFiles
    

    }
    return(
        <section className="formFileSelector">
            <h3>procure os arquivos</h3>
            <div className="formFileSelector__selectors">
                {filesType.map((item, index) => { 
                    return <FileSelector fileType={item.fileType} key={index} onChange={handleChoiceFile}/>
                })}
            </div>
        </section>
    )
}
export default FormFileSelector