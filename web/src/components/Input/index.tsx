import React, { InputHTMLAttributes } from 'react'; //this will import at once all HTML attributes to use in inputs

import './styles.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { //here we catch all this attributes and make this available to interface
    name: string;
    label: string;
}

const Input: React.FC<InputProps> = ({label, name, ...rest}) => { //here we are using a spread operator to take all attributes that are not showed and put into a object named rest
    return(
        <div className="input-block">
            <label htmlFor={name}>{label}</label>
            <input type="text" id={name} {...rest}/>
        </div>
    );
}
export default Input;