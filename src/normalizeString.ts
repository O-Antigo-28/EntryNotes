export function normalizeString(texto: string):string {
    if(typeof texto !== "string"){
      return ""
    }
    texto =texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    texto = texto.toUpperCase()
    return texto;
  }