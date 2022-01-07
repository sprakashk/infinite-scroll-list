import React, { Component } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;    
`;

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }    

    componentDidCatch(error, errorInfo) { }

    render() {
        if (this.state.hasError) {
            return <ErrorContainer><p>Something went wrong. We are looking into it.</p></ErrorContainer>;
        }
        return this.props.children;
    }
}
export default ErrorBoundary;