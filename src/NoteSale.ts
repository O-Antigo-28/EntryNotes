import { SaleItem } from "./SaleItem";
import { INote } from "./Note";
import { ISale } from "./Sale";

export class NoteSale implements ISale, INote{
    authorization: string;
    machineName: string;
    paymentMethod: string;
    value: number;
    flag: string;
    itens: SaleItem[];
    difference: number;
    total: number;
    date: Date;
}