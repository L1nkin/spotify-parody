import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AlbumResponse, getAlbumById } from "../api/get-albums-by-id";
import { LoadingSpinner } from "../components/Loader/Loader";
import { ListTrackItem } from "../components/ListTrackItem/ListTrackItem";
import { formatMillisecondsToMMSS } from "../utils/format-milliseconds";
import { PlayerContext, TracksContext } from "../App";

const AlbumPageContainer = styled.div`
  padding: 20px;
  color: white;
`;

const AlbumHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const AlbumImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin-right: 20px;
`;

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumTitle = styled.h1`
  font-size: 2.5em;
  margin: 0;
`;

const AlbumType = styled.span`
  font-size: 1.2em;
  color: grey;
`;

const AlbumDescription = styled.p`
  font-size: 1.1em;
`;

const SongList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LoaderWrapper = styled.div`
  height: 80vh;
  width: 100%;
`;

const AlbumPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<AlbumResponse>();
  const { currentTrack, setCurrentTrack, setTracks } =
    useContext(TracksContext);
  const { isPlaying, setIsPlaying } = useContext(PlayerContext);
  useEffect(() => {
    (async () => {
      const data = await getAlbumById(id!);
      setAlbum(data);
    })();
  }, [id]);

  if (!album) {
    return (
      <LoaderWrapper>
        <LoadingSpinner />
      </LoaderWrapper>
    );
  }

  return (
    <AlbumPageContainer>
      <AlbumHeader>
        <AlbumImage src={album.imageUrl} alt={album.name} />
        <AlbumInfo>
          <AlbumType>{album.type}</AlbumType>
          <AlbumTitle>{album.name}</AlbumTitle>
          <AlbumDescription>{album.description}</AlbumDescription>
        </AlbumInfo>
      </AlbumHeader>
      <SongList>
        {album.tracks.map((track, index) => (
          <ListTrackItem
            key={index}
            number={index + 1}
            trackName={track.name}
            artistName={track.artistName}
            trackDuration={formatMillisecondsToMMSS(track.duration)}
            isPlaying={currentTrack?.id === track.id && isPlaying}
            onPressTrack={() => {
              setCurrentTrack({ ...track, imageUrl: album.imageUrl, index });
              setTracks(
                album.tracks.map((track) => ({
                  ...track,
                  imageUrl: album.imageUrl,
                }))
              );
              setIsPlaying(currentTrack?.id === track.id ? !isPlaying : true);
            }}
          />
        ))}
      </SongList>
    </AlbumPageContainer>
  );
};

export default AlbumPage;
