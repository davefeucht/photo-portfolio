import * as React from 'react';

import ContactForm from '../forms/ContactForm';

interface ContactPageProps {
    adminEmail: string;
}

// TODO: Get explanatory text from Contact page stored in backend
const ContactPage: React.FC<ContactPageProps> = ({ adminEmail }) => {
    return (
        <div className="static-page" id="contactpage">
            <ContactForm adminEmail={adminEmail} explanatoryText="Please contact me if you would like to hire me for a shoot." />
        </div>
    );
};

ContactPage.displayName = 'ContactPage';

export default ContactPage;
