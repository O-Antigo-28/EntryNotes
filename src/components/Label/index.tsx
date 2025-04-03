
import {ReactNode} from 'react'
import { Label } from './Label';
import Price from '../Price/Price';
import './label.css'

import BarcodeComercial from '../../components/BarcodeComercial';
import { IPrice } from '../../IPrice';

const LabelElement = ({description, code, unitOfMeasure, value, currency}: Label & IPrice) => {  
  
  let valueArea: ReactNode = <Price value={value} currency={currency}/>

  // CRIAR A LÓGICA DO PREÇO PROMOCIONAL
  // if (promotionalValue)
  //   valueArea = <AnchoredPrice oldValue={value} value={promotionalValue}/> 


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

    </div>
  )
}

export default LabelElement
