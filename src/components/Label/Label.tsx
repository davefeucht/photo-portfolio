/**
* Label component implements label for form elements
*/

import * as React from 'react';

interface LabelProps {
    htmlFor: string,
    text: string
}

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => {
    return (
        <label
            className="form-label"
            htmlFor={htmlFor}
        >
            {text}
        </label>
    );
};

Label.displayName = 'Label';

export default Label;
