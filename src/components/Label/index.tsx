
import {ReactNode} from 'react'
import { Label } from './Label';
import AnchoredPrice from './AnchoredPrice';
import Price from '../Price/Price';
import './label.css'
import { useRemovePrintableLabelOnList } from '../../atoms/PritableLabelsAtom';
import BarcodeComercial from '../../components/BarcodeComercial';
import { IPrice } from '../../IPrice';
import closeIcon from "../../assets/icons/Label/x.svg"
import { PrintableLabel } from '../../pages/Labels/PrintableLabel';
const LabelElement = ({description, code, unitOfMeasure, value,currency, promotionalValue}: PrintableLabel) => {  
  const removePrintableLabel = useRemovePrintableLabelOnList()
  let valueArea: ReactNode = <Price value={value} currency={currency}/>
  let hasPromotion: boolean = false;
  let percent_promotion: number = 0
  let labelStyle = "label"
  if (typeof promotionalValue === "number"){
    hasPromotion = (promotionalValue < value && promotionalValue > 0.1)
  }
  if(hasPromotion){
    labelStyle = "label label_promotional"
    valueArea = <AnchoredPrice oldValue={value} value={promotionalValue}/> 
    
  }
 
  function handleDeleteLabel(e: React.MouseEvent<HTMLButtonElement>){
    removePrintableLabel(code)
  }




  return(
    <div className={labelStyle}>

      <span className="label__description">{description}</span>

      <div className="label__container">

        <div className="label__highlight">
          <span className='label__price'>
          {valueArea}
            </span>
          <span className="label__unit-measure">{unitOfMeasure}</span>
        </div>






      </div>
      {<div>
        
       </div>}
        {/* {code.trim() !== '0' && <span  className="label__barcode">
 
          <BarcodeComercial code={code} />
        </span>} */}
    <div className='label__actions no_print'>
      <button onClick={handleDeleteLabel}>
        <img src={closeIcon} style={{width: "26px", color:"red"}} alt="" />
      </button>
    </div>

    </div>
  )
}

export default LabelElement
