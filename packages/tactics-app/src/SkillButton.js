import React, { useRef } from 'react';
import { useTooltip } from './Tooltip';
import styled from 'styled-components';

const SkillTooltip = ({ skill }) => (
    <div>
        <TooltipTitle>{skill.name}</TooltipTitle>
        <div>{skill.description}</div>
    </div>
);

export default function SkillButton({ skill }) {
    const ref = useRef(null);
    const { tooltipProps } = useTooltip(
        <SkillTooltip skill={skill} />,
        ref,
        'right'
    );
    return (
        <Button
            ref={ref}
            type="button"
            img={skill.imageUrl}
            {...tooltipProps}
        />
    );
}

const Button = styled.button`
    --size: 3em;
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
    background: url(${props => props.img}) center center/cover;
    box-shadow: 0 0.25em 4px 0 rgba(0, 0, 0, 0.5);
    transition: all 0.2s;
    cursor: pointer;
    &:hover,
    &:focus {
        filter: brightness(125%) contrast(130%);
        box-shadow: none;
    }
`;

const TooltipTitle = styled.div`
    padding-bottom: 0.25em;
    border-bottom: solid 1px white;
    margin-bottom: 0.5em;
    font-size: 1.15em;
`;
