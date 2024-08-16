// ProfileSettings.styles.ts

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 2em;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const Input = styled.input`
  padding: 0.5em;
  font-size: 1em;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #45a049;
  }
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #e31b0c;
  }
`;
