/** **************
* CloseButton component displays a close button
*************** */

import './CloseButton.css';

import * as React from 'react';
import { Link, useParams } from 'react-router-dom';

const CloseButton = () => {
    const { categoryId } = useParams();

    return (
        <div className="close-button">
            <Link to={`/category/${categoryId}`}>
                <div className="close-button-content"><img src="./assets/images/close-button.svg" width="30px" height="30px" /></div>
            </Link>
        </div>
    );
};

CloseButton.displayName = 'CloseButton';

export default CloseButton;
