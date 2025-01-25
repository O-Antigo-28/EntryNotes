
import React, {ReactNode}from 'react'
import { Label } from './Label';
import Price from './Price';
import './label.css'
import { mapUnitsOfMeasure } from '../../mapUnitsOfMeasure';
import AnchoredPrice from './AnchoredPrice';
import Barcode from 'react-barcode';
import mercadinhoacb from "../../assets/icons/Label/mercadinhoacb.svg"

const BarcodeComercial =({code}: {code: string}) => {
  return <Barcode value={code} format='GenericBarcode' />
}

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
          <Barcode value={code} format='EAN13' height={50} width={1}/>
        </span>



      </div>

    </div>
  )
}

export default LabelElement
