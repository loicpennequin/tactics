import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import 'rpg-awesome/css/rpg-awesome.css';
import HeroCard from './HeroCard';
import Tooltip, { TooltipProvider, useTooltip } from './Tooltip';
import data from './data';
import battleBg from './assets/backgrounds/battle-background.jpg';
import InfoPanel from './InfoPanel';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    background: 
        url(${battleBg}), 
        linear-gradient(hsl(200,70%,75%), hsl(35, 60%, 30%));
    background-blend-mode: soft-light;
    font-family: Helvetica;
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  }
`;

function updateATB(heroes, onActivate = hero => {}) {
    return heroes.map(hero => {
        let newAtbValue = hero.atb + hero.speed / 100;

        if (newAtbValue > 1) {
            onActivate(hero);
        }

        return { ...hero, atb: newAtbValue };
    });
}

const Clock = ({ turnCount, onNext }) => {
    const ref = useRef();
    const { tooltipProps } = useTooltip(`Turn ${turnCount}`, ref);
    return (
        <ClockIcon onClick={onNext} ref={ref} {...tooltipProps}>
            <i className="ra ra-clockwork ra-4x" />
        </ClockIcon>
    );
};

export default function App() {
    const ticks = useRef(0);
    const [turnCount, setTurnCount] = useState(1);

    const [state, setState] = useState({
        ownTeam: data.ownTeam.map(h => ({
            ...h,
            atb: (Math.random() * 25) / 100
        })),
        enemyTeam: data.enemyTeam.map(h => ({
            ...h,
            atb: (Math.random() * 25) / 100
        }))
    });

    const [selectedHero, setSelectedHero] = useState(null);

    const order = useMemo(() => {
        const order = [];
        let heroes = [
            ...state.ownTeam.map(x => ({ ...x })),
            ...state.enemyTeam.map(x => ({ ...x }))
        ].sort((a, b) => b.atb - a.atb);

        const isOrderFull = () => order.length > 10;
        while (!isOrderFull()) {
            heroes = updateATB(heroes, hero => {
                if (!isOrderFull()) {
                    order.push(hero);
                }
            });
            heroes.forEach(hero => {
                if (hero.atb > 1) {
                    hero.atb -= 1;
                }
            });
        }

        return order;
    }, [state]);

    const tick = useCallback(state => {
        ticks.current++;
        if (ticks.current % 20 === 0) {
            setTurnCount(t => t + 1);
        }
        let heroCanAct = false;

        const newState = {
            ownTeam: updateATB(state.ownTeam, () => {
                heroCanAct = true;
            }),
            enemyTeam: updateATB(state.enemyTeam, () => {
                heroCanAct = true;
            })
        };

        setState(newState);
        if (!heroCanAct) {
            tick(newState);
        }
    }, []);

    const next = useCallback(() => {
        const isActiveHero = hero => order[0].name === hero.name;

        const newState = {
            ownTeam: state.ownTeam.map(h =>
                isActiveHero(h) ? { ...h, atb: h.atb - 1 } : h
            ),
            enemyTeam: state.enemyTeam.map(h =>
                isActiveHero(h) ? { ...h, atb: h.atb - 1 } : h
            )
        };
        tick(newState);
    }, [order, state, tick]);

    useEffect(() => {
        if (order[0].atb < 1) {
            tick(state);
        }
    }, [order, state, tick]);

    const selectHero = useCallback((e, hero) => {
        e.stopPropagation();
        setSelectedHero(hero);
    }, []);

    const unSelectHero = useCallback(() => {
        setSelectedHero(null);
    }, []);

    return (
        <TooltipProvider>
            <GlobalStyle />
            <ScreenWrapper>
                <InteractionZone onClick={unSelectHero}>
                    <InfoPanelWrapper>
                        <InfoPanel selectedHero={selectedHero} />
                    </InfoPanelWrapper>
                    <TeamsWrapper>
                        <Tooltip text="I am a tooltip" />
                        <Column>
                            {state.ownTeam.map(hero => (
                                <CardWrapper key={hero.name}>
                                    <HeroCard
                                        onClick={e => selectHero(e, hero)}
                                        hero={hero}
                                        side="LEFT"
                                        isActive={order[0].name === hero.name}
                                    />
                                </CardWrapper>
                            ))}
                        </Column>
                        <Column>
                            {state.enemyTeam.map(hero => (
                                <CardWrapper key={hero.name}>
                                    <HeroCard
                                        onClick={e => selectHero(e, hero)}
                                        hero={hero}
                                        side="RIGHT"
                                        isActive={order[0].name === hero.name}
                                    />
                                </CardWrapper>
                            ))}
                        </Column>
                    </TeamsWrapper>
                </InteractionZone>
                <OrderWrapper>
                    <Clock onNext={next} turnCount={turnCount} />
                    {order.map((hero, i) => (
                        <OrderItem key={i} hero={hero} isCurrent={i === 0} />
                    ))}
                </OrderWrapper>
            </ScreenWrapper>
        </TooltipProvider>
    );
}

const ScreenWrapper = styled.main`
    height: 100vh;
    display: grid;
    grid-template-rows: 4fr 1fr;
    outline: solid red 2px;
`;

const InteractionZone = styled.div`
    display: flex;
`;

const InfoPanelWrapper = styled.div`
    width: 25%;
`;
const TeamsWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
`;

const CardWrapper = styled.div`
    &:not(:last-child) {
        margin-bottom: 1.5em;
    }
`;

const Column = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const OrderWrapper = styled.ul`
    border-top: solid 1px white;
    display: flex;
    list-style: none;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: relative;
    margin: 0;
`;

const OrderItem = styled.li`
    background: url('${props => props.hero.splashUrl}') center center / cover;
    width: ${props => (props.isCurrent ? '7vw' : '5vw')};
    height: ${props => (props.isCurrent ? '18vh' : '13vh')};
    align-self: flex-end;
    margin: .5em;
    border: solid 1px white;
`;

const ClockIcon = styled.button`
    position: absolute;
    left: 0;
    border: none;
    background: transparent;
    color: white;
    cursor: pointer;
    margin-left: 3em;
    &:hover,
    &:focus {
        outline: none;
    }
    &:hover i {
        text-shadow: 0 0 5px cyan;
    }
`;
