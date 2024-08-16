import React, { useContext, useEffect } from "react";
import MainPageComponent from "../components/MainPage/MainPage";
import { getSuggestions } from "../api/suggestions-requests";
import { SuggestionsContext } from "../App";

const MainPage: React.FC = () => {
  const { suggestions, setSuggestions } = useContext(SuggestionsContext);
  useEffect(() => {
    (async () => {
      const data = await getSuggestions();
      setSuggestions(data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MainPageComponent suggestions={suggestions} />;
};

export default MainPage;
