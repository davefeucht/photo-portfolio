/**
* Paragraph component implements rendering a paragraph of text in a page
*/

import * as React from 'react';

interface ParagraphProps {
    id?: string,
    text: string
}

const Paragraph: React.FC<ParagraphProps> = ({ id, text }) => {
    return (
        <p id={id}>{text}</p>
    );
};

Paragraph.displayName = 'Paragraph';

export default Paragraph;
