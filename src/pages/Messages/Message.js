import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { API_ROUTES } from '../../constants/appContstants';
import MessageCard from '../../components/MessageCard/MessageCard';

const ListContainer = styled.section`
    width: 100%;
    padding: 1em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`;
const LoadingContainer = styled.div`
    height: 1em;
    margin: 0.5em;
    text-align: center;
    p {
        margin: 0;
    }
`;

const ErrorMessageText = styled.p`
    text-align: center;
`;

const NoMessageText = styled.p`
    text-align: center;
`;

function Message() {
    const [messageList, setMessageList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const loadingRef = useRef(null);   

    useEffect(() => {
        let pageToken = '';
        let prevYPos = 0;
        let options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };
        const handleObserver = (entities, observer) => {
            const y = entities[0].boundingClientRect.y;
            if (prevYPos > y) {
                getMessages();
            }
            prevYPos = Math.ceil(y);
        }
        const getMessages = () => {
            setIsLoading(true);
            axios(API_ROUTES.messages, { params: { limit: 20, pageToken: pageToken } }).then((resp) => {
                pageToken = resp.data.pageToken;
                setMessageList((prevMessageList) => {
                    return [...prevMessageList, ...resp.data.messages]
                });
            }).catch((error) => {
                setIsError(true);
            }).finally(() => {
                setIsLoading(false);
            })
        }
        let observer = new IntersectionObserver(
            handleObserver,
            options
        );
        observer.observe(loadingRef.current);
        getMessages();
    }, [])
    
    if (isError) return <ErrorMessageText>Error in fetching data</ErrorMessageText>;

    return (
        <ListContainer>
            {messageList.length ? messageList.map((message) =>
                <MessageCard key={message.id} message={message} />
            ) : isLoading ? null: <NoMessageText>No messages available</NoMessageText>}
            <LoadingContainer ref={loadingRef} >
                {isLoading ? <p>Loading...</p> : null}
            </LoadingContainer>
        </ListContainer>
    )
}

export default Message;
