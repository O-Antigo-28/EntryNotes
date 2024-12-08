import { BarcodeEAN13 } from "./TBarcodeEAN13";
export function createBarcodeEAN13(value: string): BarcodeEAN13  {
    if (value.length !== 13) {
        throw new Error("o código de barras deve ter exatamente 13 caracteres.");
    }
    return value as BarcodeEAN13;
  }