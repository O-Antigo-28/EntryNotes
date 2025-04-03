import { PrintableLabel } from "../../pages/Labels/PrintableLabel"
import { connectDB } from "../../DBConfig"
import { TModelLabel } from "./TModelPrintableLabel"
import { PoolClient } from "pg"
import { TModelPrice } from "./TModelPrice"
import { IPrice } from "../../IPrice"
import { IPricing } from "./IPrincing"

export async function searchPrintableLabelByBarcode(barcode: string):Promise<PrintableLabel> {

    // CRIAR A LÓGICA DE TRATAMENTO DE BARCODE

    
    const printableLabel: Partial<PrintableLabel> = {}
    const client = await connectDB().connect()
    try{
        
        const label = await searchLabelByBarcode(client, barcode)
        if( !label){
            throw new Error("Não foi possivel encontrar essa plaquinha")
        }

        Object.assign(printableLabel, label)

        const lastPrice = await lastPriceByBarcode(client, barcode)

        if(!lastPrice){
            throw new Error("Plaquinha sem preço")
        }

        Object.assign(printableLabel, lastPrice) 


        
        
    }catch(e){
        console.error(e)
    }finally{
        client.release()
    }
    return printableLabel as PrintableLabel

}
type TLabel = Pick<PrintableLabel, "code" | "description" | "unitOfMeasure">

async function searchLabelByBarcode(client: PoolClient, barcode: string): Promise<TLabel | null>{
    try{ 
        const query = {text: "SELECT * FROM TAG WHERE barcode = $1", values:[barcode]}

        const resultTag  = await client.query<TModelLabel>(query)
        if(!resultTag.rowCount)
            throw new Error("Não existe nenhuma etiqueta com este código " + barcode)
        if( resultTag.rowCount === 0){    
            throw new Error("Não existe etiqueta com esse codigo")
        }
                    
        return  {code: resultTag.rows[0].barcode, description: resultTag.rows[0].description, unitOfMeasure: resultTag.rows[0].comercial_unit_measure}
    }catch(e){
        return null
    }
}
async function lastPriceByBarcode(client: PoolClient, barcode: string): Promise<IPricing| null>{
    try{
        const resultPrice = await client.query<TModelPrice>("SELECT * FROM PRICE WHERE PRICE_DATE = (SELECT MAX(PRICE_DATE) FROM PRICE) ")
        if(!resultPrice.rowCount){
            throw new Error("Não foi Possível fazer a consulta a tabela preço")
        }
        if (resultPrice.rowCount === 0){
            throw new Error("A etiqueta ainda não foi precificada")
        }
        // MUDAR ESSA LOGICA DE CURRENCY
        return {tag_id: barcode, timestamp: resultPrice.rows[0].price_date, value: resultPrice.rows[0].price_value, currency: "R$"}
            
    }catch(e){
        console.error(e)
        return null
    }

    
}