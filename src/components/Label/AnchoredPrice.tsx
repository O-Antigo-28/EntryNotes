import { ReactNode } from "react";
import { IPrice } from "../../IPrice"
import "./anchored-price.css"
import Price from "./../Price/Price";
interface IAnchoredPrice extends IPrice {
    oldValue: number;
}

const AnchoredPrice = ({oldValue, value, currency}: IAnchoredPrice) => {
    
    return (
        <div className="anchored-price">
            <span className="anchored-price__item">R$<span className="anchored-price__old-price"> {Number(oldValue).toFixed(2)}</span> por</span>
            <Price value={value} currency={currency}/>
        </div>
    )
}
export default AnchoredPrice;