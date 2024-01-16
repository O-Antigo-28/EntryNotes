import { CSSProperties, ChangeEvent, MouseEvent, useEffect, useState, useImperativeHandle } from "react"
import { Sale } from "../../Sale"
import { SaleItem } from "../../SaleItem"
import SystemInput from "../SystemInput"
import "./saleList.css"
import { Indexer } from "../../Indexer"
import { clipboard } from "electron"


const SaleList = ({items, index, selectItem}:{items: SaleItem[], index:number, selectItem(index:number):void}) => { 

    
    useEffect(()=>{ 
        clipboard.writeText(items[index].product.code)
    }, [items[index]])


    function handleOnClick(event: MouseEvent<HTMLElement>, item: SaleItem, index: number){ 
        clipboard.writeText(item.product.code) 
        selectItem(index)
      
    }

    return (
        <div className="saleList__container">
            <ul className="saleList__list">
                {items.map((item, id) => { 
                    return (
                    <li key={id} className={items[index] === item?"saleList__item saleList__item--copied" : "saleList__item"} onClick={(event) => { handleOnClick(event, item, id)}}>
                        <SystemInput value={item.product.code}>código</SystemInput>
                        <SystemInput value={item.product.value.toFixed(2)}>Vlr un</SystemInput>
                        <SystemInput value={item.quantitySold.toString()} style={{textAlign: "center"}}>qtde</SystemInput>
                        <SystemInput value={item.result.toFixed(2)}>total</SystemInput>
                    </li>)
                })
                }

            </ul>
        </div>
    )
}

export default SaleList