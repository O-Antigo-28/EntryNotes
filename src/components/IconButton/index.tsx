import Button from "../../components/Button";
import React, {ReactComponentElement, useState} from "react";
import './iconbutton.css'
import { IconType } from "react-icons";


interface IIconButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    Icon: IconType, 
    size: number 
    HoverIcon?: IconType,
}

const IconButton: React.FC<IIconButton> = ({Icon, HoverIcon, size}) => {
    const [hover, setHover] = useState(false); 

    function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
        setHover(true)
    }
    function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
        setHover(false)
    }

    let CurrentIcon:IconType = Icon 

    if (HoverIcon) { 
        CurrentIcon = hover ? HoverIcon : Icon
    }

    return (
        <Button style={{backgroundColor: "transparent", width: 'fit-content', outline: 'none', boxShadow: 'none', padding: 0, border:'none' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
            <CurrentIcon color="#ff0000" size={size}/>
        </Button>
    )
}

export default IconButton;