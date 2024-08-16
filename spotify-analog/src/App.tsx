import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import PlaylistPage from "./pages/PlaylistPage";
import AlbumPage from "./pages/AlbumPage";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/ProfilePage";
import ProfileSettings from "./pages/ProfileSettings";
import Player from "./components/Player/Player";
import SearchPage from "./pages/SearchPage"; // <-- Make sure you have SearchPage.tsx in your "./pages" directory
import { SuggestionsTypeResponse } from "./api/suggestions-requests";
import { TrackType } from "./api/types";
import CreateMyPlaylist from "./pages/CreateMyPlaylist";
import MyPlaylist from "./pages/MyPlaylist";
import { SearchTypeResponse } from "./api/search-playlists";

export const AuthContext = createContext({
  isAuth: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuth: (isAuth: boolean) => {},
});

export const SuggestionsContext = createContext({
  suggestions: { playlists: [], albums: [] } as SuggestionsTypeResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setSuggestions: (suggestions: SuggestionsTypeResponse) => {},
});

type ContextTrackType = TrackType & { index: number };

type TrackContextType = {
  currentTrack?: ContextTrackType;
  tracks?: TrackType[];
  setTracks: (tracks?: TrackType[]) => void;
  setCurrentTrack: (track?: ContextTrackType) => void;
};

export const TracksContext = createContext<TrackContextType>({
  currentTrack: undefined,
  tracks: undefined,

  setTracks: () => {},

  setCurrentTrack: () => {},
});

type PlayerContext = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const PlayerContext = createContext<PlayerContext>({
  isPlaying: false,
  setIsPlaying: () => {},
});

type SearchContextType = {
  search: Record<string, SearchTypeResponse>;
  setSearch: (key: string, searchResult: SearchTypeResponse) => void;
};

export const SearchContext = createContext<SearchContextType>({
  search: {},
  setSearch: () => {},
});

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [suggestions, setSuggestions] = useState<SuggestionsTypeResponse>({
    albums: [],
    playlists: [],
  });
  const [search, setSearch] = useState<Record<string, SearchTypeResponse>>({});

  const [isPlaying, setIsPlaying] = useState(false);
  const lastPlaylist = localStorage.getItem("lastPlaylist");
  const [tracks, setTracks] = useState<TrackType[] | undefined>(
    lastPlaylist ? (JSON.parse(lastPlaylist) as TrackType[]) : undefined
  );
  const lastTrack = localStorage.getItem("lastTrack");
  const [currentTrack, setCurrentTrack] = useState<
    ContextTrackType | undefined
  >(lastTrack ? (JSON.parse(lastTrack) as ContextTrackType) : undefined);
  const publicRoutes = (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate to="/auth" replace />} />
    </Routes>
  );

  const privateRoutes = (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/playlist/:id" element={<PlaylistPage />} />
      <Route path="/album/:id" element={<AlbumPage />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile-settings" element={<ProfileSettings />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/myPlaylists/create" element={<CreateMyPlaylist />} />
      <Route path="/myPlaylists/:id" element={<MyPlaylist />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* <<< New Route added */}
    </Routes>
  );

  return (
    <AuthContext.Provider value={{ isAuth: isAuth, setAuth: setIsAuth }}>
      <PlayerContext.Provider value={{ isPlaying, setIsPlaying }}>
        <SearchContext.Provider
          value={{
            search,
            setSearch: (key, searchResult) =>
              setSearch((prev) => ({ ...prev, [key]: searchResult })),
          }}
        >
          <TracksContext.Provider
            value={{
              tracks,
              setCurrentTrack: (newTrack) => {
                setCurrentTrack(newTrack);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                newTrack
                  ? localStorage.setItem("lastTrack", JSON.stringify(newTrack))
                  : localStorage.removeItem("lastTrack");
              },
              setTracks: (newTracks) => {
                setTracks(newTracks);
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                newTracks
                  ? localStorage.setItem(
                      "lastPlaylist",
                      JSON.stringify(newTracks)
                    )
                  : localStorage.removeItem("lastPlaylist");
              },
              currentTrack,
            }}
          >
            <SuggestionsContext.Provider
              value={{ suggestions: suggestions, setSuggestions }}
            >
              <Router>
                {isAuth && <Navbar />}
                {isAuth ? privateRoutes : publicRoutes}
                {isAuth && <Player />}
              </Router>
            </SuggestionsContext.Provider>
          </TracksContext.Provider>
        </SearchContext.Provider>
      </PlayerContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
