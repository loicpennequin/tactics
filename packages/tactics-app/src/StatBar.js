import styled from 'styled-components';
import { getPercentage } from './utils';

const StatBar = styled.div.attrs(props => ({
    style: {
        '--percentage': getPercentage(props.values) + '%'
    }
}))`
    --color: ${props => props.color};

    position: relative;
    width: 100%;
    margin-bottom: 0.5em;
    color: white;
    font-size: 8px;
    padding: 0.25em;
    padding-left: 0.5em;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.2));
    z-index: 1;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: var(--percentage);
        height: 100%;
        background: var(--color);
        transition: all 0.5s;
        mix-blend-mode: color;
        transform: skewX(-30deg) translateX(-5px);
    }
`;

export default StatBar;
