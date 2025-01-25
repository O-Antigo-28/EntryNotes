export function getDecimal(value: number, fixed?: number):number{
    const defaultFixed = 2
    fixed = fixed ?? defaultFixed;


    if(fixed < 0){
        fixed = defaultFixed; 
    }


    const precision = 10 ** Math.floor(fixed)
    let decimal = value - Math.floor(value)
    decimal = Math.round( decimal * precision)

    return Math.floor(decimal)
    
}
export function hasDecimalPlaces(value: number): boolean{
    return value % 1 !== 0
}