import { PrintableLabel } from "../../pages/Labels/PrintableLabel"
import { connectDB } from "../../DBConfig"
export async function createLabel(printableLabel: PrintableLabel){

    const client = await connectDB().connect()
    try{
        client.query("BEGIN")
        client.query("INSERT INTO TAG(BARCODE, DESCRIPTION, COMERCIAL_UNIT_MEASURE) VALUES($1, $2, $3);", [printableLabel.code, printableLabel.description, printableLabel.unitOfMeasure])
        client.query("INSERT INTO PRICE(PRICE_VALUE, PRICE_CURRENCY, TAG_ID) VALUES($1, $2, $3);", [printableLabel.value, "R$", printableLabel.code ])
        client.query("COMMIT")
    }catch(e){
        client.query("ROLLBACK")
        
    }finally{
        client.release()
        
    }
}