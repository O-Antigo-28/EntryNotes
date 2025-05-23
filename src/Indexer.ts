export class Indexer<T>{ 
    private _index = 0
    constructor(private _array: T[]) { 
        
    }

    public previous(): T{
        if (this._isNotFirst()){ 
            this._index--   
        }
        return this.current()
    }
    public next(): T{ 
        if(this._isNotLast()){ 
            this._index++
        }
        return this.current()
    }
    private _isNotLast(): boolean{ 
        if(this._array.length == 0 ){ 
           return false
        }
        return ((this._array.length - 1) != this._index)
    }
    private _isNotFirst(): boolean{ 
        return this._index != 0
    }
    public current() : T{ 
        return this._array[this._index]
    }

    public get index(): number{
        return this._index
    }
    public get content(): T[]{ 
        return this._array
    }
    public setIndex(newIndex: number) {
        if(!this.isContained(this.index)){
            throw RangeError()
        }
        
        this._index = newIndex
    }
    public get length(): number{ 
        return this._array.length
    }

    public get partition(): string{ 
        return `${this._index + 1}/${this._array.length}`
    }

    public search(index: number): T{
        if(!this.isContained(index)){ 
            throw new RangeError("Erro no indexer")
        }
        return this._array[index]
        

    }
    
    public isContained(index: number){
        return (index >= 0 && (index <= this._array.length - 1))
    }
}
