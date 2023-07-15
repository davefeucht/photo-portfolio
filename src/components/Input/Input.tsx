/**
* Input component implements text input form elements
* 
* Component should be controlled by form, with value and change handler
* passed in as props.
*/

import * as React from 'react';

import { InputType } from '../../utils/types';

interface InputProps {
    id: string,
    pattern?: string,
    placeholder?: string,
    form: string,
    required?: boolean,
    disabled?: boolean,
    size: number,
    type: InputType,
    value: string,
    onChange: (content: string) => void
}

const Input: React.FC<InputProps> = ({
    id,
    pattern,
    placeholder,
    form,
    required = true,
    disabled = false,
    size,
    type,
    value,
    onChange
}) => {
    const handleChange = (event: React.ChangeEvent) => {
        const inputElement = event.target as HTMLInputElement;
        onChange(inputElement.value);
    };

    return (
        <input
            className="form-input"
            id={id}
            name={id}
            type={type}
            pattern={pattern}
            placeholder={placeholder}
            form={form}
            required={required}
            disabled={disabled}
            size={size}
            value={value}
            onChange={handleChange}
        />
    );
};

Input.displayName = 'Input';

export default Input;
