import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import Form  from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import PriceInput from "../../components/PriceInput"
import { createBarcodeEAN13 } from "../../components/Label/createBarcode"
import React, { useState, useRef} from "react"
import "./labels.css"
import SystemInput from "../../components/SystemInput"
import {Label}  from "../../components/Label/Label"
import LabelElement from "../../components/Label"
import { mapUnitsOfMeasure } from "./../../mapUnitsOfMeasure"
import MeasureBox from "../../components/MeasureBox"
import { PrintableLabel } from "./PrintableLabel"
import { useForm, SubmitHandler, Controller} from "react-hook-form"
import Price from "../../components/Label/Price"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useReactToPrint } from "react-to-print";
const Labels = () => { 

    const contentRef = useRef<HTMLUListElement>(null);
    const reactToPrintFn = useReactToPrint({ contentRef });

    const [printableLabels, setPrintableLabels] = useState<Array<PrintableLabel>>([])
    const [showModal, setShowModal] = useState(false)
    const currentPrintableLabel = useRef<PrintableLabel | null>(null)
    
    const[ valueProduct, setValueProduct]= useState<string>("0.00")
    const[ promotionalValueProduct, setPromotionalValueProduct] = useState<string>("0.00")
    const[widthValue, setWidthValue] = useState<string>("10")
    const[heightValue, setHeightValue] = useState<string>("3.40")

    const printableLabelSchema = z.object({
        code: z.string().min(6, {message: "O Formato minimo é o UPC-E"}).max(13, {message: "O formato máximo é o EAN13"}).regex(/^\d+$/),
        description: z.string().max(35), 
        unitOfMeasure: z.enum(["kg", "un" , "g", "l", "ml", "dz",  "pct", "fd" , "cx"]),
        valueProduct: z.coerce.number(),
        promotionalValue: z.coerce.number(),
        width: z.coerce.number(), 
        height: z.coerce.number(),
        lengthUnit: z.enum(["mm" , "cm"])
    })
    type FormPrintableLabel = z.infer<typeof printableLabelSchema>;
    const {register, handleSubmit, formState:{errors}, control, reset, setFocus} = useForm<FormPrintableLabel>({resolver: zodResolver(printableLabelSchema)})

    function updatePrintableLabel(old: PrintableLabel, current: PrintableLabel){
        Object.assign(old, current);
    }
    function hasCreatedLabel(label: PrintableLabel){
        return printableLabels.map((printableLabel) => printableLabel.code).indexOf(label.code) !== -1
    }

    function resetFields(){
        setPromotionalValueProduct("")
        setValueProduct("")
        setFocus("code")
        reset()
    }
    
    function handleCloseModal(){
        setShowModal(false)
    }
    function handleUpdateLabel(){
        if(currentPrintableLabel.current){
            const printableLabelToUpdate = printableLabels.find((printableLabel) => (printableLabel.code === currentPrintableLabel.current?.code))
            if (printableLabelToUpdate){
                updatePrintableLabel(printableLabelToUpdate, currentPrintableLabel.current)
                setPrintableLabels((old) => (old))
            }
            
        }
        resetFields()
        handleCloseModal()

    }
    if (currentPrintableLabel.current){

    }
    function addInPrintableLabels (data: PrintableLabel) {
        if (!data)
            return
        console.log(data)
        console.log(PrintableLabel.isValid(data))
        if(!PrintableLabel.isValid(data)){
            return
        }

        currentPrintableLabel.current = data

        if(hasCreatedLabel(data)){
            setShowModal(true)
            return
        }


       setPrintableLabels((printableList) => [...printableList, data])
       resetFields()
        
    }

  
    const onSubmit: SubmitHandler<FormPrintableLabel> = (data) => {
        console.log(data)
        const printableLabel = new PrintableLabel(createBarcodeEAN13(data.code),
        data.description,
        data.unitOfMeasure, 
        data.valueProduct,
        data.width, 
        data.height, 
        data.lengthUnit, 
        data.promotionalValue)
        addInPrintableLabels(printableLabel)
    }


    return (
        <>
            <h2 className="p-2">criar placa</h2>
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)} >  
                <Stack className="form" gap={2} >
                    <Stack direction={"horizontal"} gap={2}>              
                        <div style={{width: "27ch"}}>
                            <SystemInput maxLength={13} required {...register("code")}>Código de barras</SystemInput>
                        </div> 
                        <SystemInput maxLength={35} required {...register("description")}>Descrição</SystemInput>
                    </Stack>    

                    <Form.Select {...register("unitOfMeasure")}>
                        {[...mapUnitsOfMeasure].map(([key, value]) => <option key={key} value={key}>{value}</option>)}
                    </Form.Select>
                            
                    <Stack direction="horizontal" className="d-flex" gap={2} >
                        
                        <div className="container-PriceInput">
                            <Controller name="valueProduct"
                                control={control}        
                                render={({ field }) => (
                                    <PriceInput required {...field} setValue={setValueProduct} value={valueProduct}>Valor do produto</PriceInput>
                            )}/>
                                
                        </div>

                        <div className="container-PriceInput">
                            <Controller 
                                name="promotionalValue"
                                defaultValue={0.00}
                                control={control}
                                render={({field}) => (
                                <PriceInput {...field} value={promotionalValueProduct} setValue={setPromotionalValueProduct}>Valor Promocional</PriceInput>
                            )}/>
                        </div>
                    </Stack>
                            

                    <h2 className="p-2 mt-5">Medidas das plaquinhas</h2>
                    <Stack direction="horizontal" gap={2} className="p-2">
                        <div className="container-PriceInput">
                            <Controller
                                name="width"
                                defaultValue={10}
                                control={control}
                                render={({field}) => ( 
                                <PriceInput {...field} required setValue={setWidthValue} value={widthValue}>Comprimento</PriceInput>)}/>
                           
                        </div>

                        <div className="container-PriceInput">
                            <Controller name="height" defaultValue={3.40} control={control} render={({field}) => (
                                
                                <PriceInput {...field} required setValue={setHeightValue} value={heightValue}>Altura</PriceInput>
                            )}/>
                           
                        </div>

                        <Form.Select style={{width: "30%"}} {...register("lengthUnit")}>
                            <option value="cm">cm</option>
                            <option value="mm">mm</option>
                        </Form.Select>
                    </Stack>

                    <Button type="submit" variant="primary" className="w-100">Criar plaquinha</Button>
                </Stack>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    {currentPrintableLabel.current &&  <Modal.Body>Quer atualizar a plaquinha ?</Modal.Body>}
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="warning" onClick={handleUpdateLabel}>
                        Alterar
                    </Button>
                    </Modal.Footer>
                </Modal>

            </form>  
            
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