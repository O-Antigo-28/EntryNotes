import { PoolClient } from "pg";
import { PrintableLabel } from "../pages/Labels/PrintableLabel";
import { connectDB } from "./../DBConfig";
export async function createLabel(printableLabel: PrintableLabel){

    const client = await connectDB().connect()
    try{
        client.query("BEGIN")
        client.query("INSERT INTO TAG(BARCODE, DESCRIPTION) VALUES($1, $2);", [printableLabel.code, printableLabel.description])
        client.query("INSERT INTO PRICE(PRICE_VALUE, TAG_ID) VALUES($1, $2);", [printableLabel.valueProduct, printableLabel.code ])
        client.query("COMMIT")
    }catch(e){
        client.query("ROLLBACK")
        
    }finally{
        client.release()
        
    }
}
export async function createPrice(client: PoolClient ,barcode: string, price: number){
    client.query("INSERT INTO PRICE(PRICE_VALUE, TAG_ID) VALUES($1, $2);", [price, barcode ])

}
export async function updateLabel(printableLabel: PrintableLabel){
        const client = await connectDB().connect()
    try{
        await client.query("UPDATE TAG SET DESCRIPTION = $1 WHERE BARCODE = ")
        const result  = await client.query("SELECT * FROM TAG WHERE = $1", [printableLabel.code])
        console.log(result.rows)
    }catch(e){
        console.error(e)
        client.query("ROLLBACK")
    }finally{
        client.release()
    }
    
}
export async function searchLabelByBarcode(barcode: string):Promise<PrintableLabel> {
    // CRIAR A LÓGICA DE TRATAMENTO DE BARCODE

    
    const client = await connectDB().connect()
    try{
        const query = {text: "SELECT * FROM TAG WHERE barcode = $1", values:[barcode]
        }
        const resultTag  = await client.query(query)
        
        const resultPrice = await client.query("SELECT * FROM PRICE WHERE TAG_ID = $1", [barcode])
        resultPrice.rows
        
    }catch(e){
        console.error(e)
        client.query("ROLLBACK")
    }finally{
        client.release()
    }
    return new PrintableLabel("423", "jrje", "cx", 35,235, 234, "cm")

}