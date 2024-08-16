// SearchPage.tsx
import styled from 'styled-components';
import axios from 'axios';
import React, { useState } from 'react';
import SongItem from "../components/Song/SongItem.tsx";


const StyledDiv = styled.div`
    padding: 20px;
`;

const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    border: 1px solid #eee;
    border-radius: 15px;
`;

const StyledInput = styled.input`
    padding: 10px;
    border: none;
    flex-grow: 1;
    background-color: #333;
    color: white;
    border-bottom-left-radius: 15px;
    border-top-left-radius: 15px;

    &:focus {
        outline: none;
    }
`;

const StyledButton = styled.button`
    border: none;
    background-color: #333;
    color: white;
    padding: 10px 15px;
    cursor: pointer;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    font-size: larger;

    &:hover {
        color: #90ee90;
    }
`;

interface Song {
    title: string;
    artist: string;
    album: string;
    // other details like cover image, duration etc
}

const SearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [songs, setSongs] = useState<Song[]>([]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://api.service.com/songs?q=${encodeURIComponent(searchTerm)}`);
            setSongs(response.data);
        } catch (error) {
            console.error(`Error searching for "${searchTerm}"`);
        }
    };

    return (
        <StyledDiv>
            <StyledForm onSubmit={handleSearchSubmit}>
                <StyledInput type="text" id="searchInput" value={searchTerm} onChange={handleSearchChange} />
                <StyledButton type="submit">Search</StyledButton>
            </StyledForm>
            {/* Render the songs */}
            {songs.map((song, index) => (
                <SongItem key={index} song={song} />
            ))}
        </StyledDiv>
    );
};

export default SearchPage;