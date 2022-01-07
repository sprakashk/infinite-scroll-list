import React, { memo } from 'react'
import Moment from 'react-moment';
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: flex-start; 
    align-items: center;
    gap: 1em;   
`;
const AvatarContainer = styled.img`
    height: 3em;
    width: 3em;
    border-radius: 50%;
    user-select: none;
`;
const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 0.2em;
    h5 {
        margin: 0;
        color: #000;
        font-size: 1em;
    }
    p {
        margin: 0;
        color: #808080;
        font-size: 1em;
    }
`;

function AvatarWithName({ imgUrl, name, updateTime }) {
    return (
        <Container>
            <AvatarContainer src={imgUrl} alt="user" />
            <NameContainer>
                <h5>{name}</h5>
                <p><Moment fromNow>{updateTime}</Moment></p>
            </NameContainer>
        </Container>
    )
}

export default memo(AvatarWithName);
