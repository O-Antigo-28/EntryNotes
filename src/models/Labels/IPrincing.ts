import { IPrice } from "../../IPrice";

export interface IPricing extends IPrice{
    timestamp: Date, 
    tag_id: string
}