import * as React from 'react';

import ContactForm from '../forms/ContactForm';

const ContactPage = () => {
    return (
        <div className="static-page" id="contactpage">
            <ContactForm />
        </div>
    );
};

ContactPage.displayName = 'ContactPage';

export default ContactPage;
