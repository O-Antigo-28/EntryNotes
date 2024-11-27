import { CSVExtractor } from "./CSVExtractor";
import { Product } from "./Product";
import { extractValue } from "./extractValue";


export class ProductExtractor{ 
    
    private _products: Product[] = []
    constructor(  productTable: Object[]
    ){ 
        this._extractProducts(productTable)
    }
    private _extractProducts(_table: Object[]): void
    {
        _table.forEach((product: {
            PRODUTO: string,
            DESCRICAO: string,
            FORNECEDOR: string,
            ESTOQUE: string,
            PRECOVENDA: string, 
            PRECOCUSTO: string
        }) => {
            const code = product.PRODUTO
            if(code){ 
                const stock = extractValue(product.ESTOQUE)
                const totalValue = extractValue(product.PRECOVENDA)
                
                let productValue:number = 0
                if(stock && stock > 0){
                    productValue = totalValue / stock
                }
                this._appendProduct(new Product(code, product.DESCRICAO, product.FORNECEDOR, stock, productValue ))
            }

        });
    }

    get products(): Product[]{ 
        return this._products
    }

    private _appendProduct(product: Product): void{ 
        this._products.push(product)
    }
}