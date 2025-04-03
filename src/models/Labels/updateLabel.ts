import { PrintableLabel } from "../../pages/Labels/PrintableLabel";
import { connectDB } from "../../DBConfig";
export async function updateLabel(printableLabel: PrintableLabel){
    const client = await connectDB().connect()
try{
    await client.query("BEGIN")
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
