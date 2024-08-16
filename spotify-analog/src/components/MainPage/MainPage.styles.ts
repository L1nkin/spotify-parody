import styled from "styled-components";
import { Link } from "react-router-dom";

export const MainPageContainer = styled.div`
  padding: 20px 0 70px 0; /* Remove horizontal padding */
  color: white;
`;

export const SuggestionsContainer = styled.div`
  margin-bottom: 40px;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 20px;
`;

export const ItemsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  justify-content: center;
`;

export const Item = styled.div`
  background-color: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  height: 300px;
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ItemTitle = styled.h3`
  font-size: 1.2em;
  margin: 10px 0;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover ${Item} {
    transform: scale(1.03);
    transition: transform 0.2s;
  }
`;
