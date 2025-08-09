import Stack from "react-bootstrap/Stack"
import Form  from "react-bootstrap/Form"
import Modal from "react-bootstrap/Modal"
import PriceInput from "../../../components/PriceInput"
import Button from "react-bootstrap/Button"
import "../labels.css"
import React, { useState, useRef} from "react"
import SystemInput from "../../../components/SystemInput"
import { mapUnitsOfMeasure } from "../../../mapUnitsOfMeasure"
import { PrintableLabel } from "../PrintableLabel"
import { useForm, SubmitHandler, Controller} from "react-hook-form"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {findProductByBarcode} from "../../../findProductByBarcode"
import { PrintableLabelHookResponses, useAddPrintableLabel, useUpdatePrintableLabel} from "../../../atoms/PritableLabelsAtom"
import { ipcRenderer } from "electron"


const QuickCreationLabels = () => {
    
    
        const [showModal, setShowModal] = useState(false)
        const currentPrintableLabel = useRef<PrintableLabel | null>(null)
        const addPrintableLabel = useAddPrintableLabel()
        const updatePrintableLabel = useUpdatePrintableLabel()
        
        const[ valueProduct, setValueProduct]= useState<string>("0.00")
        const[ promotionalValueProduct, setPromotionalValueProduct] = useState<string>("0.00")

        const LIMIT_DESCRIPTION = 76
        const printableLabelSchema = z.object({
            code: z.string().min(1, {message: "digite algo pelo menos né"}).max(13, {message: "O formato máximo é o EAN13"}).regex(/^\d+$/),
            description: z.string().max(LIMIT_DESCRIPTION), 
            unitOfMeasure: z.enum(["kg", "un" , "g", "l", "ml", "dz",  "pct", "fd" , "cx"]),
            valueProduct: z.coerce.number(),
            promotionalValue: z.coerce.number(),

        })
        type FormPrintableLabel = z.infer<typeof printableLabelSchema>;
        const {register, handleSubmit, formState:{errors}, control, reset, setFocus, getValues, setValue} = useForm<FormPrintableLabel>({resolver: zodResolver(printableLabelSchema)})
    

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
            console.log(updatePrintableLabel(currentPrintableLabel.current))
            resetFields()
            handleCloseModal()
    
        }

        function addInPrintableLabels (data: PrintableLabel) {
            switch(addPrintableLabel(data)){
                case PrintableLabelHookResponses.HAS_CREATED:
                    currentPrintableLabel.current = data
                    setShowModal(true)
                    return
            }
            resetFields()
            
        }
    
        async function searchProduct(){
            const code = getValues('code');
            console.log(code)
            ipcRenderer.invoke('ipc-get-product-by-barcode', code ).then((product) => {
                if (product) {
                    setValue('description', product.description);
                    setValue('valueProduct', product.value);
                    setValueProduct(product.value)
                } else {
                    setValue('description', '');
                    setValue('valueProduct', 0);
                    setValueProduct("")

                }
            })


        }

        const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter') {
                searchProduct();
            }
        };
        const onSubmit: SubmitHandler<FormPrintableLabel> = (data) => {
            const printableLabel = new PrintableLabel(data.code,
            data.description,
            data.unitOfMeasure, 
            data.valueProduct,
            10, 3.40, "cm",
            data.promotionalValue)
            currentPrintableLabel.current = printableLabel

            addInPrintableLabels(printableLabel)
        }
    
    return(
        <div>
       
            <form action="" method="post" onSubmit={handleSubmit(onSubmit)} >  
                <Stack className="form" gap={2} >
                    <Stack direction={"horizontal"} gap={2}>              
                        <div style={{width: "27ch"}}>
                            <SystemInput maxLength={13} required {...register("code")} onKeyDown={onKeyDown} >Código de barras</SystemInput>
                        </div> 
                        <SystemInput maxLength={LIMIT_DESCRIPTION} required {...register("description")}>Descrição</SystemInput>
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
                            

       

                    <Button type="submit" variant="primary" className="w-100">Criar plaquinha</Button>
                </Stack>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    {currentPrintableLabel.current &&  <Modal.Body>Deseja atualizar a plaquinha ?</Modal.Body>}
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
        </div>
    )
}

export default QuickCreationLabels