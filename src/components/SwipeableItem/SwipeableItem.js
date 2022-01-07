import React, { useRef, useEffect } from 'react'
import styled from 'styled-components';

const SwipableWrapper = styled.div`
  position: relative;
  transition: max-height 0.5s ease;
  max-height: 1000px;
  transform-origin: top;
  width: 100%;
  margin-bottom: 0.8em;
`;
const SwipeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-right: 1em;
  color: #fff;
  background-color: #ff0000;
  box-sizing: border-box;
`;
const ListItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  transition: transform 0.5s ease;
  .bounce {
    transition: transform 0.5s ease;
  }
`;

function SwipeableItem(props) {
    const listElementRef = useRef();
    const wrapperRef = useRef();
    const backgroundRef = useRef();

    const dragStartXRef = useRef(0);
    const leftRef = useRef(0);
    const draggedRef = useRef(false);
    const {onSwipe, threshold} = props;
    
    useEffect(() => {
        function onDragEndMouse(e) {
            window.removeEventListener('mousemove', onMouseMove);
            onDragEnd();
        }
    
        function onDragEndTouch(e) {
            window.removeEventListener('touchmove', onTouchMove);
            onDragEnd();
        }

        function onSwiped() {
            setTimeout(() => wrapperRef.current.remove(), 500);
            if (onSwipe) {
                // Callback that can be executed on swipe action execution.
                onSwipe();
            }
        }

        function onDragEnd() {
            if (draggedRef.current) {
                draggedRef.current = false;
                const thresholdValue = threshold || 0.3;
    
                if (leftRef.current < listElementRef.current.offsetWidth * thresholdValue * -1) {
                    leftRef.current = (-listElementRef.current.offsetWidth * 2);
                    wrapperRef.current.style.maxHeight = 0;
                    onSwiped();
                } else {
                    leftRef.current = 0;
                }
    
                listElementRef.current.classList.add('bounce');
                listElementRef.current.style.transform = `translateX(${leftRef.current}px)`;
            }
        }

        window.addEventListener('mouseup', onDragEndMouse);
        window.addEventListener('touchend', onDragEndTouch);
        return () => {
            window.removeEventListener("mouseup", onDragEndMouse);
            window.removeEventListener("touchend", onDragEndTouch);
        }
    }, [onSwipe, threshold])

    function onDragStartMouse(e) {
        onDragStart(e.clientX);
        window.addEventListener('mousemove', onMouseMove);
    }

    function onDragStartTouch(e) {
        const touch = e.targetTouches[0];
        onDragStart(touch.clientX);
        window.addEventListener('touchmove', onTouchMove);
    }

    function onDragStart(clientX) {
        draggedRef.current = true;
        dragStartXRef.current = clientX;
        listElementRef.current.className = 'listItem';
        requestAnimationFrame(updatePosition);
    }

    function updatePosition() {
        if (draggedRef.current) {
            requestAnimationFrame(updatePosition);
        }
        listElementRef.current.style.transform = `translateX(${leftRef.current}px)`;
        // Fade the opacity
        const opacity = (Math.abs(leftRef.current) / 100).toFixed(2);
        if (opacity < 1 && opacity.toString() !== backgroundRef.current.style.opacity) {
            backgroundRef.current.style.opacity = opacity.toString();
        }
        if (opacity >= 1) {
            backgroundRef.current.style.opacity = 1;
        }
    }

    function onMouseMove(e) {
        const left = e.clientX - dragStartXRef.current;
        if (left < 0) {
            leftRef.current = left;
        }
    }

    function onTouchMove(e) {
        const touch = e.targetTouches[0];
        const left = touch.clientX - dragStartXRef.current;
        if (left < 0) {
            leftRef.current = left;
        }
    }

    return (
        <SwipableWrapper ref={wrapperRef}>
            <SwipeBackground ref={backgroundRef}>
                <span>Delete</span>
            </SwipeBackground>
            <ListItem ref={listElementRef}
                onMouseDown={onDragStartMouse}
                onTouchStart={onDragStartTouch}>
                {props.children}
            </ListItem>
        </SwipableWrapper>
    )
}
export default SwipeableItem;
