import { NoteExtractor } from "./NoteExtractor";
import { PaymentMethod, Flag, PAYMENT_METHODS, NOTE_FLAGS, MACHINE_NAMES, Note } from "../../Note";
import { normalizeString } from "../../normalizeString";

export class CaixaNoteExtractor extends NoteExtractor{

    // protected _extractNotes(_table: Object[]): void {
    //     const APPROVED_SALE = "APROVADA"
    //     _table.forEach((object: { 
    //         "Data da venda": string,
    //         "Hora da venda": string,
    //         "Produto":string,
    //         "Parcelas":string,
    //         "Bandeira":string,
    //         "Status":string,
    //         "Valor bruto":string, 
    //     })=> { 
    //         if(object["Data da venda"].length > 3){ 

    //             const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.Produto, object.Parcelas)
    //             const flag: Flag = this._extractFlag(object.Bandeira)
    //             const date: Date = this._extractDate(object["Data da venda"])
    //             const value = this._extractValue(object["Valor bruto"])
                
    //             if(normalizeString(object.Status) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
    //               this._appendNote(new Note(MACHINE_NAMES.CAIXA, paymentMethod, value, date, flag ))
    //             }   
    //         }

    //     }) 
    // } 

    protected _extractNotes(_table: Object[]): void {
      const APPROVED_SALE = "AUTORIZADA"

  
      _table.forEach((object: {
        "Data da venda": string,
        "Produto": string ;
        "Parcelado":string;
        "Bandeira":string;
        "Valor bruto":string;
        "Status":string;
        }) => {
          const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.Produto, object.Parcelado)
          const flag: Flag = this._extractFlag(object.Bandeira)
          const date: Date = this._extractDate(object["Data da venda"])
          const value = this._extractValue(object["Valor bruto"])
          
          if(normalizeString(object.Status) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
            this._appendNote(new Note(MACHINE_NAMES.CAIXA, paymentMethod, value, date, flag ))
          } 
          
          console.log(object)
      })
      
    }
    protected _extractFlag(flagRaw:string): Flag{

        flagRaw = normalizeString(flagRaw)
    
        switch (flagRaw) {
          case NOTE_FLAGS.ALELO:
            return NOTE_FLAGS.ALELO
    
          case "ELO FULL":
          case NOTE_FLAGS.ELO:
            return NOTE_FLAGS.ELO
    
          case NOTE_FLAGS.HIPERCARD:
            return NOTE_FLAGS.HIPERCARD
    
          case "MDS":
          case NOTE_FLAGS.MAESTRO:
            return NOTE_FLAGS.MAESTRO
    
          case NOTE_FLAGS.VISA:
            return NOTE_FLAGS.VISA
    
          case NOTE_FLAGS.MASTERCARD:
            return NOTE_FLAGS.MASTERCARD
    
    
    
          default:
            return NOTE_FLAGS.NONEXISTENT
        }
      }
    
}