import { LengthUnit } from "../../components/MeasureBox/TLengthUnit"
import { UnitOfMeasure } from "./../../components/Label/TUnitOfMeasure"

import { ILabel } from "../../components/Label/ILabel"
import { IMeasure } from "../../components/MeasureBox/IMeasure"
import { IPrice } from "../../IPrice"
import { Currency } from "../../TCurrency"
import { Price } from "../../Price"

export class PrintableLabel implements ILabel, IMeasure, IPrice{
    constructor(
        public code: string, 
        public description: string, 
        public unitOfMeasure: UnitOfMeasure,
        public value: number, 
        public width: number, 
        public height: number, 
        public lengthUnit: LengthUnit,
        public promotionalValue?: number,
        public currency?: Currency
    ){

    }


    public static isValid(PrintableLabel: PrintableLabel): boolean{
        try{
            if(!PrintableLabel)
                throw new Error("PrintableLabel indefinida")

            const isValidMeasure =  PrintableLabel.lengthUnit !== undefined && PrintableLabel.width  !== undefined && PrintableLabel.height !== undefined

            if (!isValidMeasure){
                throw new Error("As medidas de PrintableLabel são invalidas")
            }
            const isValidLabel = PrintableLabel.code !== undefined && PrintableLabel.description  !== undefined && PrintableLabel.unitOfMeasure !== undefined && PrintableLabel.value !== undefined
            if (!isValidLabel){
                throw new Error("Os dados passados para Label não estão corretos")
            }
            let isValidPromotion: boolean = true    
            if (PrintableLabel.promotionalValue)
                isValidPromotion = PrintableLabel.value > PrintableLabel.promotionalValue;

            if (!isValidPromotion)
                throw new Error("O valor do produto sem a promoção está mais barato que o valor promocional")

     

            return true
        }
        catch(e){
            return false
        }
        


    }
}
