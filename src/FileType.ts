export class FileType{ 
    constructor(
        private _name: string,
        private _accepts: string[]
    ){ 

    }
    get name(): string { 
        return this._name
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