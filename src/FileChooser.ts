import { FileType } from "./FileType";

export class FileChooser{
    constructor(
        private _idFileIdentifier: string,
        private _fileType: FileType,
        ){
    }

    public get fileType(): FileType{
        return this._fileType
    }
}