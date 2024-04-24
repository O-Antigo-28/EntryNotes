import "./formFileSelector.css"
import { FileIdentifier } from "../../FileIdentifier"
import { FileType } from "../../FileType"
import FileSelector from "../FileSelector"
import { useId } from "react"
import CheckBox from "../../components/CheckBox"
import { FileChooser } from "../../FileChooser"
import { useIDCaixaFIValue, caixaFileIdentifier, useIDRedeFIValue, redeFileIdentifier, useIDEstoqueFIValue, stockFileIdentifier, useSetFileInFileIdentifier } from "./../../atoms/fileIdentifiers"

const FormFileSelector = ({fileChoosers}: {fileChoosers: FileChooser[]} ) => {
    const caixaID = useIDCaixaFIValue();
    const redeID = useIDRedeFIValue();
    const stockID = useIDEstoqueFIValue();

    function handleChoiceFile(choiceFile: FileIdentifier, name: string): void{
        // identificar qual arquivo foi modificado 
        switch (choiceFile.id){
            case caixaID:
                useSetFileInFileIdentifier()

                break;
            case redeID:

                break;
            case stockID:

                break;
        }
        // fileChoosers.forEach((fileType, index) => {
        //     if(fileType.typeData === name){
        //         (updateFile(index, choiceFile))
        //         return
        //     }
        // })

    }

    function updateFile(index: number, data: FileIdentifier) {

    }

    return(
        <section className="formFileSelector">
            <h3>procure os arquivos</h3>
            <div className="formFileSelector__selectors">
                {fileChoosers.map((fileChooser, index) => {
                    return <FileSelector fileType={fileChooser.fileType} key={index} onChange={handleChoiceFile}></FileSelector>
                })}
            </div>
        </section>
    )
}
export default FormFileSelector