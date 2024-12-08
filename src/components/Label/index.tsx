
import React, {ReactNode}from 'react'
import { Label } from './Label';
import Price from './Price';
import './label.css'




const LabelElement = ({description, code, unitOfMeasure, value, promotionalValue}: Label) => {

  if(promotionalValue){

  }

  return(
    <div className="label">
      <span className="label__description">{description}</span>
      <span className="label__code">{code}</span>
      <Price value={value}/>
      <span className="label__unit-measure">{unitOfMeasure}</span>
     

      {promotionalValue && <span className="label__promotional">Promoção</span> }
      <img src="" alt="" />
    </div>
  )
}

export default LabelElement
