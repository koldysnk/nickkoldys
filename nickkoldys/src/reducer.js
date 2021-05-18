import { Action } from './actions';

const initialState = {
    isWaiting: false,
    menuOpen: false,
    gameOver: false,
    gameResult: 0,
    playerFirst: true,
    turn: 0,
    tttBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    dictionary: [
        /*{id:1, word:'a', length:1, weight:1, difficulty:0, won:0, played:0},
        {id:2, word:'aa', length:2, weight:1, difficulty:0, won:0, played:0},*/
    ],
    currPage:0,
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
        /********************************************Tic Tac Toe **************************/
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
        case Action.TTTSetPlayerFirst:
            return {
                ...state,
                playerFirst: action.payloadPlayerFirst,
            };
        /****************************************Hangman **************************************/
        case Action.LoadDictionary:
            return {
                ...state,
                dictionary: action.payload,
            };
        case Action.PageLeft:
            return {
                ...state,
                currPage: action.payload,
            };
        case Action.PageRight:
            return {
                ...state,
                currPage: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;