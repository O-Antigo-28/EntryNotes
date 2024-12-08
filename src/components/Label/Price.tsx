import {hasDecimalPlaces, getDecimal} from "../../decimais"
import { Currency } from "./TCurrency"
const Price = ({value, currency="R$"}: {value: number, currency?: Currency}) => { 
    const integer = String(Math.floor(value))
    let decimal = "00"
    
    if(hasDecimalPlaces(value)){
      decimal = getDecimal(value).toFixed(2).replace("0.", "")
    }
  
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