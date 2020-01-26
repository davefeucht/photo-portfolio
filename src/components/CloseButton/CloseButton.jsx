/****************
* CloseButton component displays a close button
****************/

import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import './CloseButton.css';

const CloseButton = observer(({ closeFunction }) => {
  useEffect(() => {
    console.log(document.querySelector('.close-button').clientHeight);
    document.querySelector('.close-button').style.width = `${document.querySelector('.close-button').clientHeight}px`;
  })
  return(
    <div className="close-button" onClick={closeFunction.bind(this)}>X</div>
  )
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;