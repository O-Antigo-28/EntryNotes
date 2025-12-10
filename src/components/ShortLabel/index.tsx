import BarcodeComercial from "../../components/BarcodeComercial"
import { Label } from "../../components/Label/Label"
import { IPrice } from "../../IPrice"
const ShortLabel = ({code, description, value, currency, unitOfMeasure}:  Label & IPrice) =>{
    return (
        <div className="shortlabel">
            <span className="shortlabel__description">{description}</span>
            <span></span>
            <BarcodeComercial code={code}/>
        </div>
    )
}

export default ShortLabel