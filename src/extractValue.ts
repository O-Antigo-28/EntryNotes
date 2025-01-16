export function extractValue(rawValue:string): number{

    if(typeof rawValue !== "string"){ 
      console.error(rawValue)
      throw new Error("valor passado não é uma string")
    }
    if(rawValue.indexOf("R$") !== -1){ 
      rawValue = rawValue.replace("R$", "")
    }
    rawValue = rawValue.trim();
    rawValue = rawValue.replace(",", ".")
    const value = parseFloat(rawValue)
    return value
  }