import { Action } from './actions';

const initialState = {
    isWaiting: false,
    menuOpen: false,
    gameOver: false,
    gameResult: 0,
    turn: 0,
    tttBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case Action.StartWaiting:
            return {
                ...state,
                isWaiting: true,
            };
        case Action.StopWaiting:
            return {
                ...state,
                isWaiting: false,
            };
        case Action.OpenMenu:
            return {
                ...state,
                menuOpen: true,
            };
        case Action.CloseMenu:
            return {
                ...state,
                menuOpen: false,
            };
        case Action.TTTSetTurn:
            return {
                ...state,
                turn: action.payloadTurn,
                board: action.payloadBoard,
            };
        case Action.TTTUpdateResult:
            return {
                ...state,
                gameOver: action.payloadGameOver,
                gameResult: action.payloadGameResult,
            };
        case Action.TTTResetGame:
            return {
                ...state,
                tttBoard: action.payloadBoard,
                turn: action.payloadTurn,
                gameOver: action.payloadGameOver,
                gameResult: action.payloadGameResult,
            };
        default:
            return state;
    }
}

export default reducer;