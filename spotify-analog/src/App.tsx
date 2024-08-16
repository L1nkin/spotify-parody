import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
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
import CreateMyPlaylist from "./pages/CreateMyPlaylist";
import MyPlaylist from "./pages/MyPlaylist";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AuthContext = createContext({isAuth: false, setAuth: (isAuth: boolean) => {}})

const App: React.FC = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("token"));

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
      <Route path="/myPlaylists/create" element={< CreateMyPlaylist/>} />
      <Route path="/myPlaylists/:id" element={<MyPlaylist />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      {/* <<< New Route added */}
    </Routes>
  );

  return (
    <AuthContext.Provider value={{isAuth: isAuth, setAuth: setIsAuth}}>
        <Router>
        {isAuth && <Navbar />}
        {isAuth ? privateRoutes : publicRoutes}
        <PlayerWrapper />
        </Router>
    </AuthContext.Provider>
  );
};

const PlayerWrapper: React.FC = () => {
  const location = useLocation();

  if (location.pathname === "/auth") {
    return null;
  }

  return <Player />;
};

export default App;
