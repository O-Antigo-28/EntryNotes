import { SaleItem } from "./SaleItem"
export class Sale{ 
    constructor(
      private _total: number,
      private _difference: number,
      private _saleItens: SaleItem[]){ 
    }
    public get total(): number{ 
      return this._total
    }
    public get difference(): number{ 
      return this._difference
    }
    public get itens(): SaleItem[]{
      return this._saleItens
    }
    
  }