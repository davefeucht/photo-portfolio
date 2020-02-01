/****************
* CloseButton component displays a close button
****************/

import React, { useEffect } from "react";
import { observer } from 'mobx-react';
import './CloseButton.css';

const CloseButton = observer(({ closeFunction }) => {
  useEffect(() => {
    document.querySelector('.close-button').style.width = `${document.querySelector('.close-button').clientHeight}px`;
  })
  return(
    <div className="close-button" onClick={closeFunction.bind(this)}>
      <div className="close-button-content"><img src="./images/close-icon.png" width="30px" height="30px" /></div>
    </div>
  )
});

CloseButton.displayName = 'CloseButton';

export default CloseButton;