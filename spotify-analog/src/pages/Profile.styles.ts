// Profile.styles.ts

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em;
    position: relative;
`;

export const Icon = styled(FontAwesomeIcon)`
    font-size: 3em;
    margin-right: 0.5em;
`;

export const StatsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin-top: 1em;
`;

export const Stat = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.5em;
`;

export const Button = styled.button`
    border: none;
    color: white;
    background: none;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    font-size: 12px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;

    &:hover {
        color: #4CAF50;
    }
`;