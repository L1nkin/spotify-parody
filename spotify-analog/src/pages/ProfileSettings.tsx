// ProfileSettings.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Input, SubmitButton, DeleteButton } from './ProfileSettings.styles';

const ProfileSettings: React.FC = () => {
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const handleChangeNickname = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Substitute these with real API calls
        console.log(`Changing nickname to ${nickname}`);
        setNickname(''); // Clearing the input field
        // Navigate user back to the profile page
        navigate('/profile');
    }

    const handleChangePassword = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Substitute these with real API calls
        console.log(`Changing password to ${password}`);
        setPassword(''); // Clearing the input field
        // Navigate user back to the profile page
        navigate('/profile');
    }

    const handleChangeEmail = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Substitute these with real API calls
        console.log(`Changing email to ${email}`);
        setEmail(''); // Clearing the input field
        // Navigate user back to the profile page
        navigate('/profile');
    }

    const handleDeleteAccount = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        // Substitute this with real API calls
        console.log('Deleting account');
        // Navigate user back to the profile page
        navigate('/profile');
    }
    

    return (
        <Container>
            <Form onSubmit={handleChangeNickname}>
                <Input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="New nickname"
                />
                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
            <Form onSubmit={handleChangePassword}>
                <Input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="New password"
                />
                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
            <Form onSubmit={handleChangeEmail}>
                <Input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="New email"
                />
                <SubmitButton type="submit">Submit</SubmitButton>
            </Form>
            <DeleteButton onClick={handleDeleteAccount}>Delete Account</DeleteButton>
        </Container>
    );
}

export default ProfileSettings;