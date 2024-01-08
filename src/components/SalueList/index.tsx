import { Sale } from "../../Sale"

const SalueList = ({salues}:{salues: Sale[]}) => { 
    return (
        <div className="productList__container">
            <li className="productList__list">
                {salues.map((salue, index) => { 
                    return (
                    <ul key={index} className="productList__item">
                        <div className="productList__item--header">
                            <span className="productList__Item--property">{salue.product.code}</span>
                            <span className="productList__Item--property">{salue.product.description}</span>
                        </div>
                        <div className="productList__item--body">
                            <span className="productList__Item--property">{salue.product.value}</span>
                            <span className="productList__Item--property">{salue.quantitySold}</span>
                            <span className="productList__Item--property">{salue.result}</span>
                        </div>
                    </ul>)
                })
                }

            </li>
        </div>
    )
}

export default SalueList