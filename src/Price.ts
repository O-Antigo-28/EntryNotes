import { IPrice } from "./IPrice";
import { Currency } from "./TCurrency";

export class Price implements IPrice{
    constructor(public value: number,
    public currency?: Currency | undefined,)
    {
        currency ?? 'R$'
    }

    
}