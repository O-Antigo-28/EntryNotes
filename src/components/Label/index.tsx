
import {ReactNode} from 'react'
import { Label } from './Label';
import Price from './Price';
import './label.css'
import AnchoredPrice from './AnchoredPrice';
import BarcodeComercial from '../../components/BarcodeComercial';

const LabelElement = ({description, code, unitOfMeasure, valueProduct, promotionalValue}: Label) => {  
  
  let valueArea: ReactNode = <Price value={valueProduct}/>
  

  if (promotionalValue)
    valueArea = <AnchoredPrice oldValue={valueProduct} value={promotionalValue}/> 


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
