
import {ReactNode} from 'react'
import { Label } from './Label';
import Price from '../Price/Price';
import './label.css'
import { useRemovePrintableLabelOnList } from '../../atoms/PritableLabelsAtom';
import BarcodeComercial from '../../components/BarcodeComercial';
import { IPrice } from '../../IPrice';
import IconButton from '../../components/IconButton';
import { IoIosClose } from "react-icons/io";

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


        <span  className="label__barcode">
 
          <BarcodeComercial code={code} />
        </span>



      </div>
    <div className='label__actions no_print'>
      <IconButton Icon={IoIosClose} size={25} onClick={handleDeleteLabel}></IconButton>
    </div>

    </div>
  )
}

export default LabelElement
