import * as React from 'react';
import { useState } from 'react';

import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import TextArea from '../components/TextArea/TextArea';

const ContactForm = () => {
    const [emailValue, setEmailValue] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [messageContent, setMessageContent] = useState<string>('');

    const handleSubmit = (event: React.MouseEvent) => {
        event.preventDefault();
    };

    return (
        <form
            className="contact-form"
            id="contactform"
            name="contactform"
            autoComplete="off"
        >
            <Input
                id="firstname"
                form="contactform"
                type="text"
                placeholder="first name"
                size={20}
                value={firstName}
                onChange={setFirstName}
            />
            <Input
                id="lastname"
                form="contactform"
                type="text"
                placeholder="last name"
                size={20}
                value={lastName}
                onChange={setLastName}
            />
            <Input
                id="email"
                form="contactform"
                type="email"
                placeholder="email"
                size={20}
                value={emailValue}
                onChange={setEmailValue}
            />
            <TextArea
                id="contactmessage"
                form="contactform"
                placeholder="message"
                rows={30}
                cols={75}
                value={messageContent}
                onChange={setMessageContent}
            />
            <div className="button-row">
                <Button
                    id="contactsubmit"
                    form="contactform"
                    type="submit"
                    text="Submit"
                    onClick={handleSubmit}
                />
            </div>
        </form>
    );
};

ContactForm.displayName = 'ContactForm';

export default ContactForm;
