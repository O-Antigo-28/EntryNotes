export class IDGenerator{
    private static _countID = 0
    public static reset(){
        IDGenerator._countID = 0
    }
    static get newID(){ 
        return IDGenerator._countID++
    }
}