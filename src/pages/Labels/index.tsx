import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import Form  from "react-bootstrap/Form"
import PriceInput from "../../components/PriceInput"

import React, { useState } from "react"
import "./labels.css"
import SystemInput from "../../components/SystemInput"
import { UnitOfMeasure } from "../../components/Label/Label"


const Labels = () => { 

    const mapUnitsOfMeasure = new Map<string, UnitOfMeasure>()
    mapUnitsOfMeasure.set("Unidade", "un")
    mapUnitsOfMeasure.set("Quilo", "kg")
    mapUnitsOfMeasure.set("Caixa", "cx")
    mapUnitsOfMeasure.set("Fardo", "fd")
    mapUnitsOfMeasure.set("Gramas", "g")
    mapUnitsOfMeasure.set("Dúzia", "dz")
    mapUnitsOfMeasure.set("Pacote", "pct")
    mapUnitsOfMeasure.set("Miligramas", "ml")

    const[ valueProduct, setValueProduct ]= useState<string>("")
    const[ promotionalValueProduct, setPromotionalValueProduct] = useState<string>("")
    function handleOnChangeBarcodeInput(e: React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
    }

    


    return (
        <>

                <Stack gap={3} direction="horizontal">

                    <Stack gap={2} style={{width: "50%"}}>
                        
                        <div style={{width: "20ch"}}>
                            <SystemInput maxLength={13}>Código de barras</SystemInput>
                        </div>
                        <Form.Select aria-label="Default select example">
                            {[...mapUnitsOfMeasure].map(([key, value]) => <option value={value}>{key}</option>)}
                        </Form.Select>
                        <SystemInput aria-multiline >Descrição</SystemInput>
                        <Stack direction="horizontal" className="d-flex" gap={2} >
                            
                            <div className="container-PriceInput">
                                <PriceInput setValue={setValueProduct} value={valueProduct}>Valor do produto</PriceInput>
                            </div>

                            <div className="container-PriceInput">
                                <PriceInput setValue={setPromotionalValueProduct}  value={promotionalValueProduct}>Valor COM desconto</PriceInput>
                            </div>
                        </Stack>
                        
                    <Button type="submit" variant="primary" className="w-100">Criar plaquinha</Button>
                    </Stack>
                    <Stack>
                        <div>placa 1</div>
                        <div>placa 2</div>
                    </Stack>
                    
                </Stack>





                

        </>
    )
}

export default Labels