export class FileIdentifier{ 
    constructor(
        private _id: string, 
        private _name?: string,
        private _path?: string, 
         
    ) { 
        this._name = this._name ?? ""
        this._path = this._path ?? ""
    }
    get id(): string{
        return this._id
    }
    get fileName(): string{ 
        return this._name
    }

    set fileName(newFileName: string){ 
        this._name = newFileName
    }

    get path(): string{ 
        return this._path
    }

    set path(newPath){ 
        this._path = newPath
    }

    public fileIdentified (): boolean{
        return (this._name.length > 0 && this._path.length > 0)
    }
    public setFile(name: string, path: string): void{
        this.fileName = name
        this.path = path
    }
} 