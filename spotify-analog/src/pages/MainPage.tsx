import React, { useEffect, useState } from "react";
import MainPageComponent from "../components/MainPage/MainPage";
import {
  getSuggestions,
  SuggestionsTypeResponse,
} from "../api/suggestions-requests";

const MainPage: React.FC = () => {
  const [suggestions, setSuggestions] = useState<SuggestionsTypeResponse>({
    albums: [],
    playlists: [],
  });
  useEffect(() => {
    (async () => {
      const data = await getSuggestions();
      setSuggestions(data);
    })();
  }, []);

  return <MainPageComponent suggestions={suggestions} />;
};

export default MainPage;
