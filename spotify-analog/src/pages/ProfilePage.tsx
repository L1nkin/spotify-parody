import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "./Profile.styles";
import styled from "styled-components";
import { IconAddCircle } from "../assets/icon-add-circle";
import { MyPlaylistCard } from "../components/MyPlaylist/my-playlist-card";
import { getMyPlaylists } from "../api/my-playlists/get-my-playlists";
import { TMyPlaylist } from "../api/my-playlists";
import { getMe } from "../api/get-me";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2em;
  position: relative;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

const MyPlaylistsSectionHeader = styled.div`
  display: flex;
  column-gap: 12px;
  align-items: center;
`;

const MyPlaylistsSectionTitle = styled.span`
  color: #fff;
  font-size: 24px;
`;

const MyPlaylistsSectionList = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  justify-content: center;
`;

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("Loading...");
  const [myPlaylists, setMyPlaylists] = useState<TMyPlaylist[]>([]);

  useEffect(() => {
    getMe()
      .then((response) => {
        setUserName(`${response.username} - ${response.nickname}`);
        // setSongsPlayed(response.data.played);
        // setLikes(response.data.liked);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  useEffect(() => {
    getMyPlaylists({})
      .then((response) => {
        setMyPlaylists(response);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, [getMyPlaylists]);

  //   const handleSettingsClick = () => {
  //     console.log("Settings clicked");
  //     navigate("/profile-settings");
  //   };

  return (
    <Wrapper>
      <InfoContainer>
        <Icon icon={faUser} />
        <h1>{userName}</h1>
        {/* <Button onClick={handleSettingsClick}>
          <Icon icon={faCog} />
        </Button> */}
      </InfoContainer>

      <Section>
        <MyPlaylistsSectionHeader>
          <MyPlaylistsSectionTitle>My playlists</MyPlaylistsSectionTitle>
          <div onClick={() => navigate("/myPlaylists/create")}>
            <IconAddCircle />
          </div>
        </MyPlaylistsSectionHeader>
        <MyPlaylistsSectionList>
          {myPlaylists.map((item, index) => (
            <MyPlaylistCard
              key={index}
              name={item.name}
              onPress={() => navigate(`/myPlaylists/${item.id}`)}
            />
          ))}
        </MyPlaylistsSectionList>
      </Section>
      {/* <StatsContainer>
                <Stat>
                    <Icon icon={faPlay} /> {songsPlayed} played
                </Stat>
                <Stat>
                    <Icon icon={faHeart} /> {likes} likes
                </Stat>
            </StatsContainer> */}
    </Wrapper>
  );
};

export default Profile;
