import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTooltip } from './Tooltip';

export default function OngoingStatusList({ statuses }) {
    return (
        <>
            {statuses.map(status => (
                <OngoingStatus key={status.from} status={status} />
            ))}
        </>
    );
}

function OngoingStatus({ status }) {
    const ref = useRef();
    const { tooltipProps } = useTooltip(status.effect.description, ref);
    return (
        <StatusWrapper type={status.type} ref={ref} {...tooltipProps}>
            <i className={`${status.effect.icon} ra ra-lg ra-fw`} />
        </StatusWrapper>
    );
}

const StatusWrapper = styled.div`
    --color: ${props => (props.type === 'POSITIVE' ? 'lime' : 'red')};

    color: var(--color);
    border: solid 2px var(--color);
    margin: 0.25em;
`;
