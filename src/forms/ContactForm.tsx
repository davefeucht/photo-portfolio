import * as React from 'react';
import { useState } from 'react';

import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Label from '../components/Label/Label';
import Paragraph from '../components/Paragraph/Paragraph';
import TextArea from '../components/TextArea/TextArea';

const ContactForm = () => {
    const [emailValue, setEmailValue] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [messageContent, setMessageContent] = useState<string>('');
    /* TODO: Figure out how to get the contact page text from the backend and pass it here to the Paragraph component */

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
            <Paragraph id="contactinfo" text="Foo" />
            <Label htmlFor="firstname" text="First Name" />
            <Input
                id="firstname"
                form="contactform"
                type="text"
                placeholder="first name"
                size={20}
                value={firstName}
                onChange={setFirstName}
            />
            <Label htmlFor="lastname" text="Last Name" />
            <Input
                id="lastname"
                form="contactform"
                type="text"
                placeholder="last name"
                size={20}
                value={lastName}
                onChange={setLastName}
            />
            <Label htmlFor="email" text="Email Address" />
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
