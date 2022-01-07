import React, { memo } from 'react'
import styled from 'styled-components';
import { BASE_ROUTE, MESSAGE_CHAR_LIMIT } from '../../constants/appContstants';
import AvatarWithName from '../AvatarWithName/AvatarWithName';
import SwipeableItem from '../SwipeableItem/SwipeableItem'

const CardContainer = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1em;
    box-sizing: border-box;
    box-shadow: 1px 2px 6px 1px rgb(0 0 0 / 16%);
    background-color: #fff;
`;
const ContentContainer = styled.p`
    font-size: 1em;
    color: #000;
    text-align: left;
    line-height: 1.4em;
`;

function MessageCard({ message }) {
    return (
        <SwipeableItem>
            <CardContainer>
                <AvatarWithName
                    name={message.author?.name}
                    imgUrl={`${BASE_ROUTE}${message?.author?.photoUrl}`}
                    updateTime={message.updated}
                />
                <ContentContainer>
                    {message.content?.length > MESSAGE_CHAR_LIMIT ?
                        `${message.content.substring(0, 200)}...` : message.content}
                </ContentContainer>
            </CardContainer>
        </SwipeableItem>
    )
}

export default memo(MessageCard);
