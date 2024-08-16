// SongItem.tsx
import React from 'react';

interface SongItemProps {
    song: {
        title: string,
        artist: string,
        album: string,
        // Include other song properties here
    };
}

const SongItem: React.FC<SongItemProps> = ({ song }) => {
    return (
        <div>
            <h2>{song.title}</h2>
            <h3>{song.artist}</h3>
            <p>{song.album}</p>
        </div>
    );
};

export default SongItem;