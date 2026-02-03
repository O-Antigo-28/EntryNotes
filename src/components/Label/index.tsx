
import {ReactNode} from 'react'
import { Label } from './Label';
import Price from '../Price/Price';
import './label.css'
import { useRemovePrintableLabelOnList } from '../../atoms/PritableLabelsAtom';
import BarcodeComercial from '../../components/BarcodeComercial';
import { IPrice } from '../../IPrice';
import closeIcon from "../../assets/icons/Label/x.svg"
const LabelElement = ({description, code, unitOfMeasure, value, currency}: Label & IPrice) => {  
  const removePrintableLabel = useRemovePrintableLabelOnList()
  let valueArea: ReactNode = <Price value={value} currency={currency}/>

  // CRIAR A LÓGICA DO PREÇO PROMOCIONAL
  // if (promotionalValue)
  //   valueArea = <AnchoredPrice oldValue={value} value={promotionalValue}/> 
  function handleDeleteLabel(e: React.MouseEvent<HTMLButtonElement>){
    removePrintableLabel(code)
  }

  return(
    <div className="label">
      <span className="label__description">{description}</span>

      <div className="label__container">

        <div className="label__highlight">
          <span className='label__price'>
          {valueArea}
            </span>
          <span className="label__unit-measure">{unitOfMeasure}</span>
        </div>






      </div>
        {code.trim() !== '0' && <span  className="label__barcode">
 
          <BarcodeComercial code={code} />
        </span>}
    <div className='label__actions no_print'>
      <button onClick={handleDeleteLabel}>
        <img src={closeIcon} style={{width: "26px", color:"red"}} alt="" />
      </button>
    </div>

    </div>
  )
}

export default LabelElement
