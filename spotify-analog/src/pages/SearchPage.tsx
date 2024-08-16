// SearchPage.tsx
import styled from "styled-components";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  searchPlaylists,
  SearchTypeResponse,
} from "../api/search-playlists.ts";
import { ListTrackItem } from "../components/ListTrackItem/ListTrackItem.tsx";
import { formatMillisecondsToMMSS } from "../utils/format-milliseconds.ts";
import { PlayerContext, SearchContext, TracksContext } from "../App.tsx";
import { TMyPlaylist } from "../api/my-playlists.ts";
import { getMyPlaylists } from "../api/my-playlists/get-my-playlists.ts";
import { addTrackToPlaylist } from "../api/my-playlists/add-track-to-playlist.ts";
import { MyPlaylistCard } from "../components/MyPlaylist/my-playlist-card.tsx";
import {
  SuggestionsContainer,
  SectionTitle,
  ItemsContainer,
  StyledLink,
  Item,
  ItemTitle,
  ItemImage,
} from "../components/MainPage/MainPage.styles.ts";
import { LoadingSpinner } from "../components/Loader/Loader.tsx";
import { useSearchParams } from "react-router-dom";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px 20px 100px 20px;
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

const SongList = styled.ul`
  list-style: none;
  padding: 0;
`;

const LoaderWrapper = styled.div`
  height: 80vh;
  width: 100%;
`;

const SearchPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(params.get("search") ?? "");
  const [songs, setSongs] = useState<SearchTypeResponse>();
  const { currentTrack, setCurrentTrack, setTracks } =
    useContext(TracksContext);
  const { isPlaying, setIsPlaying } = useContext(PlayerContext);
  const [isPopupShowing, setPopupShowing] = useState(false);
  const [myPlaylists, setMyPlaylists] = useState<TMyPlaylist[]>([]);
  const [trackToAddId, setTrackToAddId] = useState<string | undefined>(
    undefined
  );
  const [isLoading, setisLoading] = useState(false);
  const { search, setSearch } = useContext(SearchContext);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setParams({ search: e.target.value });
  };

  const handleSearchSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (search[searchTerm]) {
      setSongs(search[searchTerm]);
      return;
    }

    try {
      setisLoading(true);
      const response = await searchPlaylists(searchTerm);
      setSearch(searchTerm, response);
      setSongs(response);

      setisLoading(false);
    } catch {
      setisLoading(false);
      console.error(`Error searching for "${searchTerm}"`);
    }
  };

  useEffect(() => {
    if (searchTerm && searchTerm.length) {
      handleSearchSubmit();
    }
  }, []);

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

  if (isLoading) {
    return (
      <LoaderWrapper>
        <LoadingSpinner />
      </LoaderWrapper>
    );
  }

  return (
    <>
      <StyledDiv>
        <StyledForm onSubmit={handleSearchSubmit}>
          <StyledInput
            type="text"
            id="searchInput"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <StyledButton type="submit">Search</StyledButton>
        </StyledForm>
        {/* Render the songs */}
        {songs ? (
          <>
            <SongList>
              {songs?.tracks.map((track, index) => (
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
                    setTracks(songs?.tracks);
                    setIsPlaying(
                      currentTrack?.id === track.id ? !isPlaying : true
                    );
                  }}
                />
              ))}
            </SongList>
            <SuggestionsContainer>
              <SectionTitle>Playlists</SectionTitle>
              {songs?.playlists.length ? (
                <ItemsContainer>
                  {songs.playlists.map((playlist) => (
                    <StyledLink
                      to={`/playlist/${playlist.id}`}
                      key={playlist.id}
                    >
                      <Item>
                        <ItemImage
                          src={playlist.imageUrl}
                          alt={playlist.name}
                        />
                        <ItemTitle>{playlist.name}</ItemTitle>
                      </Item>
                    </StyledLink>
                  ))}
                </ItemsContainer>
              ) : (
                <div style={{ padding: "20px 0" }}>
                  <ItemTitle>Not found</ItemTitle>
                </div>
              )}
            </SuggestionsContainer>
            <SuggestionsContainer>
              <SectionTitle>Albums</SectionTitle>
              {songs?.albums.length ? (
                <ItemsContainer>
                  {songs.albums.map((album) => (
                    <StyledLink to={`/album/${album.id}`} key={album.id}>
                      <Item>
                        <ItemImage src={album.imageUrl} alt={album.name} />
                        <ItemTitle>{album.name}</ItemTitle>
                      </Item>
                    </StyledLink>
                  ))}
                </ItemsContainer>
              ) : (
                <div style={{ padding: "20px 0" }}>
                  <ItemTitle>Not found</ItemTitle>
                </div>
              )}
            </SuggestionsContainer>
          </>
        ) : (
          <span>not found</span>
        )}
      </StyledDiv>
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

export default SearchPage;
