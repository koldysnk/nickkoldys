export const Action = Object.freeze({
    StartWaiting: 'StartWaiting',
    StopWaiting: 'StopWaiting',
    OpenMenu: 'OpenMenu',
    CloseMenu: 'CloseMenu',
    SetErrorMessage: 'SetErrorMessage',
    SetTurn: 'SetTurn',
    //Tic Tac Toe
    TTTSetTurn: 'TTTSetTurn',
    TTTUpdateResult: 'TTTUpdateResult',
    TTTResetGame: 'TTTResetGame',
    TTTSetPlayerFirst: 'TTTSetPlayerFirst',
    //Hangman
    LoadDictionary: 'LoadDictionary',
    PageRight: 'PageRight',
    PageLeft: "PageLeft",
    SetWordLength: 'SetWordLength',
    SetHangmanGameStarted: 'SetHangmanGameStarted',
    SetMostRecentLetter: 'SetMostRecentLetter',
    UpdateGuessedLetters: 'UpdateGuessedLetters',
    UpdateNumberOfTries: 'UpdateNumberOfTries',
    SetGuessedCorrect: 'SetGuessedCorrect',
    SetWordToGuess: 'SetWordToGuess',
    SetWordUpdated: 'SetWordUpdated',
    SetRandWord: 'SetRandWord',
    //Chess
    ChessResetActivePiece: 'ChessResetActivePiece',
    ChessSetActivePiece: 'ChessSetActivePiece',
    ChessSetAvailableMoves: 'ChessSetAvailableMoves',
    ChessSetBoard: 'ChessSetBoard',
    ChessSetLastMove: 'ChessSetLastMove',
    SetWhiteKingAvailable: 'SetWhiteKingAvailable',
    SetBlackKingAvailable: 'SetBlackKingAvailable',
    SetLeftWhiteRookAvailable: 'SetLeftWhiteRookAvailable',
    SetLeftBlackRookAvailable: 'SetLeftBlackRookAvailable',
    SetRightWhiteRookAvailable: 'SetRightWhiteRookAvailable',
    SetRightBlackRookAvailable: 'SetRightBlackRookAvailable',
    SetPromotionActive: 'SetPromotionActive',
    SetWhiteKingPosition: 'SetWhiteKingPosition',
    SetBlackKingPosition: 'SetBlackKingPosition',
    SetAllAvailableMoves: 'SetAllAvailableMoves',
    SetAllAvailableMovesGenerated: 'SetAllAvailableMovesGenerated',
    //RasterCaster
    SetRasterCasterSelection:'SetRasterCasterSelection',
    SetRasterCasterCustomFunction:'SetRasterCasterCustomFunction',
    SetRasterCasterExample1Function:'SetRasterCasterExample1Function',
    SetRasterCasterDisclaimerActive:'SetRasterCasterDisclaimerActive',
});

const host = 'https://react-man-server.react-man.me:8442';
const wordLimit = 100;
const numWords = 370099;
const maxPage = Math.ceil(numWords / wordLimit) - 1;

