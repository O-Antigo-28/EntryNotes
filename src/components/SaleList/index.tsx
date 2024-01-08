import { CSSProperties } from "react"
import { Sale } from "../../Sale"
import SystemInput from "../SystemInput"
import "./saleList.css"


const copiedStyle: CSSProperties = {}

const SaleList = ({sales}:{sales: Sale[]}) => { 
    return (
        <div className="saleList__container">
            <ul className="saleList__list">
                {sales.map((sale, index) => { 
                    return (
                    <li key={index} className="saleList__item">
                        <SystemInput value={sale.product.code}>código</SystemInput>
                        <SystemInput value={sale.product.value.toFixed(2)}>Vlr un</SystemInput>
                        <SystemInput value={sale.quantitySold.toString()}>qtde</SystemInput>
                        <SystemInput value={sale.result.toFixed(2)}>total</SystemInput>
                    </li>)
                })
                }

            </ul>
        </div>
    )
}

export default SaleList