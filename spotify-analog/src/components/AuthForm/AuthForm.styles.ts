import styled from 'styled-components';

export const AuthContainer = styled.div`
  background-color: #121212;
  padding: 30px 50px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 600px;
  text-align: center;
  margin: 50px auto;
`;

export const Title = styled.h2`
  font-size: 2.4em;
  margin-bottom: 30px;
  color: #fff;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1.2em;
  color: #fff;
`;

export const Input = styled.input`
  width: calc(100% - 22px);
  padding: 15px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #2c2c2c;
  color: #fff;
  box-sizing: border-box;
  font-size: 1.2em;
  &::placeholder {
    color: #aaa;
    font-size: 1em;
  }
`;

export const Button = styled.button`
  padding: 18px;
  background-color: #1db954;
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 0.3s;
  margin-top: 20px;
  &:hover {
    background-color: #1ed760;
  }
`;

export const ToggleButton = styled.button`
  background-color: transparent;
  color: #1db954;
  font-size: 1.1em;
  margin-top: 15px;
  border: none;
  cursor: pointer;
  &:hover {
    color: #1ed760;
  }
`;