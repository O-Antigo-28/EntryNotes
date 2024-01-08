import { CSSProperties } from "react"
import { Sale } from "../../Sale"
import { SaleItem } from "../../SaleItem"
import SystemInput from "../SystemInput"
import "./saleList.css"
import { clipboard } from "electron"

const copiedStyle: CSSProperties = {}

const SaleList = ({sale}:{sale: Sale}) => { 
    function handleOnClick(item: SaleItem){ 
        clipboard.writeText(item.product.code)
    }
    return (
        <div className="saleList__container">
            <ul className="saleList__list">
                {sale.itens.map((item, index) => { 
                    return (
                    <li key={index} className="saleList__item" onClick={() => { handleOnClick(item)}}>
                        <SystemInput value={item.product.code}>código</SystemInput>
                        <SystemInput value={item.product.value.toFixed(2)}>Vlr un</SystemInput>
                        <SystemInput value={item.quantitySold.toString()}>qtde</SystemInput>
                        <SystemInput value={item.result.toFixed(2)}>total</SystemInput>
                    </li>)
                })
                }

            </ul>
        </div>
    )
}

export default SaleList