export class Product{
    constructor(
        private _id: number, 
        private _code: string, 
        private _description: string, 
        private _provider: string, 
        private _quantity: number, 
        private _value: number
    ){
        
    }

    get id(): number {
        return this._id
    }
    get code(): string{
        return this._code
    }
    get description(): string{
        return this._description
    }
    get value(): number{
        return this._value
    }
    get quantity(): number{
        return this._quantity
    }
    get provider(): string{ 
        return this._provider
    }
    set quantity(qtde){
        this._quantity = qtde
    }
}