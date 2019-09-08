import React, {
    useReducer,
    useCallback,
    createContext,
    useContext
} from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import { toPixels } from './utils';

const tooltipRoot = document.getElementById('tooltip-root');

// toottip API
const initialState = {
    text: 'I am a tooltip',
    position: 'top',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    visible: false
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_VISIBLE':
            return { ...state, visible: action.visible };
        case 'SET_TEXT':
            return { ...state, text: action.text };
        case 'SET_POSITION':
            return {
                ...state,
                top: action.top,
                left: action.left,
                bottom: action.bottom,
                right: action.right,
                position: action.position
            };
        default:
            return state;
    }
};

// context

const tooltipContext = createContext(null);

export const TooltipProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <tooltipContext.Provider value={{ state, dispatch }}>
            {children}
        </tooltipContext.Provider>
    );
};
// Tooltip component

export default function Tooltip() {
    const {
        state: { left, top, right, bottom, text, visible, position }
    } = useContext(tooltipContext);
    return ReactDOM.createPortal(
        <Wrapper
            position={{ top, left, right, bottom, placement: position }}
            visible={visible}
        >
            {text}
        </Wrapper>,
        tooltipRoot
    );
}

// useTooltip Hook
export function useTooltip(text, ref, position = 'top') {
    const { dispatch } = useContext(tooltipContext);

    const toggle = useCallback(
        bool => {
            const el = ref.current;
            if (el) {
                let { left, right, top, bottom } = el.getBoundingClientRect();
                dispatch({
                    type: 'SET_POSITION',
                    top: top + window.scrollY,
                    bottom: bottom + window.scrollY,
                    left: left + window.scrollX,
                    right: right + window.scrollX,
                    position
                });
                dispatch({ type: 'SET_TEXT', text });
            }
            dispatch({ type: 'SET_VISIBLE', visible: bool });
        },
        [dispatch, text, ref, position]
    );

    return {
        toggle,
        tooltipProps: {
            onMouseEnter: () => {
                toggle(true);
            },
            onMouseLeave: () => toggle(false)
        }
    };
}

// utility functions
function getSpecificStyles(pos) {
    const common = `
    &::after {
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      border: solid 10px transparent;
  `;
    switch (pos.placement) {
        case 'left':
            return css`
        top: ${toPixels(pos.top + (pos.bottom - pos.top) / 2)};
        right: ${toPixels(window.innerWidth - pos.left)};
        transform: translateY(-50%) translateX(-10px);
        ${common}
          border-left-color: hsla(0, 0%, 0%, 0.75);
          top: 50%;
          left: 100%;
          transform: translateY(-50%);
        }
      `;
        case 'right':
            return css`
        top: ${toPixels(pos.top + (pos.bottom - pos.top) / 2)};
        left: ${toPixels(pos.right)};
        transform: translateY(-50%);
        transform: translateY(-50%) translateX(10px);
        ${common}
          border-right-color: hsla(0, 0%, 0%, 0.75);
          top: 50%;
          left: 0;
          transform: translateY(-50%) translateX(-100%);
        }
      `;
        case 'bottom':
            return css`
        top: ${toPixels(pos.bottom)};
        left: ${toPixels(pos.left + (pos.right - pos.left) / 2)};
        transform: translateX(-50%) translateY(10px);
        ${common}
          border-bottom-color: hsla(0, 0%, 0%, 0.75);
          left: 50%;
          top: 0;
          transform: translateX(-50%) translateY(-100%);
        }
      `;
        case 'top':
            return css`
        bottom: ${toPixels(window.innerHeight - pos.top)};
        left: ${toPixels(pos.left + (pos.right - pos.left) / 2)};
        transform: translateX(-50%) translateY(-10px);
        ${common}
          border-top-color: hsla(0, 0%, 0%, 0.75);
          left: 50%;
          top: 100%
          transform: translateX(-50%);
        }
      `;
        default:
    }
}

// styles

const Wrapper = styled.div`
    z-index: 999;
    font-size: 12px;
    pointer-events: none;
    position: absolute;
    max-width: 200px;
    ${props => getSpecificStyles(props.position)}
    padding: 0.5em;
    background-color: hsla(0, 0%, 0%, 0.75);
    color: white;
    ${props => !props.visible && 'display: none'};
`;
