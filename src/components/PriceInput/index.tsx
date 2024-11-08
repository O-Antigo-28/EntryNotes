
import React, { InputHTMLAttributes, useState } from "react"
import "./priceinput.css"
import SystemInput from "../../components/SystemInput";
interface IPriceInput extends InputHTMLAttributes<HTMLInputElement> {
  setValue:React.Dispatch<React.SetStateAction<string>>,
  refInput?: React.MutableRefObject<any>
}
const PriceInput: React.FC<IPriceInput> = ({value, setValue, refInput}) => {
  const [firstChar, setFirstChar] = useState(true)
  const [commaIsDefined, setCommaIsDefined] = useState<boolean>();
  const [charsBeforeComma, setCharsBeforeComma] = useState<number>(); 

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
    if(commaIsDefined){

    }

    const lastChar = e.target.value.slice(-1)
    
    const lastCharacWasComma = lastChar == '.' || lastChar == ',';
  
  
    let inputValue = e.target.value.replace(/\D/g, ''); // Remove tudo que não for número

    // se vazio volte para a forma inicial
    if (inputValue.length === 0) {
      setFirstChar(true)
      setValue('0.00');
      return;
    }

  
    let inputInt = parseInt(inputValue)
    if(lastCharacWasComma){
      console.log("caracteres antes da virgula? ",inputInt.toString().length )
      setCommaIsDefined(true);

      setCharsBeforeComma(inputInt.toString().length);
    }
     

    
    
    // Transforma o valor numérico para o formato de moeda
    inputValue = (inputInt / 100).toFixed(2);
    setValue(inputValue);
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>){
    if(/\d/g.test(e.key) && value === "0.00"){
      e.preventDefault()  
      setValue("0.0" + e.key)
    }
    if(e.key.toUpperCase() === 'C')
      setValue("0.00")
  }
  



  return (
    <div>
      <SystemInput propValue={value.toString()} maxLength={8} refInput={refInput} onKeyDown={handleKeyDown} onChange={handleChange}>valor: </SystemInput>
    </div>
  );
};



export default PriceInput