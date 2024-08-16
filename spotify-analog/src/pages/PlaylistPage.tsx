import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPlaylistById, PlaylistResponse } from "../api/get-playlist-by-id";
import { LoadingSpinner } from "../components/Loader/Loader";
import { ListTrackItem } from "../components/ListTrackItem/ListTrackItem";
import { formatMillisecondsToMMSS } from "../utils/format-milliseconds";
import { PlayerContext, TracksContext } from "../App";
import { TMyPlaylist } from "../api/my-playlists";
import { getMyPlaylists } from "../api/my-playlists/get-my-playlists";
import { MyPlaylistCard } from "../components/MyPlaylist/my-playlist-card";
import { addTrackToPlaylist } from "../api/my-playlists/add-track-to-playlist";

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

const PlaylistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<PlaylistResponse>();
  const { currentTrack, setCurrentTrack, setTracks } =
    useContext(TracksContext);
  const { isPlaying, setIsPlaying } = useContext(PlayerContext);
  const [isPopupShowing, setPopupShowing] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<TMyPlaylist[]>([]);
  const [trackToAddId, setTrackToAddId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const data = await getPlaylistById(id!);
      setPlaylist(data);
    })();
  }, [id]);

  useEffect(() => {
    if (!isPopupShowing) {
      return;
    }

    getMyPlaylists({})
      .then((response) => {
        setMyPlaylists(response);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, [getMyPlaylists, isPopupShowing]);

  const handleTapPlaylist = useCallback(
    (id: string) => {
      if (!trackToAddId) {
        return;
      }

      addTrackToPlaylist({ playlistId: id, songId: trackToAddId }).finally(
        () => {
          setPopupShowing(false);
          setTrackToAddId(undefined);
        }
      );
    },
    [
      myPlaylists,
      trackToAddId,
      setPopupShowing,
      setTrackToAddId,
      addTrackToPlaylist,
    ]
  );

  if (!playlist) {
    return (
      <LoaderWrapper>
        <LoadingSpinner />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <PlaylistPageContainer>
        <PlaylistHeader>
          {playlist.imageUrl && (
            <PlaylistImage src={playlist.imageUrl} alt={playlist.name} />
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
              imageUri={track.imageUrl}
              onTap={() => {
                setPopupShowing(true);
                setTrackToAddId(track.id);
              }}
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
      {isPopupShowing && (
        <div
          style={{
            position: "fixed",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100000,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.7)",
              position: "fixed",
              top: "0",
              left: "0",
              bottom: "0",
              right: "0",
            }}
            onClick={() => {
              setPopupShowing(false);
              setTrackToAddId(undefined);
            }}
          ></div>

          <div
            style={{
              position: "fixed",
              top: "15%",
              left: "15%",
              right: "15%",
              bottom: "15%",
              backgroundColor: "#1d1d1d",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              flexDirection: "column",
              rowGap: 18,
              zIndex: 10000000,
            }}
          >
            <span style={{ fontSize: 32, color: "#fff" }}>My playlists</span>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: 20,
                justifyContent: "center",
              }}
            >
              {myPlaylists.map((item, index) => (
                <MyPlaylistCard
                  key={index}
                  name={item.name}
                  onPress={() => handleTapPlaylist(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistPage;
