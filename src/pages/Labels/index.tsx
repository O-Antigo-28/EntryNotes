import Button from "react-bootstrap/Button"

import React, { useState, useRef} from "react"
import { createBarcodeEAN13 } from "../../components/Label/createBarcode"
import "./labels.css"
import SystemInput from "../../components/SystemInput"
import {Label}  from "../../components/Label/Label"
import LabelElement from "../../components/Label"
import { mapUnitsOfMeasure } from "./../../mapUnitsOfMeasure"
import MeasureBox from "../../components/MeasureBox"
import { PrintableLabel } from "./PrintableLabel"
import { useForm, SubmitHandler, Controller} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import Tabs from "react-bootstrap/Tabs"
import Tab  from "react-bootstrap/Tab"
import { useReactToPrint } from "react-to-print";
import Title from "../../components/Title"
import QuickCreationLabels from "./QuickCreationLabels"
import { usePrintableLabels } from "../../atoms/PritableLabelsAtom"
import LabelsGroupList from "./LabelsGroupList"
const Labels = () => { 

    const contentRef = useRef<HTMLUListElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef
         });
    const printableLabels = usePrintableLabels()
 

    return (
        <>
            <Title>Labels</Title>
            <Tabs defaultActiveKey={"default-creation"}>
                <Tab title="Criação Padrão" eventKey={"default-creation"} >
                    <QuickCreationLabels></QuickCreationLabels>
                </Tab>
                <Tab title="Criação por Grupo" eventKey={"group-creation"}>
                    <LabelsGroupList></LabelsGroupList>
                </Tab>
            </Tabs>
            
            <div className="labels">
                <Button style={{margin: "auto"}} onClick={(e) => reactToPrintFn()}>Imprimir plaquinhas</Button>
                
                <ul style={{overflow: "hidden", display: "flex", flexDirection:"row", flexWrap: "wrap" }}  ref={contentRef}>
                            {printableLabels.map((printableLabel) => {
                                return( 
                                <MeasureBox key={printableLabel.code} height={printableLabel.height}  width={printableLabel.width} lengthUnit={printableLabel.lengthUnit}>
                                    <LabelElement {...printableLabel} key={printableLabel.code}/>
                                </MeasureBox>)
                            })}
                </ul>

            </div>



                

        </>
    )
}

export default Labels