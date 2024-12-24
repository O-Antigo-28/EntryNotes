
import React, {ReactNode}from 'react'
import { Label } from './Label';
import Price from './Price';
import './label.css'
import { mapUnitsOfMeasure } from '../../mapUnitsOfMeasure';
import AnchoredPrice from './AnchoredPrice';




const LabelElement = ({description, code, unitOfMeasure, valueProduct, promotionalValue}: Label) => {  
  
  let valueArea: ReactNode = <Price value={valueProduct}/>
  

  if (promotionalValue)
    valueArea = <AnchoredPrice oldValue={valueProduct} value={promotionalValue}/> 


  return(
    <div className="label">
      <span className="label__description">{description}</span>

      <div className="label__highlight">
        <span className='label__price'>
         {valueArea}
          </span>
        <span className="label__unit-measure">por {mapUnitsOfMeasure.get(unitOfMeasure)}</span>
      </div>
    </div>
  )
}

export default LabelElement
