import React from 'react';
import styled from 'styled-components';

export default function InfoPanel({ selectedHero }) {
    return <Wrapper hero={selectedHero} isVisible={!!selectedHero}></Wrapper>;
}

const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    background: rgba(0,0,0,0.6);
    height: 100%;
    opacity: ${props => (props.isVisible ? 1 : 0)};
    transform: ${props => (props.isVisible ? 'none' : 'translateX(-100%)')};
    transition: all 0.3s;
    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: url('${props =>
            props.hero &&
            props.hero.splashUrl}') center center / cover, rgba(0,0,0,0.3);
        opacity: 0.3;
    }
`;
