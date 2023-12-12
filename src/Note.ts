type PaymentMethod = "DEBITO" | "CREDITO" | "PARCELADO" | 'TICKET'
type MachineName = 'REDE' | 'CAIXA'
type Flag = 'MASTERCARD' | 'VISA' | 'MAESTRO' | 'ELO' | 'HIPERCARD' | 'ALELO'

export class Note{ 
    constructor(
        private _machineName:MachineName,
        private _paymentMethod: PaymentMethod,
        private _value: number,
        private _date: Date,
        private _flag: Flag
        ){ 
    }
    get value(): number{
        return this._value
    }

    get machineName(): MachineName | string{ 
        return this._machineName
    }
    get paymentMethod() :PaymentMethod | string{ 
        return this._paymentMethod
    }

    get date(): Date{ 
        return this._date
    }
    get flag(): Flag | string{ 
        return this._flag
    }
}
