export type PaymentMethod = PAYMENT_METHODS.DEBIT | PAYMENT_METHODS.INSTALLMENT | PAYMENT_METHODS.CREDIT | PAYMENT_METHODS.TICKET | PAYMENT_METHODS.NONEXISTENT | PAYMENT_METHODS.CASH_CREDIT | PAYMENT_METHODS.PIX
export type MachineName = MACHINE_NAMES.REDE | MACHINE_NAMES.CAIXA


export type Flag = NOTE_FLAGS.MASTERCARD | NOTE_FLAGS.VISA | NOTE_FLAGS.MAESTRO | NOTE_FLAGS.ELO | NOTE_FLAGS.HIPERCARD | NOTE_FLAGS.ALELO | NOTE_FLAGS.NONEXISTENT
export enum PAYMENT_METHODS {
    PIX = "PIX", 
    DEBIT = "DEBITO",
    CREDIT = "CREDITO" ,
    CASH_CREDIT = "CREDITO A VISTA",
    INSTALLMENT = "PARCELADO", 
    TICKET = "TICKET", 
    NONEXISTENT = "NONE",
}

export enum NOTE_FLAGS{ 
    MASTERCARD = "MASTERCARD", 
    VISA ='VISA',
    MAESTRO ='MAESTRO', 
    ELO = 'ELO',
    HIPERCARD ='HIPERCARD', 
    ALELO = 'ALELO',
    NONEXISTENT = "NONE"
}

export enum MACHINE_NAMES{
    REDE = 'REDE',
    CAIXA = 'CAIXA'
}
export interface INote{
    machineName:MachineName | string,
    paymentMethod: PaymentMethod | string,
    value: number,
    date: Date,
    flag: Flag | string 
}
export class Note implements INote{ 
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
