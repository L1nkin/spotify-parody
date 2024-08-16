import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { AlbumResponse, getAlbumById } from "../api/get-albums-by-id";
import { LoadingSpinner } from "../components/Loader/Loader";
import { ListTrackItem } from "../components/ListTrackItem/ListTrackItem";
import { formatMillisecondsToMMSS } from "../utils/format-milliseconds";
import { PlayerContext, TracksContext } from "../App";
import { TMyPlaylist } from "../api/my-playlists";
import { getMyPlaylists } from "../api/my-playlists/get-my-playlists";
import { addTrackToPlaylist } from "../api/my-playlists/add-track-to-playlist";
import { MyPlaylistCard } from "../components/MyPlaylist/my-playlist-card";

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
  const [isPopupShowing, setPopupShowing] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<TMyPlaylist[]>([]);
  const [trackToAddId, setTrackToAddId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const data = await getAlbumById(id!);
      setAlbum(data);
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

  if (!album) {
    return (
      <LoaderWrapper>
        <LoadingSpinner />
      </LoaderWrapper>
    );
  }

  return (
    <>
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
              onTap={() => {
                setPopupShowing(true);
                setTrackToAddId(track.id);
              }}
            />
          ))}
        </SongList>
      </AlbumPageContainer>
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

export default AlbumPage;
