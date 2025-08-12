import { IGroup } from "./IGroup";

export async function getSystemGroups(): Promise<IGroup[]>{
    try{ 
        const result = await fetch("http://127.0.0.1:3001/group")
        const groups = await result.json() as IGroup[]
        return groups
    }catch(e){
        throw new Error("Não foi possivel obter os grupos do sistema")
    }
}