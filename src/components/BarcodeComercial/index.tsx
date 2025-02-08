import { Barcode  as BarcodeModel} from "./../../Barcode";
import './barcodecomercial.css'
import Barcode,{BarcodeProps} from "react-barcode";
const BarcodeComercial =({code}: {code: string}) => {
    const isEAN13 = BarcodeModel.isEAN13Barcode(code)
    const barcodeOptions: BarcodeProps = {
      value: code,
      format: isEAN13? "EAN13" : "CODE39",
    }
  
    let height = 40
    let width = 1 /( code.length / 2 )
    if(isEAN13){
      barcodeOptions.value = BarcodeModel.createBarcodeEAN13(code)
      height = 50
      width = 1
  
    }
  
    return(
      <div className='BarcodeComercial'>
        <Barcode height={height} width={width}{ ...barcodeOptions} />
  
      </div>
  )
}

export default BarcodeComercial