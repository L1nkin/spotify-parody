import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createMyPlaylist } from '../api/my-playlists/create-my-playlist';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-top: 2em;
    row-gap: 12px;
`

const Input = styled.input`
    padding: 8px;
    width: 100%;
    height: 60px;
    color: #fff;
    border-radius: 12px;
    border: 1px solid #c3c3c3;
    background-color: #a0a0a0;
    outline: none;
    font-size: 18px;

    &::placeholder {
        color: #c3c3c3;
        font-size: 18px;
    }
`

const Button = styled.button`
    color: #fff;
    background: none;
    background-color: #1ed760;
    width: 100%;
    height: 60px;
    border: none;
    outline: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all .2s ease-in-out;
    font-size: 18px;
    color: #fff;

    &:hover {
        background-color: #27c65f;
    }
`

const CreateMyPlaylist: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('')

    const handleTapButton = useCallback(() => {
        createMyPlaylist({
            name
        }).then(() => {
            navigate(-1)
        })
    }, [name, createMyPlaylist, navigate])

    return (
        <Wrapper>
            <Input value={name} placeholder="Enter playlist name: " onChange={(e) => setName(e.target.value)} />
            
            <Button onClick={handleTapButton}>
                Save
            </Button>
        </Wrapper>
    );
};

export default CreateMyPlaylist