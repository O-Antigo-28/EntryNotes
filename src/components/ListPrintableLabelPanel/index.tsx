import PrintableLabelList from "../../pages/Labels/PrintableLabelList"
import SystemInput from "../../components/SystemInput"
import { useCountPrintableLabel, usePrintPrintableLabels } from "../../atoms/PritableLabelsAtom"
import Button from "react-bootstrap/Button"
import './listprintablelabelpanel.css'
import { MutableRefObject, Ref, useRef } from "react"



const ListPrintableLabelPanel = () => {
    const countPrintableLabel = useCountPrintableLabel()
    const contentRef = useRef<HTMLUListElement>()
    const printPrintableLabels = usePrintPrintableLabels(contentRef)
    return(
        <section className="ListPrintableLabelPanel">
            <header className="ListPrintableLabelPanel__header">
                <div style={{width: "50%"}}>
                    <h2 className="ListPrintableLabelPanel__title">Plaquinhas</h2>

                </div>
                <div style={{width: "30%"}}>
                    <SystemInput propValue={String(countPrintableLabel)}>Qtde Plaquinhas</SystemInput>

                </div>
            </header>
            <div className="ListPrintableLabelPanel__list">
                <PrintableLabelList ref={contentRef as Ref<HTMLUListElement>}></PrintableLabelList>
            </div>
            <Button style={{margin: "auto", visibility: countPrintableLabel>0? 'visible' : "hidden"}} onClick={(e) => {printPrintableLabels()}}>Imprimir plaquinhas</Button>


        </section>
    )

}

export default ListPrintableLabelPanel