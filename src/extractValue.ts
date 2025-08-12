export function extractValue(rawValue:string): number{

    if(typeof rawValue !== "string"){ 
      console.error(rawValue)
      throw new Error("valor passado não é uma string")
    }
    rawValue = rawValue.replace("R$", "").trim()
    .replace(".", "")
    .replace(",", ".")
    const value = parseFloat(rawValue)
    return value
  }