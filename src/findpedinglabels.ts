import { PrintableLabel } from "./pages/Labels/PrintableLabel";
import { IProduct } from "./IProduct";
import { transformproductInDefaultPrintableLable } from "./transformproductInDefaultPrintableLable";
export async function findpedinglabels(): Promise<PrintableLabel[]|undefined> {
    const result = await fetch("http://127.0.0.1:3001/pendinglabels")
    const products: IProduct[] = await result.json()
    
    return products.map((product):PrintableLabel => {
        const barcode = product.barcode.replace(/^0+/, "");
        return transformproductInDefaultPrintableLable({...product, barcode})
    })
}