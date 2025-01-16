export function splitAndCheckLength(str: string, delimiter: string, lengthRequired: number){
    str = str.trim()

    const clockSplited = str.split(delimiter)
    if (clockSplited.length != lengthRequired){
        throw new Error("O tamanho do array deu diferente do esperado")
    }
    return clockSplited;
}