function checkForErrors(response) {
    if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

export function startWaiting() {
    return {
        type: Action.StartWaiting,
    }
}

export function stopWaiting() {
    return {
        type: Action.StopWaiting,
    }
}

export function closeMenu() {
    return {
        type: Action.CloseMenu,
        payload: false,
    }
}

export function openMenu() {
    return {
        type: Action.OpenMenu,
        payload: false,
    }
}

export function setErrorMessage(message) {
    return {
        type: Action.SetErrorMessage,
        payload: message,
    }
}

export function setTurn(turn) {
    return {
        type: Action.SetTurn,
        payload: turn,
    }
}

/*****************************************Tic Tac Toe **************************************/

export function tttSetTurn(board, turn) {
    return {
        type: Action.TTTSetTurn,
        payloadBoard: board,
        payloadTurn: turn,
    }
}

export function tttUpdateResult(gameOver, result) {
    return {
        type: Action.TTTUpdateResult,
        payloadGameOver: gameOver,
        payloadGameResult: result,
    }
}

export function tttResetGame() {
    return {
        type: Action.TTTResetGame,
        payloadBoard: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        payloadTurn: 0,
        payloadResult: 0,
        payloadGameOver: false,
    }
}

export function tttSetPlayerFirst(playerFirst) {
    return {
        type: Action.TTTSetPlayerFirst,
        payloadPlayerFirst: playerFirst,
    }
}

export function tttSetPlayerFirstAndReset(playerFirst) {
    return dispatch => {
        dispatch(startWaiting())
        dispatch(tttResetGame())
        dispatch(tttSetPlayerFirst(playerFirst))
        dispatch(stopWaiting())
    }
}

/*
0,1,2
3,4,5
6,7,8
*/
const TTTLines = [
    [[1, 2], [3, 6], [4, 8]],
    [[0, 2], [4, 7]],
    [[0, 1], [4, 6], [5, 8]],
    [[0, 6], [4, 5]],
    [[0, 8], [1, 7], [2, 6], [3, 5]],
    [[2, 8], [3, 4]],
    [[0, 3], [2, 4], [7, 8]],
    [[1, 4], [6, 8]],
    [[0, 4], [2, 5], [6, 7]],
];

function tttCheckWinNoPush(pos, board) {
    let winFound = false;
    TTTLines[pos].forEach(line => {
        // console.log('checkwin',`${pos}:${board[pos]}, ${line[0]}:${board[line[0]]}, ${line[1]}:${board[line[1]]}`)
        if (!winFound && (board[pos] == board[line[0]] && board[pos] == board[line[1]])) {
            winFound = true;
        }
    });
    return winFound;
}

export function tttCheckWin(pos, board, turn) {
    return dispatch => {
        const winFound = tttCheckWinNoPush(pos, board);

        if (winFound) {
            dispatch(tttUpdateResult(true, ((turn - 1) % 2) + 1))
        } else if (turn >= 9) {
            dispatch(tttUpdateResult(true, 0))
        } else {
            dispatch(tttUpdateResult(false, 0))
        }
    }
}

export function tttTakeTurn(pos, board, turn) {
    return dispatch => {
        dispatch(startWaiting());
        board[pos] = (turn % 2) + 1;
        turn += 1;
        dispatch(tttCheckWin(pos, board, turn));
        dispatch(tttSetTurn(board, turn));
        dispatch(stopWaiting());
    }
}

export function tttAITurn(board, turn) {
    return dispatch => {
        dispatch(startWaiting());
        dispatch(tttStartMinMax(board, turn));
    }
}

export function tttStartMinMax(board, turn) {
    return dispatch => {
        let { maxPos, maxScore } = tttMaxAnalysis(board, turn)
        dispatch(tttTakeTurn(maxPos, board, turn));
        dispatch(stopWaiting());
    }
}

function tttMaxAnalysis(board, turn) {
    const playerTurn = (turn % 2) + 1;
    const availablePositions = getTTTAvailablePositions(board);
    let maxPos = [];
    let maxScore = -2

    for (let i = 0; i < availablePositions.length; i++) {
        let pos = availablePositions[i]
        board[pos] = playerTurn;
        let win = tttCheckWinNoPush(pos, board)
        if (win) {
            if(maxScore == 1){
                maxPos.push(pos)
            }else{
                maxScore = 1
                maxPos = [pos]
            }
        } else{
            if (turn == 8) {
                if (0 == maxScore) {
                    maxPos.push(pos)
                }else if(0>maxScore){
                    maxPos = [pos]
                    maxScore = 0
                }
            } else {
                let { minPos, minScore } = tttMinAnalysis(board, turn + 1)
                if (minScore > maxScore) {
                    maxScore = minScore;
                    maxPos = [pos];
                }else if(minScore==maxScore){
                    maxPos.push(pos)
                }
            }
        } 
        board[pos] = 0;
    }
    maxPos = maxPos[Math.floor(Math.random() * maxPos.length)]
    return { maxPos, maxScore };
}

function tttMinAnalysis(board, turn) {
    const playerTurn = (turn % 2) + 1;
    const availablePositions = getTTTAvailablePositions(board);
    let minPos = 9;
    let minScore = 2

    for (let i = 0; i < availablePositions.length; i++) {
        let pos = availablePositions[i]
        board[pos] = playerTurn;
        let win = tttCheckWinNoPush(pos, board)
        if (win) {
            board[pos] = 0;
            minPos = pos
            minScore = -1
            return { minPos, minScore };
        } else if (turn >= 8) {
            if (0 <= minScore) {
                minScore = 0;
                minPos = pos;
            }
        } else {
            let { maxPos, maxScore } = tttMaxAnalysis(board, turn + 1)
            if (maxScore <= minScore) {
                minScore = maxScore;
                minPos = pos;
            }
        }
        board[pos] = 0;
    }

    return { minPos, minScore };
}

export function getTTTAvailablePositions(board) {
    let availablePositions = []
    board.forEach((val, i) => {
        if (val == 0) {
            availablePositions.push(i)
        }
    });
    return availablePositions;
}

export function getTTTRandomMove(availablePositions) {
    const random = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[random];
}

/***********************************************************************Hangman ***************************/

export function loadDictionary(dictionary) {
    return {
        type: Action.LoadDictionary,
        payload: dictionary,
    };
}

export function pageLeft(currPage) {
    if (currPage > 0) {
        return {
            type: Action.PageLeft,
            payload: currPage - 1,
        }
    } else {
        return {
            type: Action.PageLeft,
            payload: maxPage,
        }

    }
}

export function pageRight(currPage) {
    if (currPage < maxPage) {
        return {
            type: Action.PageRight,
            payload: currPage + 1,
        }
    } else {
        return {
            type: Action.PageRight,
            payload: 0,
        }

    }
}

export function setWordLength(length) {
    return {
        type: Action.SetWordLength,
        payload: length,
    }
}

export function setHangmanGameStarted(started) {
    return {
        type: Action.SetHangmanGameStarted,
        payload: started,
    }
}

export function setMostRecentLetter(letter) {
    return {
        type: Action.SetMostRecentLetter,
        payload: letter,
    };
}

export function updateGuessedLetters(letter) {
    return {
        type: Action.UpdateGuessedLetters,
        payload: letter,
    }
}

export function updateNumberOfTries(tries) {
    return {
        type: Action.UpdateNumberOfTries,
        payload: tries,
    }
}

export function setGuessedCorrect(toF) {
    return {
        type: Action.SetGuessedCorrect,
        payload: toF,
    }
}

export function setWordToGuess(arr) {
    return {
        type: Action.SetWordToGuess,
        payload: arr,
    }
}

export function setWordUpdated(updated) {
    return {
        type: Action.SetWordUpdated,
        payload: updated,
    }
}

export function setRandWord(word) {
    return {
        type: Action.SetRandWord,
        payload: word,
    }
}

export function startHangman(length) {
    return dispatch => {
        dispatch(setWordLength(length))
        dispatch(setHangmanGameStarted(true))
    }
}

export function loadAllWords(offset) {
    return dispatch => {
        fetch(`${host}/allwords/${offset * wordLimit}/${wordLimit}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(loadDictionary(data.dictionary));
                }
            })
            .catch(e => console.error(e));
    };
}

export function makeGuess(length, regex, guessed) {
    return dispatch => {
        dispatch(startWaiting());
        fetch(`${host}/guessLetter/${length}/${regex}/${guessed}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(setMostRecentLetter(data.guess));
                    dispatch(stopWaiting());
                }
            })
            .catch(e => console.error(e));
    };
}

