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
  setTracks: (tracks: TrackType[]) => void;
  setCurrentTrack: (track: ContextTrackType) => void;
};

export const TracksContext = createContext<TrackContextType>({
  currentTrack: undefined,
  tracks: undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTracks: (tracks: TrackType[]) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setCurrentTrack: (track: ContextTrackType) => {},
});

type PlayerContext = {
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
};

export const PlayerContext = createContext<PlayerContext>({
  isPlaying: false,
  setIsPlaying: () => {},
});

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));
  const [suggestions, setSuggestions] = useState<SuggestionsTypeResponse>({
    albums: [],
    playlists: [],
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const lastPlaylist = localStorage.getItem("lastPlaylist");
  const [tracks, setTracks] = useState<TrackType[] | undefined>(
    lastPlaylist ? (JSON.parse(lastPlaylist) as TrackType[]) : undefined
  );
  const [currentTrack, setCurrentTrack] = useState<
    ContextTrackType | undefined
  >(JSON.parse(localStorage.getItem("lastTrack") ?? "") as ContextTrackType);
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
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* <<< New Route added */}
    </Routes>
  );

  return (
    <AuthContext.Provider value={{ isAuth: isAuth, setAuth: setIsAuth }}>
      <PlayerContext.Provider value={{ isPlaying, setIsPlaying }}>
        <TracksContext.Provider
          value={{
            tracks,
            setCurrentTrack: (newTrack) => {
              setCurrentTrack(newTrack);
              localStorage.setItem("lastTrack", JSON.stringify(newTrack));
            },
            setTracks: (newTracks) => {
              setTracks(newTracks);
              localStorage.setItem("lastPlaylist", JSON.stringify(newTracks));
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
      </PlayerContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
