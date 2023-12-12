import { useParams } from "react-router-dom"
import LinkButton from "../../components/LinkButton"
import Title from "../../components/Title"
import { MyRoutes } from "../../MyRoutes"
import {readFile} from "fs"
import { Profiler } from "react"
import Button from "../../components/Button"


async function readAllFiles(paths:string[]) { 
    const allPromises = paths.map(async (path) => { 
      return new Promise((resolve, reject) => { 
        readFile(path, {encoding: "utf8"}, (err, data) => {
          if(err){ 
            reject(err)
          }
          else{
            resolve(data)
          }
          
        })
      })
    })
    try{ 
      const results = await Promise.all(allPromises)
      console.log(results)
    }
    catch(err){
      console.error("erro, major")
    }
  }


const AutomaticPage = () => {

    const {stockPath, redePath, caixaPath}  = useParams()    
    
    const myPaths = [decodeURIComponent(stockPath), decodeURIComponent(redePath), decodeURIComponent(caixaPath)]
    console.log(myPaths)
    readAllFiles(myPaths)
    
    return (
    <>
        <p>{location.pathname}</p>
        <LinkButton to={MyRoutes.HOME}>Voltar para o inicio</LinkButton>
        
    
    </>
    )
}   

export default AutomaticPage