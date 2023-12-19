import { Product } from "./Product"
export class Sale{
    constructor(
        private _product: Product,
        private _quantitySold: number
    ){
        
    }

    set quantitySold(quantity: number){
        if(quantity > 0){
            this._quantitySold = quantity
        }
    }
    get product(): Product{
        return this._product
    }
    get quantitySold(): number {
        return this._quantitySold
    }
    get result(){
        return (this._product.value * this._quantitySold)
    }
}