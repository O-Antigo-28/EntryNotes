import { MachineName,Flag, MACHINE_NAMES, NOTE_FLAGS, PaymentMethod, PAYMENT_METHODS,Note } from "../../Note"
import { normalizeString } from "../../normalizeString"
import { NoteExtractor } from "./NoteExtractor"
import { combineDateAndTime } from "./combineDateAndTime";
import { splitAndCheckLength } from "./splitAndCheckLength";
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

interface ISpreadsheetRedeNew{
  "hora da venda":string,
  "status da venda":string,
  "valor da venda":string,
  "modalidade":string,
  "tipo":string,
  "número de parcelas":string,
  "bandeira":string,
}

export class RedeNoteExtractor extends NoteExtractor{

  constructor(private path: string){
    super()
    console.log("path rede", path)
    if(!path){
      throw new Error("Path no redeNoteExtractor não foi passado")
    }
  }
  public extractNotes(_table: Object[]): void {
    _table.forEach((object: ISpreadsheetRedeNew) => { 
      const paymentMethod: PaymentMethod = this._extractPaymentMethod(object.modalidade, object["número de parcelas"])
      const flag: Flag = this._extractFlag(object.bandeira)
      const date: Date = this._extractDate("Rede_Rel_Vendas_Do_Dia_31_10_2024-31_10_2024-d2d87d53-6a94-4f03-a36d-7192fdf4c2f0.csv")
      const time: Date = this._extractClock(object["hora da venda"])
      const combinedDateAndTime = combineDateAndTime(date, time)
      date.setHours(time.getHours(), time.getMinutes(), time.getSeconds())
      const value = this._extractValue(object["valor da venda"])
      const note = new Note(MACHINE_NAMES.REDE, paymentMethod, value, combinedDateAndTime, flag)
      if(this._isValidNote(object["status da venda"], note)){ 
        this._appendNote(note)
      }   
    })
  }
    protected _extractDate(path: string): Date {

      const regex = /Dia_(.*?)-/g
      let math;

      if ( (math = regex.exec(path)) !== null){
        const [day, month, year] = splitAndCheckLength(math[1], "_", 3)
        return new Date(parseInt(year), parseInt(month) -1, parseInt(day)) 
      }
      else{
        throw new Error("Não foi possivel extrair a data a partir do nome do arquivo: " + path)
      }

    }

  

   

}