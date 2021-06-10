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
    activePiece: { piece: '', position: { row: -1, col: -1 } },
    lastMove: { piece: '', from: { row: -1, col: -1 }, to: { row: -1, col: -1 } },
    canCastle: true,
    availableMoves: new Map(),
    leftWhiteRookAvailable: true,
    leftBlackRookAvailable: true,
    rightWhiteRookAvailable: true,
    rightBlackRookAvailable: true,
    whiteKingAvailable: true,
    blackKingAvailable: true,
    promotionActive: false,
    whiteKingPosition: { row: 7, col: 4 },
    blackKingPosition: { row: 0, col: 4 },
    allAvailableMoves: new Map(),
    allAvailableMovesGenerated: false,
    lastThreeMoveNodeCount: [100000, 100000, 100000],
    increasedLevel: false,
    /*************************RasterCaster ********************/
    rasterCasterSelection: 0,
    rasterCasterDisclaimerActive: true,
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
        case Action.SetWhiteKingAvailable:
            return {
                ...state,
                whiteKingAvailable: action.payload,
            };
        case Action.SetBlackKingAvailable:
            return {
                ...state,
                blackKingAvailable: action.payload,
            };
        case Action.SetLeftWhiteRookAvailable:
            return {
                ...state,
                leftWhiteRookAvailable: action.payload,
            };
        case Action.SetLeftBlackRookAvailable:
            return {
                ...state,
                leftBlackRookAvailable: action.payload,
            };
        case Action.SetRightWhiteRookAvailable:
            return {
                ...state,
                rightWhiteRookAvailable: action.payload,
            };
        case Action.SetRightBlackRookAvailable:
            return {
                ...state,
                rightBlackRookAvailable: action.payload,
            };
        case Action.SetPromotionActive:
            return {
                ...state,
                promotionActive: action.payload,
            };
        case Action.SetWhiteKingPosition:
            return {
                ...state,
                whiteKingPosition: action.payload,
            };
        case Action.SetBlackKingPosition:
            return {
                ...state,
                blackKingPosition: action.payload,
            };
        case Action.SetAllAvailableMoves:
            return {
                ...state,
                allAvailableMoves: action.payload,
            };
        case Action.SetAllAvailableMovesGenerated:
            return {
                ...state,
                allAvailableMovesGenerated: action.payload,
            };
        case Action.SetLastThreeMoveNodeCount:
            return {
                ...state,
                lastThreeMoveNodeCount: action.payload,
            };
        case Action.SetIncreasedChessLevel:
            return {
                ...state,
                increasedLevel: action.payload,
            };
        /**********************************Raster Caster ******************************/
        case Action.SetRasterCasterSelection:
            return {
                ...state,
                rasterCasterSelection: action.payload,
            };
        case Action.SetRasterCasterCustomFunction:
            return {
                ...state,
                rasterCasterCustomFunction: action.payload,
            };
        case Action.SetRasterCasterExample1Function:
            return {
                ...state,
                rasterCasterExample1Function: action.payload,
            };
        case Action.SetRasterCasterDisclaimerActive:
            return {
                ...state,
                rasterCasterDisclaimerActive: action.payload,
            };
        default:
            return state;
    }
}

export default reducer;