type TypeDataFile = "REP.ESTOQUE" | "REP.CAIXA" | "REP.REDE"

export class FileType{ 
    constructor(
        private _typeData: TypeDataFile,
        private _accepts: string[],
    ){ 
     
    }
    
    get typeData(): string { 
        return this._typeData
    }

    get accepts(): string[]{ 
        return this._accepts
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