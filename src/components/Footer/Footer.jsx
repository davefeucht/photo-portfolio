/*****************
* Footer component implements the footer of the application
*****************/

import React from "react";
import { observer } from 'mobx-react';
import './Footer.css';

const Footer = observer((props) => {
    return (
      <div className="footer">
        Theme Copyright @2018 Dave Feucht  
      </div>
    );
});

Footer.displayName = 'Footer';

export default Footer;