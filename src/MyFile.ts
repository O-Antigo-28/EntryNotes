export class MyFile{ 
    constructor(
         private _fileName?: string,
         private _path?: string
    ) { 

    }

    get fileName(): string{ 
        return this._fileName
    }

    set fileName(newFileName: string){ 
        this._fileName = newFileName
    }

    get path(): string{ 
        return this._path
    }

    set path(newPath){ 
        this._path = newPath
    }


}