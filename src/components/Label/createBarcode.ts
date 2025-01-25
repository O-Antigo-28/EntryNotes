import { BarcodeEAN13 } from "./TBarcodeEAN13";
export function createBarcodeEAN13(value: string): BarcodeEAN13  {
    while (value.length < 13) {
        value = "0" + value
    }
    return value as BarcodeEAN13;
  }