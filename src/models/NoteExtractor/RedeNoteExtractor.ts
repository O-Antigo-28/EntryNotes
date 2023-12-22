import { MachineName,Flag, MACHINE_NAMES, NOTE_FLAGS, PaymentMethod, PAYMENT_METHODS,Note } from "../../Note"
import { normalizeString } from "../../normalizeString"
import { NoteExtractor } from "./NoteExtractor"
function obterDataAtualFormatada() {
  const data = new Date();

  const dia = adicionaZero(data.getDate());
  const mes = adicionaZero(data.getMonth() + 1); // Os meses começam do zero, então é necessário adicionar 1
  const ano = data.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

function adicionaZero(numero: number) {
  return numero < 10 ? `0${numero}` : numero;
}


export class RedeNoteExtractor extends NoteExtractor{ 
  
    // protected _extractNotes(table: Object[]): void {    
    //   const APPROVED_SALE = "APROVADA"
    //   table.forEach((object: {
    //     "data da venda": string,
    //      "hora da venda": string,
    //      "status da venda": string,
    //      "valor da venda original": string,
    //      "número de parcelas": string
    //      "bandeira": string,
    //      "modalidade": string                
    //     }) =>  {
    //     if(object["data da venda"].length > 3){ 
    //         const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.modalidade, object["número de parcelas"])
    //         const flag: Flag = this._extractFlag(object.bandeira)
    //         const date: Date = this._extractDate(object["data da venda"], object["hora da venda"])
    //         const value = this._extractValue(object["valor da venda original"])
            
    //         if(normalizeString(object["status da venda"]) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
    //           this._appendNote(new Note(MACHINE_NAMES.REDE, paymentMethod, value, date, flag ))
    //         }   
    //     }

    //   }) 
  
   
  
  
    // } 

    protected _extractNotes(_table: Object[]): void {
      const APPROVED_SALE = "APROVADA"
      _table.forEach((object: {
        "hora da venda":string,
        "status da venda":string,
        "valor da venda":string,
        "modalidade":string,
        "tipo":string,
        "número de parcelas":string,
        "bandeira":string,
      }) => { 
        const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.modalidade, object["número de parcelas"])
        const flag: Flag = this._extractFlag(object.bandeira)
        const date: Date = this._extractDate(obterDataAtualFormatada(), object["hora da venda"])
        const value = this._extractValue(object["valor da venda"])
        
        if(normalizeString(object["status da venda"]) == APPROVED_SALE && flag != NOTE_FLAGS.NONEXISTENT && paymentMethod != PAYMENT_METHODS.NONEXISTENT){ 
          this._appendNote(new Note(MACHINE_NAMES.REDE, paymentMethod, value, date, flag ))
        }   
      })

    }

    protected _extractFlag(flagRaw:string): Flag{

      flagRaw = normalizeString(flagRaw)
  
      switch (flagRaw) {
        case NOTE_FLAGS.ALELO:
        case "VR":
          return NOTE_FLAGS.ALELO
  
        case NOTE_FLAGS.ELO:
          return NOTE_FLAGS.ELO
  
        case NOTE_FLAGS.HIPERCARD:
          return NOTE_FLAGS.HIPERCARD
  
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