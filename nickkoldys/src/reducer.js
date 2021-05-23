import { Action } from './actions';

const initialState = {
    isWaiting: false,
    error: false,
    errorMessage: '',
    menuOpen: false,
    gameOver: false,
    gameResult: 0,
    playerFirst: true,
    turn: 0,
    tttBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
    /***********************************************Hangman *****************************************/
    dictionary: [
        /*{id:1, word:'a', length:1, weight:1, difficulty:0, won:0, played:0},
        {id:2, word:'aa', length:2, weight:1, difficulty:0, won:0, played:0},*/
    ],
    currPage: 0,
    hangmanGameStarted: false,
    numLetters: 1,
    mostRecentLetter: '',
    wordToGuess: [],
    numberOfTries: 10,
    guessedLetters: [],
    guessedCorrect: false,
    wordUpdated: false,
    randWord: '',
    /*********************************************Chess ***************************************/
    chessBoard: [['br', 'bkn', 'bb', 'bq', 'bk', 'bb', 'bkn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wkn', 'wb', 'wq', 'wk', 'wb', 'wkn', 'wr']],
    activePiece: { type: '', position: { row: -1, col: -1 } },
    lastMove: { piece: '', startPosition: { row: -1, col: -1 }, endPosition: { row: -1, col: -1 }, enPassant: false },
    canCastle: true,
    availableMoves: new Map(),
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
        case Action.SetErrorMessage:
            return {
                ...state,
                errorMessage: action.payload,
            };
        case Action.SetTurn:
            return {
                ...state,
                turn: action.payload,
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
        case Action.SetWordLength:
            return {
                ...state,
                numLetters: action.payload,
            };
        case Action.SetHangmanGameStarted:
            return {
                ...state,
                hangmanGameStarted: action.payload,
            };
        case Action.SetMostRecentLetter:
            return {
                ...state,
                mostRecentLetter: action.payload,
            };
        case Action.UpdateGuessedLetters:
            return {
                ...state,
                guessedLetters: action.payload,
            };
        case Action.UpdateNumberOfTries:
            return {
                ...state,
                numberOfTries: action.payload,
            };
        case Action.SetGuessedCorrect:
            return {
                ...state,
                guessedCorrect: action.payload,
            };
        case Action.SetWordToGuess:
            return {
                ...state,
                wordToGuess: action.payload,
            };
        case Action.SetWordUpdated:
            return {
                ...state,
                wordUpdated: action.payload,
            };
        case Action.SetRandWord:
            return {
                ...state,
                randWord: action.payload,
            };
        /*******************************************Chess ********************************/
        case Action.ChessResetActivePiece:
            return {
                ...state,
                activePiece: action.payload,
            };
        case Action.ChessResetActivePiece:
            return {
                ...state,
                activePiece: action.payload,
            };
        case Action.ChessSetAvailableMoves:
            return {
                ...state,
                availableMoves: action.payload,
            };
        case Action.ChessSetBoard:
            return {
                ...state,
                chessBoard: action.payload,
            };
        case Action.ChessSetLastMove:
            return {
                ...state,
                lastMove: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;