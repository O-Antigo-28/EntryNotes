import "./formFileSelector.css"
import { FileIdentifier } from "../../FileIdentifier"
import { FileType } from "../../FileType"
import FileSelector from "../FileSelector"
import { useId } from "react"
import CheckBox from "../../components/CheckBox"
import { FileChooser } from "../../FileChooser"
import { useIDCaixaFIValue, caixaFileIdentifier, useIDRedeFIValue, redeFileIdentifier, useIDEstoqueFIValue, stockFileIdentifier, useSetFileInFileIdentifier } from "./../../atoms/fileIdentifiers"

const FormFileSelector = ({fileChoosers}: {fileChoosers: FileChooser[]} ) => {

    return(
        <section className="formFileSelector">
            <h3>procure os arquivos</h3>
            <div className="formFileSelector__selectors">
                {fileChoosers.map((fileChooser, index) => {
                    return <FileSelector fileChooser={fileChooser} key={index} ></FileSelector>
                })}
            </div>
        </section>
    )
}
export default FormFileSelector