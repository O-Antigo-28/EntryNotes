import * as iconv from 'iconv-lite';
import * as Papa from "papaparse"
import {readFile} from "fs/promises"
import * as XLSX from 'xlsx'
const DEFAULT_FILE_ENCODING = "utf8"

function isCSVFile(path: string){ 
  const excelTypeFile = /\.csv$/
  return excelTypeFile.test(path.toLocaleLowerCase());
}

export async function CSVExtractor(path: string, encoding: string= DEFAULT_FILE_ENCODING) :Promise<Object[]> {

    try{ 

      const notCSVFile = !isCSVFile(path)

      if (notCSVFile){
        throw new Error(`${path} não é um arquivo CSV`)
      }
      
      const data: Buffer  = await readFile(path)
      const utf8text = iconv.decode(data, encoding)
      const table = Papa.parse(utf8text, {header: true}).data
      table.pop()
      return table
    }

    catch(err){
      console.error("erro na leitura do arquivo", err)
      return []
    } 
    
  }