export function wordLost(word) {
    return dispatch => {
        dispatch(startWaiting())
        fetch(`${host}/wordLost/${word}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(setWordUpdated(true));
                } else {
                    dispatch(tttUpdateResult(3));
                }

                dispatch(stopWaiting());
            })
            .catch(e => console.error(e));
    };
}

export function loadRandWord(length, difficulty) {
    return dispatch => {
        dispatch(startWaiting())
        fetch(`${host}/randWord/${length}/${difficulty}`)
            .then(checkForErrors)
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    dispatch(setRandWord(data.word));
                    dispatch(stopWaiting())
                }
            })
            .catch(e => console.error(e));
    };
}

/********************************************************Chess *********************************/

export function chessResetActivePiece() {
    return {
        type: Action.ChessResetActivePiece,
        payload: { type: '', position: { row: -1, col: -1 } },
    }
}

export function chessSetActivePiece(piece) {
    return {
        type: Action.ChessResetActivePiece,
        payload: piece,
    }
}

export function chessSetAvailableMoves(moves) {
    return {
        type: Action.ChessSetAvailableMoves,
        payload: moves,
    }
}

export function chessSetBoard(board) {
    return {
        type: Action.ChessSetBoard,
        payload: board,
    }
}

export function chessSetLastMove(move) {
    return {
        type: Action.ChessSetLastMove,
        payload: move,
    }
}

export function setWhiteKingAvailable(bool) {
    return {
        type: Action.SetWhiteKingAvailable,
        payload: bool,
    }
}

export function setBlackKingAvailable(bool) {
    return {
        type: Action.SetBlackKingAvailable,
        payload: bool,
    }
}

export function setLeftWhiteRookAvailable(bool) {
    return {
        type: Action.SetLeftWhiteRookAvailable,
        payload: bool,
    }
}

export function setLeftBlackRookAvailable(bool) {
    return {
        type: Action.SetLeftBlackRookAvailable,
        payload: bool,
    }
}

export function setRightWhiteRookAvailable(bool) {
    return {
        type: Action.SetRightWhiteRookAvailable,
        payload: bool,
    }
}

export function setRightBlackRookAvailable(bool) {
    return {
        type: Action.SetRightBlackRookAvailable,
        payload: bool,
    }
}

export function setPromotionActive(bool) {
    return {
        type: Action.SetPromotionActive,
        payload: bool,
    }
}

export function setWhiteKingPosition(position) {
    return {
        type: Action.SetWhiteKingPosition,
        payload: position,
    }
}

export function setBlackKingPosition(position) {
    return {
        type: Action.SetBlackKingPosition,
        payload: position,
    }
}

export function setAllAvailableMoves(moves) {
    return {
        type: Action.SetAllAvailableMoves,
        payload: moves,
    }
}

export function setAllAvailableMovesGenerated(bool) {
    return {
        type: Action.SetAllAvailableMovesGenerated,
        payload: bool,
    }
}

export function chessMakePieceActive(availableMoves, row, col, piece) {
    return dispatch => {
        //let availableMoves = getAvailableChessMoves(board, row, col, piece, lastMove, king, leftRook, rightRook, kingPosition)
        dispatch(chessSetActivePiece({ piece: piece, position: { row: row, col: col } }))
        dispatch(chessSetAvailableMoves(availableMoves))
    }
}

function getAvailableChessMoves(board, row, col, piece, lastMove, king, leftRook, rightRook, kingPosition) {
    const color = piece[0]
    let availableMoves = new Map()
    let oldPiece = ''

    if (piece[1] == 'p') { //Pawn move
        if (color == 'b') {
            if (board[row + 1][col] == '') {
                oldPiece = board[row + 1][col]
                board[row][col] = ''
                board[row + 1][col] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row + 1}-${col}`, { row: row + 1, col: col })
                }
                board[row][col] = piece
                board[row + 1][col] = oldPiece
                if (row == 1 && board[row + 2][col] == '') {

                    oldPiece = board[row + 2][col]
                    board[row][col] = ''
                    board[row + 2][col] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${row + 2}-${col}`, { row: row + 2, col: col })
                    }
                    board[row][col] = piece
                    board[row + 2][col] = oldPiece
                }
            }
            if (col < 7 && board[row + 1][col + 1][0] == 'w') {
                oldPiece = board[row + 1][col + 1]
                board[row][col] = ''
                board[row + 1][col + 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row + 1}-${col + 1}`, { row: row + 1, col: col + 1 })
                }
                board[row][col] = piece
                board[row + 1][col + 1] = oldPiece
            }
            if (col > 0 && board[row + 1][col - 1][0] == 'w') {
                oldPiece = board[row + 1][col - 1]
                board[row][col] = ''
                board[row + 1][col - 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row + 1}-${col - 1}`, { row: row + 1, col: col - 1 })
                }
                board[row][col] = piece
                board[row + 1][col - 1] = oldPiece
            }
            if (lastMove.piece == 'wp' && lastMove.startPosition.row == 6 && lastMove.endPosition.row == row && row == 4) {
                if (lastMove.endPosition.col == (col - 1)) {
                    oldPiece = board[row + 1][col - 1]
                    board[row][col] = ''
                    board[row + 1][col - 1] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${row + 1}-${col - 1}`, { row: row + 1, col: col - 1, enPassant: true })
                    }
                    board[row][col] = piece
                    board[row + 1][col - 1] = oldPiece
                } else if (lastMove.endPosition.col == (col + 1)) {
                    oldPiece = board[row + 1][col + 1]
                    board[row][col] = ''
                    board[row + 1][col + 1] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${row + 1}-${col + 1}`, { row: row + 1, col: col + 1, enPassant: true })
                    }
                    board[row][col] = piece
                    board[row + 1][col + 1] = oldPiece
                }
            }
        } else {
            if (board[row - 1][col] == '') {
                oldPiece = board[row - 1][col]
                board[row][col] = ''
                board[row - 1][col] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row - 1}-${col}`, { row: row - 1, col: col })
                }
                board[row][col] = piece
                board[row - 1][col] = oldPiece
                if (row == 6 && board[row - 2][col] == '') {
                    oldPiece = board[row - 2][col]
                    board[row][col] = ''
                    board[row - 2][col] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${row - 2}-${col}`, { row: row - 2, col: col })
                    }
                    board[row][col] = piece
                    board[row - 2][col] = oldPiece
                }
            }
            if (col < 7 && board[row - 1][col + 1][0] == 'b') {
                oldPiece = board[row - 1][col + 1]
                board[row][col] = ''
                board[row - 1][col + 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row - 1}-${col + 1}`, { row: row - 1, col: col + 1 })
                }
                board[row][col] = piece
                board[row - 1][col + 1] = oldPiece
            }
            if (col > 0 && board[row - 1][col - 1][0] == 'b') {
                oldPiece = board[row - 1][col - 1]
                board[row][col] = ''
                board[row - 1][col - 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row - 1}-${col - 1}`, { row: row - 1, col: col - 1 })
                }
                board[row][col] = piece
                board[row - 1][col - 1] = oldPiece
            }
            if (lastMove.piece == 'bp' && lastMove.startPosition.row == 1 && lastMove.endPosition.row == row && row == 3) {
                if (lastMove.endPosition.col == (col - 1)) {
                    oldPiece = board[row - 1][col - 1]
                    board[row][col] = ''
                    board[row - 1][col - 1] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${row - 1}-${col - 1}`, { row: row - 1, col: col - 1, enPassant: true })
                    }
                    board[row][col] = piece
                    board[row - 1][col - 1] = oldPiece
                } else if (lastMove.endPosition.col == (col + 1)) {
                    oldPiece = board[row - 1][col + 1]
                    board[row][col] = ''
                    board[row - 1][col + 1] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${row - 1}-${col + 1}`, { row: row - 1, col: col + 1, enPassant: true })
                    }
                    board[row][col] = piece
                    board[row - 1][col + 1] = oldPiece
                }
            }
        }
    } else if (piece[1] == 'r') { //Rook move
        let currRowTop = row - 1
        let currRowBottom = row + 1
        let currLeftCol = col - 1
        let currRightCol = col + 1
        let intersectTop = false
        let intersectBottom = false
        let intersectLeft = false
        let intersectRight = false

        while (currRowTop >= 0 && !intersectTop) {
            if (board[currRowTop][col][0] != color) {
                oldPiece = board[currRowTop][col]
                board[row][col] = ''
                board[currRowTop][col] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${currRowTop}-${col}`, { row: currRowTop, col: col })
                }
                board[row][col] = piece
                board[currRowTop][col] = oldPiece
                if (board[currRowTop][col] != '') {
                    intersectTop = true
                }
            } else {
                intersectTop = true
            }
            currRowTop -= 1
        }

        while (currRowBottom <= 7 && !intersectBottom) {
            if (board[currRowBottom][col][0] != color) {
                oldPiece = board[currRowBottom][col]
                board[row][col] = ''
                board[currRowBottom][col] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${currRowBottom}-${col}`, { row: currRowBottom, col: col })
                }
                board[row][col] = piece
                board[currRowBottom][col] = oldPiece
                if (board[currRowBottom][col] != '') {
                    intersectBottom = true
                }
            } else {
                intersectBottom = true
            }
            currRowBottom += 1
        }

        while (currLeftCol >= 0 && !intersectLeft) {
            if (board[row][currLeftCol][0] != color) {
                oldPiece = board[row][currLeftCol]
                board[row][col] = ''
                board[row][currLeftCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row}-${currLeftCol}`, { row: row, col: currLeftCol })
                }
                board[row][col] = piece
                board[row][currLeftCol] = oldPiece
                if (board[row][currLeftCol] != '') {
                    intersectLeft = true
                }
            } else {
                intersectLeft = true
            }
            currLeftCol -= 1
        }

        while (currRightCol <= 7 && !intersectRight) {
            if (board[row][currRightCol][0] != color) {
                oldPiece = board[row][currRightCol]
                board[row][col] = ''
                board[row][currRightCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row}-${currRightCol}`, { row: row, col: currRightCol })
                }
                board[row][col] = piece
                board[row][currRightCol] = oldPiece
                if (board[row][currRightCol] != '') {
                    intersectRight = true
                }
            } else {
                intersectRight = true
            }
            currRightCol += 1
        }
    } else if (piece[1] == 'k' && piece[2] == 'n') { //Knight move

        if (row > 1) {
            if (col > 0 && board[row - 2][col - 1][0] != color) {
                oldPiece = board[row - 2][col - 1]
                board[row][col] = ''
                board[row - 2][col - 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row - 2}-${col - 1}`, { row: row - 2, col: col - 1 })
                }
                board[row][col] = piece
                board[row - 2][col - 1] = oldPiece
            }
            if (col < 7 && board[row - 2][col + 1][0] != color) {
                oldPiece = board[row - 2][col + 1]
                board[row][col] = ''
                board[row - 2][col + 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row - 2}-${col + 1}`, { row: row - 2, col: col + 1 })
                }
                board[row][col] = piece
                board[row - 2][col + 1] = oldPiece
            }
        }
        if (row > 0) {
            if (col > 1 && board[row - 1][col - 2][0] != color) {
                oldPiece = board[row - 1][col - 2]
                board[row][col] = ''
                board[row - 1][col - 2] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row - 1}-${col - 2}`, { row: row - 1, col: col - 2 })
                }
                board[row][col] = piece
                board[row - 1][col - 2] = oldPiece
            }
            if (col < 6 && board[row - 1][col + 2][0] != color) {
                oldPiece = board[row - 1][col + 2]
                board[row][col] = ''
                board[row - 1][col + 2] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row - 1}-${col + 2}`, { row: row - 1, col: col + 2 })
                }
                board[row][col] = piece
                board[row - 1][col + 2] = oldPiece
            }
        }
        if (row < 6) {
            if (col > 0 && board[row + 2][col - 1][0] != color) {
                oldPiece = board[row + 2][col - 1]
                board[row][col] = ''
                board[row + 2][col - 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row + 2}-${col - 1}`, { row: row + 2, col: col - 1 })
                }
                board[row][col] = piece
                board[row + 2][col - 1] = oldPiece
            }
            if (col < 7 && board[row + 2][col + 1][0] != color) {
                oldPiece = board[row + 2][col + 1]
                board[row][col] = ''
                board[row + 2][col + 1] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row + 2}-${col + 1}`, { row: row + 2, col: col + 1 })
                }
                board[row][col] = piece
                board[row + 2][col + 1] = oldPiece
            }
        }
        if (row < 7) {
            if (col > 1 && board[row + 1][col - 2][0] != color) {
                oldPiece = board[row + 1][col - 2]
                board[row][col] = ''
                board[row + 1][col - 2] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row + 1}-${col - 2}`, { row: row + 1, col: col - 2 })
                }
                board[row][col] = piece
                board[row + 1][col - 2] = oldPiece
            }
            if (col < 6 && board[row + 1][col + 2][0] != color) {
                oldPiece = board[row + 1][col + 2]
                board[row][col] = ''
                board[row + 1][col + 2] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row + 1}-${col + 2}`, { row: row + 1, col: col + 2 })
                }
                board[row][col] = piece
                board[row + 1][col + 2] = oldPiece
            }
        }
    } else if (piece[1] == 'b') { //Bishop move
        let currRow = row - 1
        let currLeftCol = col - 1
        let currRightCol = col + 1
        let intersectLeft = false
        let intersectRight = false
        while (currRow >= 0 && (!intersectLeft || !intersectRight)) {
            if (!intersectLeft && currLeftCol >= 0) {
                if (board[currRow][currLeftCol][0] != color) {
                    oldPiece = board[currRow][currLeftCol]
                    board[row][col] = ''
                    board[currRow][currLeftCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currLeftCol}`, { row: currRow, col: currLeftCol })
                    }
                    board[row][col] = piece
                    board[currRow][currLeftCol] = oldPiece
                    if (board[currRow][currLeftCol] != '') {
                        intersectLeft = true
                    } else {
                        currLeftCol -= 1
                    }
                } else {
                    intersectLeft = true
                }
            }
            if (!intersectRight && currRightCol <= 7) {
                if (board[currRow][currRightCol][0] != color) {
                    oldPiece = board[currRow][currRightCol]
                    board[row][col] = ''
                    board[currRow][currRightCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currRightCol}`, { row: currRow, col: currRightCol })
                    }
                    board[row][col] = piece
                    board[currRow][currRightCol] = oldPiece
                    if (board[currRow][currRightCol] != '') {
                        intersectRight = true
                    } else {
                        currRightCol += 1
                    }
                } else {
                    intersectRight = true
                }
            }
            currRow -= 1
        }
        currRow = row + 1
        currLeftCol = col - 1
        currRightCol = col + 1
        intersectLeft = false
        intersectRight = false
        while (currRow <= 7 && (!intersectLeft || !intersectRight)) {
            if (!intersectLeft && currLeftCol >= 0) {
                if (board[currRow][currLeftCol][0] != color) {
                    oldPiece = board[currRow][currLeftCol]
                    board[row][col] = ''
                    board[currRow][currLeftCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currLeftCol}`, { row: currRow, col: currLeftCol })
                    }
                    board[row][col] = piece
                    board[currRow][currLeftCol] = oldPiece
                    if (board[currRow][currLeftCol] != '') {
                        intersectLeft = true
                    } else {
                        currLeftCol -= 1
                    }
                } else {
                    intersectLeft = true
                }
            }
            if (!intersectRight && currRightCol <= 7) {
                if (board[currRow][currRightCol][0] != color) {
                    oldPiece = board[currRow][currRightCol]
                    board[row][col] = ''
                    board[currRow][currRightCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currRightCol}`, { row: currRow, col: currRightCol })
                    }
                    board[row][col] = piece
                    board[currRow][currRightCol] = oldPiece
                    if (board[currRow][currRightCol] != '') {
                        intersectRight = true
                    } else {
                        currRightCol += 1
                    }
                } else {
                    intersectRight = true
                }
            }
            currRow += 1
        }
    } else if (piece[1] == 'q') { //Queen move
        //rook left and right moves
        let currLeftCol = col - 1
        let currRightCol = col + 1
        let intersectLeft = false
        let intersectRight = false

        while (currLeftCol >= 0 && !intersectLeft) {
            if (board[row][currLeftCol][0] != color) {
                oldPiece = board[row][currLeftCol]
                board[row][col] = ''
                board[row][currLeftCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row}-${currLeftCol}`, { row: row, col: currLeftCol })
                }
                board[row][col] = piece
                board[row][currLeftCol] = oldPiece
                if (board[row][currLeftCol] != '') {
                    intersectLeft = true
                }
            } else {
                intersectLeft = true
            }
            currLeftCol -= 1
        }

        while (currRightCol <= 7 && !intersectRight) {
            if (board[row][currRightCol][0] != color) {
                oldPiece = board[row][currRightCol]
                board[row][col] = ''
                board[row][currRightCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${row}-${currRightCol}`, { row: row, col: currRightCol })
                }
                board[row][col] = piece
                board[row][currRightCol] = oldPiece
                if (board[row][currRightCol] != '') {
                    intersectRight = true
                }
            } else {
                intersectRight = true
            }
            currRightCol += 1
        }


        //Bishop style mvoes
        let currRow = row - 1
        currLeftCol = col - 1
        currRightCol = col + 1
        intersectLeft = false
        let intersectMiddle = false
        intersectRight = false
        while (currRow >= 0 && (!intersectLeft || !intersectMiddle || !intersectRight)) {
            if (!intersectLeft && currLeftCol >= 0) {
                if (board[currRow][currLeftCol][0] != color) {
                    oldPiece = board[currRow][currLeftCol]
                    board[row][col] = ''
                    board[currRow][currLeftCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currLeftCol}`, { row: currRow, col: currLeftCol })
                    }
                    board[row][col] = piece
                    board[currRow][currLeftCol] = oldPiece
                    if (board[currRow][currLeftCol] != '') {
                        intersectLeft = true
                    } else {
                        currLeftCol -= 1
                    }
                } else {
                    intersectLeft = true
                }
            }
            if (!intersectMiddle) {
                if (board[currRow][col][0] != color) {
                    oldPiece = board[currRow][col]
                    board[row][col] = ''
                    board[currRow][col] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${col}`, { row: currRow, col: col })
                    }
                    board[row][col] = piece
                    board[currRow][col] = oldPiece
                    if (board[currRow][col] != '') {
                        intersectMiddle = true
                    }
                } else {
                    intersectMiddle = true
                }
            }
            if (!intersectRight && currRightCol <= 7) {
                if (board[currRow][currRightCol][0] != color) {
                    oldPiece = board[currRow][currRightCol]
                    board[row][col] = ''
                    board[currRow][currRightCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currRightCol}`, { row: currRow, col: currRightCol })
                    }
                    board[row][col] = piece
                    board[currRow][currRightCol] = oldPiece
                    if (board[currRow][currRightCol] != '') {
                        intersectRight = true
                    } else {
                        currRightCol += 1
                    }
                } else {
                    intersectRight = true
                }
            }
            currRow -= 1
        }
        currRow = row + 1
        currLeftCol = col - 1
        currRightCol = col + 1
        intersectLeft = false
        intersectMiddle = false
        intersectRight = false
        while (currRow <= 7 && (!intersectLeft || !intersectMiddle || !intersectRight)) {
            if (!intersectLeft && currLeftCol >= 0) {
                if (board[currRow][currLeftCol][0] != color) {
                    oldPiece = board[currRow][currLeftCol]
                    board[row][col] = ''
                    board[currRow][currLeftCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currLeftCol}`, { row: currRow, col: currLeftCol })
                    }
                    board[row][col] = piece
                    board[currRow][currLeftCol] = oldPiece
                    if (board[currRow][currLeftCol] != '') {
                        intersectLeft = true
                    } else {
                        currLeftCol -= 1
                    }
                } else {
                    intersectLeft = true
                }
            }
            if (!intersectMiddle) {
                if (board[currRow][col][0] != color) {
                    oldPiece = board[currRow][col]
                    board[row][col] = ''
                    board[currRow][col] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${col}`, { row: currRow, col: col })
                    }
                    board[row][col] = piece
                    board[currRow][col] = oldPiece
                    if (board[currRow][col] != '') {
                        intersectMiddle = true
                    }
                } else {
                    intersectMiddle = true
                }
            }
            if (!intersectRight && currRightCol <= 7) {
                if (board[currRow][currRightCol][0] != color) {
                    oldPiece = board[currRow][currRightCol]
                    board[row][col] = ''
                    board[currRow][currRightCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${currRow}-${currRightCol}`, { row: currRow, col: currRightCol })
                    }
                    board[row][col] = piece
                    board[currRow][currRightCol] = oldPiece
                    if (board[currRow][currRightCol] != '') {
                        intersectRight = true
                    } else {
                        currRightCol += 1
                    }
                } else {
                    intersectRight = true
                }
            }
            currRow += 1
        }
    } else if (piece[1] == 'k') { //King move
        //top row
        if (row > 0) {
            if (col > 0) {
                if (board[row - 1][col - 1][0] != color) {
                    oldPiece = board[row - 1][col - 1]
                    board[row][col] = ''
                    board[row - 1][col - 1] = piece
                    if (!chessCheckForMate(board, { row: row - 1, col: col - 1 }, color)) {
                        availableMoves.set(`${row - 1}-${col - 1}`, { row: row - 1, col: col - 1 })
                    }
                    board[row][col] = piece
                    board[row - 1][col - 1] = oldPiece
                }
            }
            if (board[row - 1][col][0] != color) {
                oldPiece = board[row - 1][col]
                board[row][col] = ''
                board[row - 1][col] = piece
                if (!chessCheckForMate(board, { row: row - 1, col: col }, color)) {
                    availableMoves.set(`${row - 1}-${col}`, { row: row - 1, col: col })
                }
                board[row][col] = piece
                board[row - 1][col] = oldPiece
            }
            if (col < 7) {
                if (board[row - 1][col + 1][0] != color) {
                    oldPiece = board[row - 1][col + 1]
                    board[row][col] = ''
                    board[row - 1][col + 1] = piece
                    if (!chessCheckForMate(board, { row: row - 1, col: col + 1 }, color)) {
                        availableMoves.set(`${row - 1}-${col + 1}`, { row: row - 1, col: col + 1 })
                    }
                    board[row][col] = piece
                    board[row - 1][col + 1] = oldPiece
                }
            }
        }

        //Middle row
        if (col > 0) {
            if (board[row][col - 1][0] != color) {
                oldPiece = board[row][col - 1]
                board[row][col] = ''
                board[row][col - 1] = piece
                if (!chessCheckForMate(board, { row: row, col: col - 1 }, color)) {
                    availableMoves.set(`${row}-${col - 1}`, { row: row, col: col - 1 })
                }
                board[row][col] = piece
                board[row][col - 1] = oldPiece
            }
        }
        if (col < 7) {
            if (board[row][col + 1][0] != color) {
                oldPiece = board[row][col + 1]
                board[row][col] = ''
                board[row][col + 1] = piece
                if (!chessCheckForMate(board, { row: row, col: col + 1 }, color)) {
                    availableMoves.set(`${row}-${col + 1}`, { row: row, col: col + 1 })
                }
                board[row][col] = piece
                board[row][col + 1] = oldPiece
            }
        }

        //Bottom row
        if (row < 7) {
            if (col > 0) {
                if (board[row + 1][col - 1][0] != color) {
                    oldPiece = board[row + 1][col - 1]
                    board[row][col] = ''
                    board[row + 1][col - 1] = piece
                    if (!chessCheckForMate(board, { row: row + 1, col: col - 1 }, color)) {
                        availableMoves.set(`${row + 1}-${col - 1}`, { row: row + 1, col: col - 1 })
                    }
                    board[row][col] = piece
                    board[row + 1][col - 1] = oldPiece
                }
            }
            if (board[row + 1][col][0] != color) {
                oldPiece = board[row + 1][col]
                board[row][col] = ''
                board[row + 1][col] = piece
                if (!chessCheckForMate(board, { row: row + 1, col: col }, color)) {
                    availableMoves.set(`${row + 1}-${col}`, { row: row + 1, col: col })
                }
                board[row][col] = piece
                board[row + 1][col] = oldPiece
            }
            if (col < 7) {
                if (board[row + 1][col + 1][0] != color) {
                    oldPiece = board[row + 1][col + 1]
                    board[row][col] = ''
                    board[row + 1][col + 1] = piece
                    if (!chessCheckForMate(board, { row: row + 1, col: col + 1 }, color)) {
                        availableMoves.set(`${row + 1}-${col + 1}`, { row: row + 1, col: col + 1 })
                    }
                    board[row][col] = piece
                    board[row + 1][col + 1] = oldPiece
                }
            }
        }

        //Castle
        if (king) {
            if (leftRook) {
                if (board[row][col - 1] == '' && board[row][col - 2] == '' && board[row][col - 3] == '') {
                    //Check for check only on first two spots and curr
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        oldPiece = board[row][col - 1]
                        board[row][col] = ''
                        board[row][col - 1] = piece
                        if (!chessCheckForMate(board, { row: row, col: col - 1 }, color)) {
                            board[row][col - 1] = ''
                            board[row][col - 2] = piece
                            if (!chessCheckForMate(board, { row: row, col: col - 2 }, color)) {
                                availableMoves.set(`${row}-${col - 2}`, { row: row, col: col - 2, castle: true })
                            }
                        }
                        board[row][col] = piece
                        board[row][col - 1] = oldPiece
                        board[row][col - 2] = ''
                    }
                }
            }
            if (rightRook) {
                if (board[row][col + 1] == '' && board[row][col + 2] == '') {
                    //Check for check on both spots and curr
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        oldPiece = board[row][col + 1]
                        board[row][col] = ''
                        board[row][col + 1] = piece
                        if (!chessCheckForMate(board, { row: row, col: col + 1 }, color)) {
                            board[row][col + 1] = ''
                            board[row][col + 2] = piece
                            if (!chessCheckForMate(board, { row: row, col: col + 2 }, color)) {
                                availableMoves.set(`${row}-${col + 2}`, { row: row, col: col + 2, castle: true })
                            }
                        }
                        board[row][col] = piece
                        board[row][col + 1] = oldPiece
                        board[row][col + 2] = ''
                    }
                }
            }
        }
    }

    return availableMoves
}

export function chessMovePiece(board, from, to, turn) {
    ///add castle king check
    return dispatch => {
        board[from.position.row][from.position.col] = ''
        board[to.row][to.col] = from.piece
        if (to.enPassant) {
            board[to.row + (turn % 2 == 0 ? 1 : -1)][to.col] = ''
        } else if (to.castle) {
            if (from.position.col > to.col) {
                board[to.row][0] = ''
                board[to.row][to.col + 1] = `${from.piece[0]}r`
            } else {
                board[to.row][7] = ''
                board[to.row][to.col - 1] = `${from.piece[0]}r`
            }
            if (turn % 2 == 0) {
                dispatch(setWhiteKingAvailable(false))
                dispatch(setWhiteKingPosition({ row: to.row, col: to.col }))
            }else{
                dispatch(setBlackKingAvailable(false))
                dispatch(setBlackKingPosition({ row: to.row, col: to.col }))
            }
        } else if (from.piece == 'wk') {
            dispatch(setWhiteKingAvailable(false))
            dispatch(setWhiteKingPosition({ row: to.row, col: to.col }))
        } else if (from.piece == 'bk') {
            dispatch(setBlackKingAvailable(false))
            dispatch(setBlackKingPosition({ row: to.row, col: to.col }))
        } else if (from.piece == 'wr' && from.position.row == 7 && from.position.col == 0) {
            dispatch(setLeftWhiteRookAvailable(false))
        } else if (from.piece == 'wr' && from.position.row == 7 && from.position.col == 7) {
            dispatch(setRightWhiteRookAvailable(false))
        } else if (from.piece == 'br' && from.position.row == 0 && from.position.col == 0) {
            dispatch(setLeftBlackRookAvailable(false))
        } else if (from.piece == 'br' && from.position.row == 0 && from.position.col == 7) {
            dispatch(setRightBlackRookAvailable(false))
        } else if (to.row == 0 && to.col == 0) {
            dispatch(setLeftBlackRookAvailable(false))
        } else if (to.row == 0 && to.col == 7) {
            dispatch(setRightBlackRookAvailable(false))
        } else if (to.row == 7 && to.col == 0) {
            dispatch(setLeftWhiteRookAvailable(false))
        } else if (to.row == 7 && to.col == 7) {
            dispatch(setRightWhiteRookAvailable(false))
        }

        if (from.piece[1] == 'p' && (to.row == 0 || to.row == 7)) {
            dispatch(setPromotionActive(true))
        } else {
            dispatch(setTurn(turn + 1))
            dispatch(setAllAvailableMovesGenerated(false))
        }
        // dispatch(setTurn(turn+1))
        dispatch(chessSetBoard(board))
        dispatch(chessResetActivePiece())
        dispatch(chessSetAvailableMoves(new Map()))
        dispatch(chessSetLastMove({ piece: from.piece, startPosition: { row: from.position.row, col: from.position.col }, endPosition: { row: to.row, col: to.col } }))
    }
}

export function chessPromotePiece(board, lastMove, newPiece, turn) {
    return dispatch => {
        board[lastMove.endPosition.row][lastMove.endPosition.col] = newPiece
        dispatch(setTurn(turn + 1))
        dispatch(chessSetBoard(board))
        dispatch(setPromotionActive(false))
        dispatch(setAllAvailableMovesGenerated(false))
    }
}

export function chessCheckForMate(board, kingPosition, color) {
    let opositeColor = color == 'w' ? 'b' : 'w'
    let row = kingPosition.row
    let col = kingPosition.col
    let currRow = row - 1
    let currLeftCol = col - 1
    let currRightCol = col + 1
    let intersectLeft = false
    let intersectMiddle = false
    let intersectRight = false

    while (currRow >= 0 && (!intersectLeft || !intersectMiddle || !intersectRight)) {
        if (!intersectLeft && currLeftCol >= 0) {
            if (board[currRow][currLeftCol][0] != color) {
                if (board[currRow][currLeftCol] != '') {
                    if (board[currRow][currLeftCol] == `${opositeColor}q` || board[currRow][currLeftCol] == `${opositeColor}b`) {
                        return true
                    } else {
                        intersectLeft = true
                    }
                } else {
                    currLeftCol -= 1
                }
            } else {
                intersectLeft = true
            }
        }
        if (!intersectMiddle) {
            if (board[currRow][col][0] != color) {
                if (board[currRow][col] != '') {
                    if (board[currRow][col] == `${opositeColor}q` || board[currRow][col] == `${opositeColor}r`) {
                        return true
                    } else {
                        intersectMiddle = true
                    }
                }
            } else {
                intersectMiddle = true
            }
        }
        if (!intersectRight && currRightCol <= 7) {
            if (board[currRow][currRightCol][0] != color) {
                if (board[currRow][currRightCol] != '') {
                    if (board[currRow][currRightCol] == `${opositeColor}q` || board[currRow][currRightCol] == `${opositeColor}b`) {
                        return true
                    } else {
                        intersectRight = true
                    }
                } else {
                    currRightCol += 1
                }
            } else {
                intersectRight = true
            }
        }
        currRow -= 1
    }

    //rook left and right moves
    currLeftCol = col - 1
    currRightCol = col + 1
    intersectLeft = false
    intersectRight = false

    while (currLeftCol >= 0 && !intersectLeft) {
        if (board[row][currLeftCol][0] != color) {
            if (board[row][currLeftCol] != '') {
                if (board[row][currLeftCol] == `${opositeColor}q` || board[row][currLeftCol] == `${opositeColor}r`) {
                    return true
                } else {
                    intersectLeft = true
                }
            }
        } else {
            intersectLeft = true
        }
        currLeftCol -= 1
    }

    while (currRightCol <= 7 && !intersectRight) {
        if (board[row][currRightCol][0] != color) {
            if (board[row][currRightCol] != '') {
                if (board[row][currRightCol] == `${opositeColor}q` || board[row][currRightCol] == `${opositeColor}r`) {
                    return true
                } else {
                    intersectRight = true
                }
            }
        } else {
            intersectRight = true
        }
        currRightCol += 1
    }

    currRow = row + 1
    currLeftCol = col - 1
    currRightCol = col + 1
    intersectLeft = false
    intersectMiddle = false
    intersectRight = false
    while (currRow <= 7 && (!intersectLeft || !intersectMiddle || !intersectRight)) {
        if (!intersectLeft && currLeftCol >= 0) {
            if (board[currRow][currLeftCol][0] != color) {
                if (board[currRow][currLeftCol] != '') {
                    if (board[currRow][currLeftCol] == `${opositeColor}q` || board[currRow][currLeftCol] == `${opositeColor}b`) {
                        return true
                    } else {
                        intersectLeft = true
                    }
                } else {
                    currLeftCol -= 1
                }
            } else {
                intersectLeft = true
            }
        }
        if (!intersectMiddle) {
            if (board[currRow][col][0] != color) {
                if (board[currRow][col] != '') {
                    if (board[currRow][col] == `${opositeColor}q` || board[currRow][col] == `${opositeColor}r`) {
                        return true
                    } else {
                        intersectMiddle = true
                    }
                }
            } else {
                intersectMiddle = true
            }
        }
        if (!intersectRight && currRightCol <= 7) {
            if (board[currRow][currRightCol][0] != color) {
                if (board[currRow][currRightCol] != '') {
                    if (board[currRow][currRightCol] == `${opositeColor}q` || board[currRow][currRightCol] == `${opositeColor}b`) {
                        return true
                    } else {
                        intersectRight = true
                    }
                } else {
                    currRightCol += 1
                }
            } else {
                intersectRight = true
            }
        }
        currRow += 1
    }

    //check knights
    if (row > 1) {
        if (col > 0 && board[row - 2][col - 1] == `${opositeColor}kn`) {
            return true
        }
        if (col < 7 && board[row - 2][col + 1] == `${opositeColor}kn`) {
            return true
        }
    }
    if (row > 0) {
        if (col > 1 && board[row - 1][col - 2] == `${opositeColor}kn`) {
            return true
        }
        if (col < 6 && board[row - 1][col + 2] == `${opositeColor}kn`) {
            return true
        }
    }
    if (row < 6) {
        if (col > 0 && board[row + 2][col - 1] == `${opositeColor}kn`) {
            return true
        }
        if (col < 7 && board[row + 2][col + 1] == `${opositeColor}kn`) {
            return true
        }
    }
    if (row < 7) {
        if (col > 1 && board[row + 1][col - 2] == `${opositeColor}kn`) {
            return true
        }
        if (col < 6 && board[row + 1][col + 2] == `${opositeColor}kn`) {
            return true
        }
    }

    //check pawns
    if (color == 'w' && row > 0) {
        if (col > 0 && board[row - 1][col - 1] == `${opositeColor}p`) {
            return true
        }
        if (col < 7 && board[row - 1][col + 1] == `${opositeColor}p`) {
            return true
        }
    }

    if (color == 'b' && row < 7) {
        if (col > 0 && board[row + 1][col - 1] == `${opositeColor}p`) {
            return true
        }
        if (col < 7 && board[row + 1][col + 1] == `${opositeColor}p`) {
            return true
        }
    }

    //check kings
    if (row > 0) {
        if (col > 0 && board[row - 1][col - 1] == `${opositeColor}k`) {
            return true
        }
        if (board[row - 1][col] == `${opositeColor}k`) {
            return true
        }
        if (col < 7 && board[row - 1][col + 1] == `${opositeColor}k`) {
            return true
        }
    }
    if (col > 0 && board[row][col - 1] == `${opositeColor}k`) {
        return true
    }
    if (col < 7 && board[row][col + 1] == `${opositeColor}k`) {
        return true
    }
    if (row < 7) {
        if (col > 0 && board[row + 1][col - 1] == `${opositeColor}k`) {
            return true
        }
        if (board[row + 1][col] == `${opositeColor}k`) {
            return true
        }
        if (col < 7 && board[row + 1][col + 1] == `${opositeColor}k`) {
            return true
        }
    }

    return false
}

export function chessGetAllAvailableMoves(board, lastMove, king, leftRook, rightRook, kingPosition, turn){
    return dispatch => {
        let color = turn%2==0 ? 'w' : 'b'
        let allAvailableChessMoves = new Map()
        board.forEach((w,i) => {
            w.forEach((v,j) => {
                if(v[0]==color){
                    let availableMoves = getAvailableChessMoves(board, i, j, v, lastMove, king, leftRook, rightRook, kingPosition)
                    if(availableMoves.size>0){
                        allAvailableChessMoves.set(`${i}-${j}`,availableMoves)
                    }
                }
            })
        })
        dispatch(setAllAvailableMoves(allAvailableChessMoves))
        dispatch(setAllAvailableMovesGenerated(true))
    }
}

export function chessResetGame(){
    return dispatch => {
        dispatch(chessResetActivePiece())
        dispatch(chessSetAvailableMoves(new Map()))
        dispatch(tttUpdateResult(false,0))
        dispatch(setTurn(0))
        dispatch(setAllAvailableMoves(new Map()))
        dispatch(setAllAvailableMovesGenerated(false))
        dispatch(chessSetBoard([['br', 'bkn', 'bb', 'bq', 'bk', 'bb', 'bkn', 'br'],
        ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
        ['wr', 'wkn', 'wb', 'wq', 'wk', 'wb', 'wkn', 'wr']]))
        dispatch(chessSetLastMove({ piece: '', startPosition: { row: -1, col: -1 }, endPosition: { row: -1, col: -1 } }))
        dispatch(setWhiteKingAvailable(true))
        dispatch(setBlackKingAvailable(true))
        dispatch(setLeftWhiteRookAvailable(true))
        dispatch(setLeftBlackRookAvailable(true))
        dispatch(setRightWhiteRookAvailable(true))
        dispatch(setRightBlackRookAvailable(true))
        dispatch(setPromotionActive(false))
        dispatch(setWhiteKingPosition({ row: 7, col: 4 }))
        dispatch(setBlackKingPosition({ row: 0, col: 4 }))
    }
}

export function chessRandAITurn(board, turn,lastMove, king, leftRook, rightRook, kingPosition){
    return dispatch => {
        dispatch(startWaiting())
        let color = turn%2==0 ? 'w' : 'b'
        let allAvailableChessMoves = new Map()
        board.forEach((w,i) => {
            w.forEach((v,j) => {
                if(v[0]==color){
                    let availableMoves = getAvailableChessMoves(board, i, j, v, lastMove, king, leftRook, rightRook, kingPosition)
                    if(availableMoves.size>0){
                        allAvailableChessMoves.set(`${i}-${j}`,availableMoves)
                    }
                }
            })
        })
        if(allAvailableChessMoves.size==0){
            if(turn%2==0){
                if(chessCheckForMate(board,kingPosition,'w')){
                    dispatch(tttUpdateResult(true,2))
                }else{
                    dispatch(tttUpdateResult(true,0))
                }
            }else{
                if(chessCheckForMate(board,kingPosition,'b')){
                    dispatch(tttUpdateResult(true,1))
                }else{
                    dispatch(tttUpdateResult(true,0))
                }
            }
        }else{
            let randPiece = getRandomItem(allAvailableChessMoves)
            let row = randPiece[0][0]
            let col = randPiece[0][2]
            let from = {piece:board[row][col], position:{row:row,col:col}}
            let to = getRandomItem(randPiece[1])[1]
            if(from.piece=='bp' && to.row==7){
                let items = ['bq','bb','br','bkn',];
                from.piece = items[Math.floor(Math.random() * items.length)];
            }else if(from.piece=='wp' && to.row==0){
                let items = ['wq','wb','wr','wkn',];
                from.piece = items[Math.floor(Math.random() * items.length)];
            }
            dispatch(chessMovePiece(board, from, to, turn))
        }
        dispatch(stopWaiting())
    }
}

function getRandomItem(map) {
    let items = Array.from(map);
    return items[Math.floor(Math.random() * items.length)];
}

/*********************************************************Raster Caster ***************************/

export function setRasterCasterSelection(selection) {
    return {
        type: Action.SetRasterCasterSelection,
        payload: selection,
    }
}

export function setRasterCasterCustomFunction(fnc) {
    return {
        type: Action.SetRasterCasterCustomFunction,
        payload: fnc,
    }
}

export function setRasterCasterExample1Function(fnc) {
    return {
        type: Action.SetRasterCasterExample1Function,
        payload: fnc,
    }
}

export function setRasterCasterDisclaimerActive(b) {
    return {
        type: Action.SetRasterCasterDisclaimerActive,
        payload: b,
    }
}