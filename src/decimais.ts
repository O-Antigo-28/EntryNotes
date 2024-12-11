export function getDecimal(value: number, fixed?: number):number{
    const defaultFixed = 2;

    if (fixed){
        if(fixed < 0){
            fixed = defaultFixed; 
        }
    }

    const precision = 10 ** Math.floor(fixed ?? defaultFixed)
    console.log(precision) 

    return (value - Math.floor(value)) * precision
    
}
export function hasDecimalPlaces(value: number): boolean{
    return value % 1 !== 0
}