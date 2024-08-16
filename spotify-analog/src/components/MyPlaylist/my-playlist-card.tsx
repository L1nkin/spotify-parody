import styled from "styled-components"
import { IconPlaylist } from "../../assets/icon-playlist"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    /* width: 252.8px; */
    height: 270px;
    background-color: #2a2929;
    border-radius: 12px;
    overflow: hidden;
    cursor: pointer;
`

const ImageContainer = styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #757575;
`

const Title = styled.span`
    font-size: 24px;
    color: #fff;
    text-align: center;
`

type Props = {
    name: string
    onPress: () => void
}

export const MyPlaylistCard = ({
    name,
    onPress
}: Props) => {
    return (
        <Wrapper onClick={onPress}>
            <ImageContainer>
                <IconPlaylist />
            </ImageContainer>

            <Title>{name}</Title>
        </Wrapper>
    )
}