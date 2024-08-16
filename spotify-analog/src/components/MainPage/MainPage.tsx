import React from 'react';
import {
    MainPageContainer,
    SuggestionsContainer,
    SectionTitle,
    ItemsContainer,
    Item,
    ItemImage,
    ItemTitle,
    StyledLink
} from './MainPage.styles';
import { SuggestionsTypeResponse } from '../../api/suggestions-requests';

type Props = {
    suggestions: SuggestionsTypeResponse
}

const MainPage: React.FC<Props> = ({suggestions}) => {
    return (
        <MainPageContainer>
            <SuggestionsContainer>
                <SectionTitle>Playlists</SectionTitle>
                {suggestions.playlists.length ? <ItemsContainer>
                    {suggestions.playlists.map((playlist) => (
                        <StyledLink to={`/playlist/${playlist.id}`} key={playlist.id}>
                            <Item>
                                <ItemImage src={playlist.imageUrl} alt={playlist.name} />
                                <ItemTitle>{playlist.name}</ItemTitle>
                            </Item>
                        </StyledLink>
                    ))}
                </ItemsContainer> : <div style={{padding: '20px 0'}}><ItemTitle>Not found</ItemTitle></div>}
            </SuggestionsContainer>
            <SuggestionsContainer>
                <SectionTitle>Albums</SectionTitle>
                {suggestions.albums.length ? <ItemsContainer>
                    {suggestions.albums.map((album) => (
                        <StyledLink to={`/album/${album.id}`} key={album.id}>
                            <Item>
                                <ItemImage src={album.imageUrl} alt={album.name} />
                                <ItemTitle>{album.name}</ItemTitle>
                            </Item>
                        </StyledLink>
                    ))}
                </ItemsContainer> : <div style={{padding: '20px 0'}}><ItemTitle>Not found</ItemTitle></div>}
            </SuggestionsContainer>
        </MainPageContainer>
    );
};

export default MainPage;