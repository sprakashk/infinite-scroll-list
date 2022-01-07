import React, { memo } from 'react'
import styled from 'styled-components';
import hamburger from '../../assets/hamburger.svg';

const HeaderContainer = styled.div`
    position: sticky;
    top: 0;
    z-index: 2;
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 2em;
    padding: .5em 1em;
    box-sizing: border-box;
    box-shadow: 0px 4px 6px rgb(0 0 0 / 16%);
    background-color: #6e46c8;
`;
const MenuContainer = styled.img`
    height: 1.5em;
    width: auto;
    user-select: none;
`;
const TitleContainer = styled.h2`
    color: #fff;
    margin: 0;
    font-size: 1.5em;
    line-height: 2em;
`;

function Header({ title }) {
    return (
        <HeaderContainer>
            <MenuContainer src={hamburger} alt="menu" />
            <TitleContainer>{title}</TitleContainer>
        </HeaderContainer>
    )
}

export default memo(Header);
