/**
* TextArea component implements textarea input form elements
* 
* Component should be controlled by form, with value and change handler
* passed in as props.
*/

import * as React from 'react';

interface TextAreaProps {
    id: string,
    rows: number,
    cols: number,
    placeholder: string,
    form: string,
    required: boolean,
    disabled: boolean,
    value: string,
    onChange: (content: string) => void
}

const TextArea: React.FC<TextAreaProps> = ({
    id,
    rows,
    cols,
    placeholder,
    form,
    required,
    disabled,
    value,
    onChange
}) => {
    const handleChange = (event: React.ChangeEvent) => {
        const inputElement = event.target as HTMLInputElement;
        onChange(inputElement.value);
    };

    return (
        <textarea
            className="form-textArea"
            id={id}
            rows={rows}
            cols={cols}
            name={id}
            placeholder={placeholder}
            form={form}
            required={required}
            disabled={disabled}
            onChange={handleChange}
        >
            {value}
        </textarea>
    );
};

TextArea.displayName = 'TextArea';

export default TextArea;
