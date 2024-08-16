import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import {
    AuthContainer,
    Title,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    ToggleButton
} from './AuthForm.styles';
import { login, register } from '../../api/auth-requests';
import { AuthContext } from '../../App';

const AuthForm: React.FC = () => {
    const {setAuth} = useContext(AuthContext)
    const [isRegistering, setIsRegistering] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
      });

      const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const toggleForm = () => {
        setIsRegistering((prev) => !prev);
    };

    const handlePressButton = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isRegistering) {
            register({nickname: formData.name, password: formData.password, username: formData.username}).then(res => {
                localStorage.setItem('token', JSON.stringify(res.token))
                setAuth(true)
                setFormData({
                    name: '',
                    username: '',
                    password: ''
                  })
            }).catch(err => {
                console.error(err)
            })
          return  
        }
        login({ password: formData.password, username: formData.username}).then(res => {
            localStorage.setItem('token', JSON.stringify(res.token))
        }).then(() => {
            setAuth(true)
            setFormData({
                name: '',
                username: '',
                password: ''
              })
        }).catch(err => {
            console.error(err)
        })
    }

    return (
        <AuthContainer>
            <Title>{isRegistering ? 'Register' : 'Login'}</Title>
            <Form onSubmit={handlePressButton}>
                {isRegistering && (
                    <FormGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input onChange={handleChange} value={formData.name} type="text" id="name" name="name" placeholder="Enter your name" required />
                    </FormGroup>
                )}
                <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input onChange={handleChange} value={formData.username} type="text" id="username" name="username" placeholder="Enter your username" required />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input onChange={handleChange} value={formData.password} type="password" id="password" name="password" placeholder="Enter your password" required />
                </FormGroup>
                <Button type="submit">{isRegistering ? 'Register' : 'Login'}</Button>
            </Form>
            <ToggleButton onClick={toggleForm}>
                {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </ToggleButton>
        </AuthContainer>
    );
};

export default AuthForm;