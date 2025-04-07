import { FileIdentifier } from "../FileIdentifier";
import { RecoilState, atom, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";
export const redeFileIdentifier = atom({
    key: "redeFileIdentifier",
    default: new FileIdentifier(uuidv4())
})

export const pixFileIdentifier = atom({
    key: "pixFileIdentifier", 
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



export const useSetFileInFileIdentifier =(atom: RecoilState<FileIdentifier>) => {
    const setter = useSetRecoilState(atom)
    return (name: string, path: string) =>{
        setter((old)=> {
            return new FileIdentifier(old.id, name, path)
        })
    }
}
export const useGetFileIdentifierByID= ()=> {
    const fileIDs: FileIdentifier[] = [useStockFileIdentifier(),useCaixaFileIdentifier(), useRedeFileIdentifier() ]
    return (id:string): FileIdentifier => {
        
        return fileIDs.find((fileID) => fileID.id === id)
    }
}
export const useIDPixFIValue = () => {
    const stateValue = useRecoilValue(pixFileIdentifier)
    return stateValue.id
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

export const useStockFileIdentifier = () => {
    const fileIdentifier =  useRecoilValue(stockFileIdentifier)
    return fileIdentifier
}

export const useRedeFileIdentifier = () => {
    const fileIdentifier = useRecoilValue(redeFileIdentifier)
    return fileIdentifier
}

export const useCaixaFileIdentifier = () => {
    const fileIdentifier = useRecoilValue(caixaFileIdentifier)
    return fileIdentifier
}
export const usePixFileIdentifier = () => {
    const fileIdentifier = useRecoilValue(pixFileIdentifier)
    return fileIdentifier
}

export const useFileIdentifierByID = (FileIdentifierID: string) => { 
    switch (FileIdentifierID){
        case useIDCaixaFIValue(): { 
            const stateValue = useRecoilValue(caixaFileIdentifier)
            return stateValue
        }

        case useIDRedeFIValue(): {
            const stateValue = useRecoilValue(redeFileIdentifier)
            return stateValue
        }
        case useIDEstoqueFIValue(): {
            const stateValue = useRecoilValue(stockFileIdentifier)
            return stateValue
        }
    }
    
}

export const useUpdateFileIdentifierByID = () => {

    const listFIDsSetters = [
        {FID: useIDPixFIValue(), setter: useSetFileInFileIdentifier(pixFileIdentifier)},
        {FID: useIDCaixaFIValue(), setter: useSetFileInFileIdentifier(caixaFileIdentifier)}, 
        {FID: useIDRedeFIValue(), setter: useSetFileInFileIdentifier(redeFileIdentifier)}, 
        {FID: useIDEstoqueFIValue(), setter: useSetFileInFileIdentifier(stockFileIdentifier)}
    ]

    return (fileIndentifierID: string, name: string, path: string) => {
        listFIDsSetters.forEach((FIDSetter)=> {
            if (FIDSetter.FID === fileIndentifierID)
                FIDSetter.setter(name, path)
        })
    }
}