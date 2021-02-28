/****************
* CloseButton component displays a close button
****************/

import React, { useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import './CloseButton.css';

const CloseButton = () => {
  const { categoryId } = useParams();

  useEffect(() => {
    document.querySelector('.close-button').style.width = `${document.querySelector('.close-button').clientHeight}px`;

  })
  return(
    <div className="close-button">
      <Link to={`/category/${categoryId}`}>
        <div className="close-button-content"><img src="./images/close-icon.png" width="30px" height="30px" /></div>
      </Link>
    </div>
  )
};

CloseButton.displayName = 'CloseButton';

export default CloseButton;