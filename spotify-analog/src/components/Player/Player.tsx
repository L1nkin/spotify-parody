// components/Player/Player.tsx
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faVolumeUp,
  faVolumeMute,
} from "@fortawesome/free-solid-svg-icons";
import { PlayerContext, TracksContext } from "../../App";
import { getAudioFile } from "../../api/get-audio-file";

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
  padding: 0 20px 10px 20px;
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

  input[type="range"] {
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

    input[type="range"] {
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
  const { isPlaying, setIsPlaying } = useContext(PlayerContext);
  // Load initial volume from localStorage or default to 0.5
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem("playerVolume") || "0.5")
  );

  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const { tracks, currentTrack, setCurrentTrack } = useContext(TracksContext);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        (async () => {
          const data = await getAudioFile({
            search: `${currentTrack?.artistName}-${currentTrack?.name}`,
          });

          if (audioRef.current) {
            audioRef.current.src = data.link;
            audioRef.current.play();
          }
        })();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [isMuted, volume, audioRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
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
    localStorage.setItem("playerVolume", newVolume.toString());
  };

  const handleNextTrack = () => {
    if (currentTrack && tracks) {
      const nextIndex =
        currentTrack?.index + 1 === tracks.length ? 0 : currentTrack.index + 1;
      setCurrentTrack({ ...tracks[nextIndex], index: nextIndex });
      setIsPlaying(true);
    }
  };

  const handlePreviousTrack = () => {
    if (currentTrack && tracks) {
      const previousIndex =
        currentTrack?.index === 0 ? tracks.length - 1 : currentTrack?.index - 1;
      setCurrentTrack({ ...tracks[previousIndex], index: previousIndex });
      setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    handleNextTrack();
  };

  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime =
        (newProgress / 100) * audioRef.current.duration;
    }
    setProgress(newProgress);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <PlayerContainer>
      <audio ref={audioRef} onEnded={handleTrackEnd} />
      <ProgressBarContainer>
        <div className="progress" style={{ width: `${progress}%` }}></div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={progress}
          onChange={handleProgressChange}
        />
      </ProgressBarContainer>
      <ControlsContainer>
        <TrackInfo>
          <img src={currentTrack?.imageUrl} alt="Album Cover" />
          <div className="track-details">
            <div className="track-name" style={{ color: "#1ed760" }}>
              {currentTrack?.name}
            </div>
            <div className="track-artist">{currentTrack?.artistName}</div>
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
            <FontAwesomeIcon
              icon={isMuted || volume === 0 ? faVolumeMute : faVolumeUp}
            />
          </div>
          <div className="volume-bar">
            <div
              className="volume-level"
              style={{ width: `${volume * 100}%` }}
            ></div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
          </div>
        </VolumeControl>
      </ControlsContainer>
    </PlayerContainer>
  );
};

export default Player;
