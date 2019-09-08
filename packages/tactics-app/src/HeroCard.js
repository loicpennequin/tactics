import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { scaleValue, clamp, getPercentage } from './utils';
import StatBar from './StatBar';
import OngoingStatusList from './OngoingStatusList';

// import SkillButton from './SkillButton';
const manaColor = 'hsl(220, 85%, 60%)';

function HeroCard({ hero, side, isActive, onClick }) {
    const HPBarColor = useMemo(() => {
        const percentage = getPercentage([hero.baseStats.hp, hero.hp]);
        const hue = clamp(scaleValue(percentage, 100, 150) - 30, 0, 150);
        return `hsl(${hue},85%,60%)`;
    }, [hero]);

    return (
        <>
            <Wrapper
                hero={hero}
                side={side}
                active={isActive}
                onClick={onClick}
            >
                <OngoingStatusesWrapper side={side}>
                    <OngoingStatusList statuses={hero.ongoingStatus} />
                </OngoingStatusesWrapper>
                <Header>
                    <Portrait src={hero.portraitUrl} />
                    <div>
                        <Name>{hero.name}</Name>
                        <StatBar
                            color={HPBarColor}
                            values={[hero.baseStats.hp, hero.hp]}
                        >
                            HP
                        </StatBar>
                        <StatBar
                            color={manaColor}
                            values={[hero.baseStats.mp, hero.mp]}
                            title="MP"
                        >
                            MP
                        </StatBar>
                    </div>
                </Header>
                {/* <SkillsWrapper>
                    {hero.skills.map(skill => (
                        <SkillButton key={skill.name} skill={skill} />
                    ))}
                </SkillsWrapper> */}
            </Wrapper>
            <ATBWrapper>
                <StatBar color="red" values={[1, hero.atb]}></StatBar>
            </ATBWrapper>
        </>
    );
}

// styles

const OngoingStatusesWrapper = styled.div`
    position: absolute;
    left: ${props => (props.side === 'LEFT' ? 0 : '100%')};
    top: 0;
    ${props => props.side === 'LEFT' && 'transform: translateX(-100%);'}
`;

const ATBWrapper = styled.div`
    width: 20em;
`;
const Wrapper = styled.div`
    position: relative;
    background: hsla(0, 0%, 100%, ${props => (props.active ? '1' : '0.5')});
    padding: 1em;
    width: 20em;
    border: solid 3px rgba(0, 0, 0, 0);
    ${props => props.side === 'LEFT' && 'border-top-right-radius: 1em;'}
    ${props =>
        props.side === 'RIGHT' &&
        'border-top-LEFT-radius: 1em;'}
    box-shadow: -0.5em 0.5em 5px 0 hsla(0, 0%, 0%, 0.3);
`;

const Header = styled.header`
    display: flex;
    margin-bottom: 0.5em;
    & > div {
        flex-grow: 1;
    }
`;

const Portrait = styled.img`
    --size: 4em;
    border-radius: 50%;
    object-fit: cover;
    width: var(--size);
    height: var(--size);
    margin-right: 0.75em;
    box-shadow: 0 0 5px 0 black;
`;

const Name = styled.h3`
    margin: 0;
`;

// const SkillsWrapper = styled.div`
//     display: flex;
//     justify-content: space-around;
//     border-top: solid 1px rgba(0, 0, 0, 0.15);
//     padding-top: 0.5em;
// `;

export default memo(HeroCard);
