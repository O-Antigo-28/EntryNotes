type TypeDataFile = "REP.ESTOQUE" | "REP.CAIXA" | "REP.REDE"
type Priority = "OPTIONAL" | "NESCESSARY" 
export class FileType{ 
    constructor(
        private _typeData: TypeDataFile,
        private _accepts: string[],
        private _optional?: Priority
    ){ 
     this._optional ?? "NESCESSARY"
    }
    
    get typeData(): TypeDataFile { 
        return this._typeData
    }

    get accepts(): string[]{ 
        return this._accepts
    }

    get isOptional(): boolean{
        console.log(this._optional)
        return this._optional == "OPTIONAL"
    }


    public acceptsToString(): string{
        let acceptsString = ""
        this._accepts.forEach((accept, index) => { 
            if(index != this._accepts.length -1){
                acceptsString += accept + ", "
            }
            else{ 
                acceptsString += accept
            }
        }) 
        return acceptsString
    } 
}