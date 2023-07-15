/**
* Button component implements button form elements
* 
* Component should be controlled by form, with click handler
* passed in as prop.
*/

import * as React from 'react';

import { ButtonType } from '../../utils/types';

interface ButtonProps {
    disabled?: boolean,
    form: string,
    id: string,
    text: string,
    type?: ButtonType,
    variant?: 'primary' | 'secondary',
    onClick: (event: React.MouseEvent) => void
}

const Button: React.FC<ButtonProps> = ({
    id,
    form,
    disabled = false,
    text,
    type = 'button',
    variant = 'primary',
    onClick
}) => {
    return (
        <button
            className={`form-button ${variant}`}
            id={id}
            name={id}
            type={type}
            form={form}
            disabled={disabled}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

Button.displayName = 'Button';

export default Button;
