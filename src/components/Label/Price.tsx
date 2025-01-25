import {hasDecimalPlaces, getDecimal} from "../../decimais"
import { IPrice } from "./IPrice"
import "./price.css"

const Price = ({value, currency="R$"}: IPrice) => { 
    const integer = String(Math.floor(value))
    let decimal: string = "";


    if(hasDecimalPlaces(value)){
      decimal = getDecimal(value).toString()
    }
    
    while(decimal.length < 2){
      decimal = "0" + decimal
    }
    
    console.log(decimal)
  
    const DELIMITER_OF_VALUE = ","
  
    return (
      <div className="price">
        <span className="price__currency">{currency}</span>
        <div className="value">
          <span className="value__integer">{integer}</span>
          <span className='value__delimiter'>{DELIMITER_OF_VALUE}</span>
          <span className="value__decimal">{decimal}</span>
        </div>
      </div>
    )
  }

export default Price