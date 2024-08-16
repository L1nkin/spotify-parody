import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { PlaylistResponse } from "../api/get-playlist-by-id";
import { LoadingSpinner } from "../components/Loader/Loader";
import { ListTrackItem } from "../components/ListTrackItem/ListTrackItem";
import { formatMillisecondsToMMSS } from "../utils/format-milliseconds";
import { IconPlaylist } from "../assets/icon-playlist";
import { getPlaylistDetails } from "../api/my-playlists/get-playlist-details";
import { PlayerContext, TracksContext } from "../App";

const PlaylistPageContainer = styled.div`
  padding: 20px 0 100px 0;
  color: white;
`;

const PlaylistHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const PlaylistImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin-right: 20px;
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistTitle = styled.h1`
  font-size: 2.5em;
  margin: 0;
`;

const PlaylistType = styled.span`
  font-size: 1.2em;
  color: grey;
`;

const PlaylistDescription = styled.p`
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

const MyPlaylist: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<PlaylistResponse>();
  const { currentTrack, setCurrentTrack, setTracks } =
    useContext(TracksContext);
  const { isPlaying, setIsPlaying } = useContext(PlayerContext);

  useEffect(() => {
    (async () => {
      const data = await getPlaylistDetails({ id: id! });
      setPlaylist(data);
    })();
  }, [id]);

  if (!playlist) {
    return (
      <LoaderWrapper>
        <LoadingSpinner />
      </LoaderWrapper>
    );
  }

  return (
    <PlaylistPageContainer>
      <PlaylistHeader>
        {playlist.imageUrl ? (
          <PlaylistImage src={playlist.imageUrl} alt={playlist.name} />
        ) : (
          <div
            style={{
              width: "200px",
              height: "200px",
              backgroundColor: "#757575",
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "20px",
            }}
          >
            <IconPlaylist />
          </div>
        )}
        <PlaylistInfo>
          <PlaylistType>{playlist.type}</PlaylistType>
          <PlaylistTitle>{playlist.name}</PlaylistTitle>
          <PlaylistDescription>{playlist.description}</PlaylistDescription>
        </PlaylistInfo>
      </PlaylistHeader>
      <SongList>
        {playlist.tracks.map((track, index) => (
          <ListTrackItem
            key={index}
            number={index + 1}
            trackName={track.name}
            artistName={track.artistName}
            trackDuration={formatMillisecondsToMMSS(track.duration)}
            showAddButton={false}
            imageUri={track.imageUrl}
            onTap={() => {}}
            isPlaying={currentTrack?.id === track.id && isPlaying}
            onPressTrack={() => {
              setCurrentTrack({ ...track, index });
              setTracks(playlist.tracks);
              setIsPlaying(currentTrack?.id === track.id ? !isPlaying : true);
            }}
          />
        ))}
      </SongList>
    </PlaylistPageContainer>
  );
};

export default MyPlaylist;
