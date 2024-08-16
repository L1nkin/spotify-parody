// components/Player/Player.tsx
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const PlayerContainer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 90px;
    background-color: #282828;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
`;

const ProgressBarContainer = styled.div`
    width: 100%;
    height: 5px;
    background: #b3b3b3;
    border-radius: 2.5px;
    overflow: hidden;
    position: relative;
    margin: 5px 0;

    input[type='range'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
    }

    .progress {
        width: 0;
        height: 100%;
        background: #1db954;
        position: absolute;
        top: 0;
        left: 0;
    }
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const TrackInfo = styled.div`
    display: flex;
    align-items: center;
    flex: 1;

    img {
        width: 60px;
        height: 60px;
        margin-right: 20px;
    }

    .track-details {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .track-name {
            font-size: 14px;
            font-weight: bold;
        }

        .track-artist {
            font-size: 12px;
            color: #b3b3b3;
        }
    }
`;

const Controls = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: center;

    .control-button {
        background: none;
        border: none;
        color: #fff;
        margin: 0 10px;
        cursor: pointer;

        &:hover {
            color: #1db954;
        }

        svg {
            width: 20px;
            height: 20px;
        }
    }
`;

const VolumeControl = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: flex-end;

    .volume-icon {
        margin-right: 10px;
        cursor: pointer;
    }

    .volume-bar {
        width: 100px;
        height: 5px;
        background: #b3b3b3;
        border-radius: 2.5px;
        overflow: hidden;
        position: relative;

        input[type='range'] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
        
        .volume-level {
            width: 0;
            height: 100%;
            background: #1db954;
            position: absolute;
            top: 0;
            left: 0;
        }
    }
`;

const Player: React.FC = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Load initial volume from localStorage or default to 0.5
    const [volume, setVolume] = useState(parseFloat(localStorage.getItem('playerVolume') || '0.5'));

    const [isMuted, setIsMuted] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const tracks = [
        { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', title: 'Track 1', artist: 'Artist 1', img: 'https://via.placeholder.com/60' },
        { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', title: 'Track 2', artist: 'Artist 2', img: 'https://via.placeholder.com/60' },
        // Add more tracks here
    ];

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = tracks[currentTrackIndex].url;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [currentTrackIndex, isPlaying]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume;
        }
    }, [isMuted, volume, audioRef]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (audioRef.current) {
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        localStorage.setItem('playerVolume', newVolume.toString());
    };

    const handleNextTrack = () => {
        const nextIndex = (currentTrackIndex + 1) % tracks.length;
        setCurrentTrackIndex(nextIndex);
        setIsPlaying(true);
    };

    const handlePreviousTrack = () => {
        const previousIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        setCurrentTrackIndex(previousIndex);
        setIsPlaying(true);
    };

    const handleTrackEnd = () => {
        handleNextTrack();
    };

    const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newProgress = parseFloat(event.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
        }
        setProgress(newProgress);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <PlayerContainer>
            <audio ref={audioRef} onEnded={handleTrackEnd} />
            <ProgressBarContainer>
                <div className="progress" style={{ width: `${progress}%` }}></div>
                <input type="range" min="0" max="100" step="1" value={progress} onChange={handleProgressChange} />
            </ProgressBarContainer>
            <ControlsContainer>
                <TrackInfo>
                    <img src={tracks[currentTrackIndex].img} alt="Album Cover" />
                    <div className="track-details">
                        <div className="track-name">{tracks[currentTrackIndex].title}</div>
                        <div className="track-artist">{tracks[currentTrackIndex].artist}</div>
                    </div>
                </TrackInfo>
                <Controls>
                    <button className="control-button" onClick={handlePreviousTrack}>
                        <FontAwesomeIcon icon={faStepBackward} />
                    </button>
                    <button className="control-button" onClick={handlePlayPause}>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                    </button>
                    <button className="control-button" onClick={handleNextTrack}>
                        <FontAwesomeIcon icon={faStepForward} />
                    </button>
                </Controls>
                <VolumeControl>
                    <div className="volume-icon" onClick={toggleMute}>
                        <FontAwesomeIcon icon={isMuted || volume === 0 ? faVolumeMute : faVolumeUp} />
                    </div>
                    <div className="volume-bar">
                        <div className="volume-level" style={{ width: `${volume * 100}%` }}></div>
                        <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} />
                    </div>
                </VolumeControl>
            </ControlsContainer>
        </PlayerContainer>
    );
};

export default Player;