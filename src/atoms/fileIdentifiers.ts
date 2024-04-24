import { FileIdentifier } from "../FileIdentifier";
import { RecoilState, atom, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
export const redeFileIdentifier = atom({
    key: "redeFileIdentifier",
    default: new FileIdentifier(uuidv4())
})


export const caixaFileIdentifier = atom({
    key: "caixaFileIdentifier", 
    default: new FileIdentifier(uuidv4())
})

export const stockFileIdentifier = atom({
    key: "stockFileIdentifier",
    default: new FileIdentifier(uuidv4())
})

export const useSetFileInFileIdentifier =() => {
    return (atom: RecoilState<FileIdentifier>, name: string, path: string) =>{
        const setter = useSetRecoilState(atom)
        setter((old)=> {
            return new FileIdentifier(old.id, name, path)
        })
    }
}


export const useIDCaixaFIValue = () => {
    const stateValue = useRecoilValue(caixaFileIdentifier)
    return stateValue.id
}
export const useIDRedeFIValue = () => {
    const stateValue = useRecoilValue(redeFileIdentifier)
    return stateValue.id
}
export const useIDEstoqueFIValue = () => {
    const stateValue = useRecoilValue(stockFileIdentifier)
    return stateValue.id
}