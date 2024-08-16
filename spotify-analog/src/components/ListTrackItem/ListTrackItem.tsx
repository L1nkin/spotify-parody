import { faPause } from "@fortawesome/free-solid-svg-icons";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  border-radius: 12px;

  &:hover {
    background-color: #575757;
  }
`;

const LeftSideContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 18px;
  align-items: center;
`;

const TrackInfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TrackNameText = styled.span`
  font-size: 1.2em;
  color: white;
`;

const ArtistNameText = styled.span<{ isHover: boolean }>`
  font-size: 1em;
  color: ${({ isHover }) => (isHover ? "white" : "grey")};
`;

const DurationText = styled.span`
  font-size: 1em;
  color: white;
`;

const NumberText = styled.span`
  font-size: 1.2em;
  color: white;
`;

const PlayButton = styled.div`
  display: flex;
  background-color: transparent;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: grey;
  }
`;

const PlayContent = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export const ItemImage = styled.img`
  border-radius: 8px;
  width: 50px;
  height: 50px;
  object-fit: fill;
`;

type Props = {
  number: number;
  trackName: string;
  artistName: string;
  trackDuration: string;
  imageUri?: string;
};

export const ListTrackItem = ({
  number,
  trackDuration,
  imageUri,
  trackName,
  artistName,
}: Props) => {
  const [hover, setHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <Wrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <LeftSideContent>
        <PlayContent>
          {hover ? (
            <PlayButton onClick={() => setIsPlaying((prev) => !prev)}>
              <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </PlayButton>
          ) : (
            <NumberText>{number}</NumberText>
          )}
        </PlayContent>
        {imageUri && <ItemImage src={imageUri} alt={trackName} />}
        <TrackInfoContent>
          <TrackNameText>{trackName}</TrackNameText>
          <ArtistNameText isHover={hover}>{artistName}</ArtistNameText>
        </TrackInfoContent>
      </LeftSideContent>
      <DurationText>{trackDuration}</DurationText>
    </Wrapper>
  );
};
