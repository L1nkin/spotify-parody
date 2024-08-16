import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faUser, faHeart, faPlay, faCog } from '@fortawesome/free-solid-svg-icons';
import { Container, Icon, StatsContainer, Stat, Button } from './Profile.styles';
import axios from 'axios';

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState<string>('Loading...');
    const [songsPlayed, setSongsPlayed] = useState<number>(0);
    const [likes, setLikes] = useState<number>(0);

    useEffect(() => {
        axios.get('http://localhost:5000/profile/Username')
            .then(response => {
                setUserName(response.data.username);
                setSongsPlayed(response.data.played);
                setLikes(response.data.liked);
            })
            .catch(error => console.error(`Error: ${error}`));
    }, []);

    const handleSettingsClick = () => {
        console.log('Settings clicked');
        navigate('/profile-settings');
    };

    return (
        <Container>
            <Icon icon={faUser} />
            <h1>{userName}</h1>
            <Button onClick={handleSettingsClick}>
                <Icon icon={faCog} />
            </Button>
            <StatsContainer>
                <Stat>
                    <Icon icon={faPlay} /> {songsPlayed} played
                </Stat>
                <Stat>
                    <Icon icon={faHeart} /> {likes} likes
                </Stat>
            </StatsContainer>
        </Container>
    );
};

export default Profile;