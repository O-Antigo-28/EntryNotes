export function extractValue(rawValue:string): number{
    if(typeof rawValue !== "string"){ 
      return 0
    }
    if(rawValue.indexOf("R$") !== -1){ 
      rawValue = rawValue.replace("R$", "")
    }
    rawValue = rawValue.replace(",", ".")
    const value = parseFloat(rawValue)
    return value
  }