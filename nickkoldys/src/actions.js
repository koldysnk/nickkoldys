export const Action = Object.freeze({
    ServerError:'ServerError',
    ClearServerError:'ClearServerError',
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
    SetMaxRecursionLevel: 'SetMaxRecursionLevel',
    SetLastThreeMoveNodeCount: 'SetLastThreeMoveNodeCount',
    SetBoardStateCount: 'SetBoardStateCount',
    //RasterCaster
    SetRasterCasterSelection: 'SetRasterCasterSelection',
    SetRasterCasterCustomFunction: 'SetRasterCasterCustomFunction',
    SetRasterCasterExample1Function: 'SetRasterCasterExample1Function',
    SetRasterCasterDisclaimerActive: 'SetRasterCasterDisclaimerActive',
    //Pixel Perfect
    SetPPGoalData: 'SetPPGoalData',
    SetPPCurrData: 'SetPPCurrData',
    SetPPBestData: 'SetPPBestData',
    SetPPAccuracy: 'SetPPAccuracy',
    SetPPCurrAccuracy: 'SetPPCurrAccuracy',
    SetPPStarted: 'SetPPStarted',
    SetPPGenerationCount: 'SetPPGenerationCount',
    SetPPChoosePicture:'SetPPChoosePicture',
    SetPPActivePicture:'SetPPActivePicture',
});

const host = 'https://server.nickkoldys.com:8442';
const wordLimit = 100;
const numWords = 370099;
const maxPage = Math.ceil(numWords / wordLimit) - 1;

function checkForErrors(response) {
    if (!response.ok) {
        throw Error(`${response.status}: ${response.statusText}`);
    }
    return response;
}

export function serverError(message){
    return {
        type:Action.ServerError,
        message:message,
    }
}

export function clearServerError(){
    return {
        type:Action.ClearServerError,
    }
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
            if (maxScore == 1) {
                maxPos.push(pos)
            } else {
                maxScore = 1
                maxPos = [pos]
            }
        } else {
            if (turn == 8) {
                if (0 == maxScore) {
                    maxPos.push(pos)
                } else if (0 > maxScore) {
                    maxPos = [pos]
                    maxScore = 0
                }
            } else {
                let { minPos, minScore } = tttMinAnalysis(board, turn + 1)
                if (minScore > maxScore) {
                    maxScore = minScore;
                    maxPos = [pos];
                } else if (minScore == maxScore) {
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
                } else {
                    dispatch(serverError(`Unfortunately the dictionary is unavailable due to a server error. All games and projects besides hangman are functional.`))
                }
            })
            .catch(e => {
                dispatch(serverError(`Unfortunately the dictionary is unavailable due to a server error: ${e}. All games and projects besides hangman are functional.`))
            });
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
                } else {
                    dispatch(serverError(`Unfortunately the Hangman is unavailable due to a server error. All games and projects besides hangman are functional.`))
                }
            })
            .catch(e => {
                dispatch(serverError(`Unfortunately the Hangman is unavailable due to a server error: ${e}. All games and projects besides hangman are functional.`))
            });
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
            .catch(e => {
                dispatch(serverError(`Unfortunately the Hangman is unavailable due to a server error: ${e}. All games and projects besides hangman are functional.`))
            });
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
                } else {
                    dispatch(serverError(`Unfortunately the Hangman is unavailable due to a server error. All games and projects besides hangman are functional.`))
                }
            })
            .catch(e => {
                dispatch(serverError(`Unfortunately the Hangman is unavailable due to a server error: ${e}. All games and projects besides hangman are functional.`))
            });
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

export function setMaxRecursionLevel(bool) {
    return {
        type: Action.SetMaxRecursionLevel,
        payload: bool,
    }
}

export function setLastThreeMoveNodeCount(arr) {
    return {
        type: Action.SetLastThreeMoveNodeCount,
        payload: arr,
    }
}

export function setBoardStateCount(map) {
    return {
        type: Action.SetBoardStateCount,
        payload: map,
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
    let newRow = row
    let newCol = col

    if (piece[1] == 'p') { //Pawn move
        if (color == 'b') {
            newRow = row + 1
            if (board[newRow][col] == '') {
                oldPiece = board[newRow][col]
                board[row][col] = ''
                board[newRow][col] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${col}`, { row: newRow, col: col })
                }
                board[row][col] = piece
                board[newRow][col] = oldPiece
                if (row == 1 && board[row + 2][col] == '') {
                    newRow = row + 2
                    oldPiece = board[newRow][col]
                    board[row][col] = ''
                    board[newRow][col] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${newRow}-${col}`, { row: newRow, col: col })
                    }
                    board[row][col] = piece
                    board[newRow][col] = oldPiece
                }
            }
            newRow = row + 1
            newCol = col + 1
            if (col < 7 && board[newRow][newCol][0] == 'w') {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            newRow = row + 1
            newCol = col - 1
            if (col > 0 && board[newRow][newCol][0] == 'w') {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            if (lastMove.piece == 'wp' && lastMove.from.row == 6 && lastMove.to.row == row && row == 4) {
                newRow = row + 1
                if (lastMove.to.col == (col - 1)) {
                    newCol = col - 1
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol, enPassant: true })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
                } else if (lastMove.to.col == (col + 1)) {
                    newCol = col + 1
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol, enPassant: true })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
                }
            }
        } else {
            newRow = row - 1
            if (board[newRow][col] == '') {
                oldPiece = board[newRow][col]
                board[row][col] = ''
                board[newRow][col] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${col}`, { row: newRow, col: col })
                }
                board[row][col] = piece
                board[newRow][col] = oldPiece
                if (row == 6 && board[row - 2][col] == '') {
                    newRow = row - 2
                    oldPiece = board[newRow][col]
                    board[row][col] = ''
                    board[newRow][col] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${newRow}-${col}`, { row: newRow, col: col })
                    }
                    board[row][col] = piece
                    board[newRow][col] = oldPiece
                }
            }
            newRow = row - 1
            newCol = col + 1
            if (col < 7 && board[newRow][newCol][0] == 'b') {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            newCol = col - 1
            if (col > 0 && board[newRow][newCol][0] == 'b') {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            if (lastMove.piece == 'bp' && lastMove.from.row == 1 && lastMove.to.row == row && row == 3) {
                newRow = row - 1
                if (lastMove.to.col == (col - 1)) {
                    newCol = col - 1
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol, enPassant: true })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
                } else if (lastMove.to.col == (col + 1)) {
                    newCol = col + 1
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, kingPosition, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol, enPassant: true })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
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
            newRow = row - 2
            newCol = col - 1
            if (col > 0 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            newRow = row - 2
            newCol = col + 1
            if (col < 7 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
        }
        if (row > 0) {
            newRow = row - 1
            newCol = col - 2
            if (col > 1 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            newRow = row - 1
            newCol = col + 2
            if (col < 6 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
        }
        if (row < 6) {
            newRow = row + 2
            newCol = col - 1
            if (col > 0 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            newRow = row + 2
            newCol = col + 1
            if (col < 7 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
        }
        if (row < 7) {
            newRow = row + 1
            newCol = col - 2
            if (col > 1 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
            }
            newRow = row + 1
            newCol = col + 2
            if (col < 6 && board[newRow][newCol][0] != color) {
                oldPiece = board[newRow][newCol]
                board[row][col] = ''
                board[newRow][newCol] = piece
                if (!chessCheckForMate(board, kingPosition, color)) {
                    availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                }
                board[row][col] = piece
                board[newRow][newCol] = oldPiece
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
                newRow = row - 1
                newCol = col - 1
                if (board[newRow][newCol][0] != color) {
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
                }
            }
            newRow = row - 1
            if (board[newRow][col][0] != color) {
                oldPiece = board[newRow][col]
                board[row][col] = ''
                board[newRow][col] = piece
                if (!chessCheckForMate(board, { row: newRow, col: col }, color)) {
                    availableMoves.set(`${newRow}-${col}`, { row: newRow, col: col })
                }
                board[row][col] = piece
                board[newRow][col] = oldPiece
            }
            if (col < 7) {
                newRow = row - 1
                newCol = col + 1
                if (board[newRow][newCol][0] != color) {
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
                }
            }
        }

        //Middle row
        if (col > 0) {
            newCol = col - 1
            if (board[row][newCol][0] != color) {
                oldPiece = board[row][newCol]
                board[row][col] = ''
                board[row][newCol] = piece
                if (!chessCheckForMate(board, { row: row, col: newCol }, color)) {
                    availableMoves.set(`${row}-${newCol}`, { row: row, col: newCol })
                }
                board[row][col] = piece
                board[row][newCol] = oldPiece
            }
        }
        if (col < 7) {
            newCol = col + 1
            if (board[row][newCol][0] != color) {
                oldPiece = board[row][newCol]
                board[row][col] = ''
                board[row][newCol] = piece
                if (!chessCheckForMate(board, { row: row, col: newCol }, color)) {
                    availableMoves.set(`${row}-${newCol}`, { row: row, col: newCol })
                }
                board[row][col] = piece
                board[row][newCol] = oldPiece
            }
        }

        //Bottom row
        if (row < 7) {
            newRow = row + 1
            if (col > 0) {
                newCol = col - 1
                if (board[newRow][newCol][0] != color) {
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
                }
            }
            if (board[newRow][col][0] != color) {
                oldPiece = board[newRow][col]
                board[row][col] = ''
                board[newRow][col] = piece
                if (!chessCheckForMate(board, { row: newRow, col: col }, color)) {
                    availableMoves.set(`${newRow}-${col}`, { row: newRow, col: col })
                }
                board[row][col] = piece
                board[newRow][col] = oldPiece
            }
            if (col < 7) {
                newCol = col + 1
                if (board[newRow][newCol][0] != color) {
                    oldPiece = board[newRow][newCol]
                    board[row][col] = ''
                    board[newRow][newCol] = piece
                    if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                        availableMoves.set(`${newRow}-${newCol}`, { row: newRow, col: newCol })
                    }
                    board[row][col] = piece
                    board[newRow][newCol] = oldPiece
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

export function chessMovePiece(board, from, to, turn, boardStateCount) {
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
            } else {
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
            let boardRep = `${board}`
            if (boardStateCount.has(boardRep)) {
                boardStateCount.set(boardRep, boardStateCount.get(boardRep) + 1)
            } else {
                boardStateCount.set(boardRep, 1)
            }
            dispatch(setBoardStateCount(boardStateCount))
        }
        // dispatch(setTurn(turn+1))
        dispatch(chessSetBoard(board))
        dispatch(chessResetActivePiece())
        dispatch(chessSetAvailableMoves(new Map()))
        dispatch(chessSetLastMove({ piece: from.piece, from: { row: from.position.row, col: from.position.col }, to: { row: to.row, col: to.col } }))
    }
}

export function chessPromotePiece(board, lastMove, newPiece, turn, boardStateCount) {
    return dispatch => {
        board[lastMove.to.row][lastMove.to.col] = newPiece
        dispatch(setTurn(turn + 1))
        dispatch(chessSetBoard(board))
        let boardRep = `${board}`
        if (boardStateCount.has(boardRep)) {
            boardStateCount.set(boardRep, boardStateCount.get(boardRep) + 1)
        } else {
            boardStateCount.set(boardRep, 1)
        }
        dispatch(setBoardStateCount(boardStateCount))
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

export function chessGetAllAvailableMoves(board, lastMove, king, leftRook, rightRook, kingPosition, turn) {
    return dispatch => {
        let color = turn % 2 == 0 ? 'w' : 'b'
        let allAvailableChessMoves = new Map()
        board.forEach((w, i) => {
            w.forEach((v, j) => {
                if (v[0] == color) {
                    let availableMoves = getAvailableChessMoves(board, i, j, v, lastMove, king, leftRook, rightRook, kingPosition)
                    if (availableMoves.size > 0) {
                        allAvailableChessMoves.set(`${i}-${j}`, availableMoves)
                    }
                }
            })
        })
        dispatch(setAllAvailableMoves(allAvailableChessMoves))
        dispatch(setAllAvailableMovesGenerated(true))
    }
}

export function chessResetGame() {
    return dispatch => {
        dispatch(chessResetActivePiece())
        dispatch(chessSetAvailableMoves(new Map()))
        dispatch(tttUpdateResult(false, 0))
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
        dispatch(chessSetLastMove({ piece: '', from: { row: -1, col: -1 }, to: { row: -1, col: -1 } }))
        dispatch(setWhiteKingAvailable(true))
        dispatch(setBlackKingAvailable(true))
        dispatch(setLeftWhiteRookAvailable(true))
        dispatch(setLeftBlackRookAvailable(true))
        dispatch(setRightWhiteRookAvailable(true))
        dispatch(setRightBlackRookAvailable(true))
        dispatch(setPromotionActive(false))
        dispatch(setWhiteKingPosition({ row: 7, col: 4 }))
        dispatch(setBlackKingPosition({ row: 0, col: 4 }))
        dispatch(setMaxRecursionLevel(4))
        dispatch(setLastThreeMoveNodeCount([100000, 100000, 100000]))
        dispatch(setBoardStateCount(new Map()))
    }
}

export function chessRandAITurn(board, turn, lastMove, king, leftRook, rightRook, kingPosition) {
    return dispatch => {
        dispatch(startWaiting())
        let color = turn % 2 == 0 ? 'w' : 'b'
        let allAvailableChessMoves = new Map()
        board.forEach((w, i) => {
            w.forEach((v, j) => {
                if (v[0] == color) {
                    let availableMoves = getAvailableChessMoves(board, i, j, v, lastMove, king, leftRook, rightRook, kingPosition)
                    if (availableMoves.size > 0) {
                        allAvailableChessMoves.set(`${i}-${j}`, availableMoves)
                    }
                }
            })
        })
        console.log(allAvailableChessMoves)
        if (allAvailableChessMoves.size == 0) {
            if (turn % 2 == 0) {
                if (chessCheckForMate(board, kingPosition, 'w')) {
                    dispatch(tttUpdateResult(true, 2))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            } else {
                if (chessCheckForMate(board, kingPosition, 'b')) {
                    dispatch(tttUpdateResult(true, 1))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            }
        } else {
            let randPiece = getRandomItem(allAvailableChessMoves)
            let row = randPiece[0][0]
            let col = randPiece[0][2]
            let from = { piece: board[row][col], position: { row: row, col: col } }
            let to = getRandomItem(randPiece[1])[1]
            if (from.piece == 'bp' && to.row == 7) {
                let items = ['bq', 'bb', 'br', 'bkn',];
                from.piece = items[Math.floor(Math.random() * items.length)];
            } else if (from.piece == 'wp' && to.row == 0) {
                let items = ['wq', 'wb', 'wr', 'wkn',];
                from.piece = items[Math.floor(Math.random() * items.length)];
            }
            dispatch(chessMovePiece(board, from, to, turn))
        }
        dispatch(stopWaiting())
    }
}

export function chessBasicAITurn(board, turn, lastMove, king, leftRook, rightRook, kingPosition) {
    return dispatch => {
        dispatch(startWaiting())
        let color = turn % 2 == 0 ? 'w' : 'b'
        let allAvailableChessMoves = new Map()
        board.forEach((w, i) => {
            w.forEach((v, j) => {
                if (v[0] == color) {
                    let availableMoves = getAvailableChessMoves(board, i, j, v, lastMove, king, leftRook, rightRook, kingPosition)
                    if (availableMoves.size > 0) {
                        allAvailableChessMoves.set(`${i}-${j}`, availableMoves)
                    }
                }
            })
        })
        if (allAvailableChessMoves.size == 0) {
            if (turn % 2 == 0) {
                if (chessCheckForMate(board, kingPosition, 'w')) {
                    dispatch(tttUpdateResult(true, 2))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            } else {
                if (chessCheckForMate(board, kingPosition, 'b')) {
                    dispatch(tttUpdateResult(true, 1))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            }
        } else {
            let { from, to } = getMoveUsingBasicPositionEvaluation(board, allAvailableChessMoves, color)
            dispatch(chessMovePiece(board, from, to, turn))
        }
        dispatch(stopWaiting())
    }
}

function getRandomItem(map) {
    let items = Array.from(map);
    return items[Math.floor(Math.random() * items.length)];
}

function getMoveUsingBasicPositionEvaluation(board, allAvailableChessMoves, color) {
    let maxMove = []
    let score = 0
    let boardScore = getBasicPositionEvaluation(board)
    let started = false
    allAvailableChessMoves.forEach((piece, i) => {
        let from = { piece: board[i[0]][i[2]], position: { row: i[0], col: i[2] } }
        piece.forEach((move, j) => {
            let currScore = boardScore - basicPieceValue.get(board[move.row][move.col])
            if (!started) {
                score = currScore
                maxMove = [{ from: from, to: move }]
                started = true
            } else {
                if (color == 'w') {
                    if (currScore > score) {
                        score = currScore
                        maxMove = [{ from: from, to: move }]
                    } else if (currScore == score) {
                        maxMove.push({ from: from, to: move })
                    }
                } else {
                    if (currScore < score) {
                        score = currScore
                        maxMove = [{ from: from, to: move }]
                    } else if (currScore == score) {
                        maxMove.push({ from: from, to: move })
                    }
                }
            }
        })
    })

    return maxMove[Math.floor(Math.random() * maxMove.length)]
}

const basicPieceValue = new Map()
basicPieceValue.set('', 0)
basicPieceValue.set('wp', 10)
basicPieceValue.set('wr', 30)
basicPieceValue.set('wb', 30)
basicPieceValue.set('wkn', 50)
basicPieceValue.set('wq', 90)
basicPieceValue.set('wk', 900)
basicPieceValue.set('bp', -10)
basicPieceValue.set('br', -30)
basicPieceValue.set('bb', -30)
basicPieceValue.set('bkn', -50)
basicPieceValue.set('bq', -90)
basicPieceValue.set('bk', -900)

function getBasicPositionEvaluation(board) {
    let score = 0
    board.forEach((row) => {
        row.forEach((piece) => {
            if (piece != '') {
                score += basicPieceValue.get(piece)
            }
        })
    })

    return score
}

const pieceMultiplier = new Map()
pieceMultiplier.set('',
    [[0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]])
pieceMultiplier.set('wp',
    [[0, 0, 0, 0, 0, 0, 0, 0],
    [5, 5, 5, 5, 5, 5, 5, 5],
    [1, 1, 2, 3, 3, 2, 1, 1],
    [.5, .5, 1, 2.5, 2.5, 1, .5, .5],
    [0, 0, 0, 2, 2, 0, 0, 0],
    [.5, -.5, -1, 0, 0, -1, -.5, .5],
    [.5, 1, 1, 1, -2, -2, 1, 1, .5],
    [0, 0, 0, 0, 0, 0, 0, 0]])
pieceMultiplier.set('wr',
    [[0, 0, 0, 0, 0, 0, 0, 0],
    [.5, 1, 1, 1, 1, 1, 1, .5],
    [-.5, 0, 0, 0, 0, 0, 0, -.5],
    [-.5, 0, 0, 0, 0, 0, 0, -.5],
    [-.5, 0, 0, 0, 0, 0, 0, -.5],
    [-.5, 0, 0, 0, 0, 0, 0, -.5],
    [-.5, 0, 0, 0, 0, 0, 0, -.5],
    [0, 0, 0, .5, .5, 0, 0, 0]])
pieceMultiplier.set('wb',
    [[-2, -1, -1, -1, -1, -1, -1, -2],
    [-1, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, .5, 1, 1, .5, 0, -1],
    [-1, .5, .5, 1, 1, .5, .5, -1],
    [-1, 0, 1, 1, 1, 1, 0, -1],
    [-1, 1, 1, 1, 1, 1, 1, -1],
    [-1, .5, 0, 0, 0, 0, .5, -1],
    [-2, -1, -1, -1, -1, -1, -1, -2]])
pieceMultiplier.set('wkn',
    [[-5, -4, -3, -3, -3, -3, -4, -5],
    [-4, -2, 0, 0, 0, 0, -2, -4],
    [-3, 0, 1, 1.5, 1.5, 1, 0, -3],
    [-3, .5, 1.5, 2, 2, 1.5, .5, -3],
    [-3, 0, 1.5, 2, 2, 1.5, 0, -3],
    [-3, .5, 1, 1.5, 1.5, 1, .5, -3],
    [-4, -2, 0, .5, .5, 0, -2, -4],
    [-5, -4, -3, -3, -3, -3, -4, -5]])
pieceMultiplier.set('wq',
    [[-2, -1, -1, -.5, -.5, -1, -1, -2],
    [-1, 0, 0, 0, 0, 0, 0, -1],
    [-1, 0, .5, .5, .5, .5, 0, -1],
    [-.5, 0, .5, .5, .5, .5, 0, -.5],
    [0, 0, .5, .5, .5, .5, 0, -.5],
    [-1, .5, .5, .5, .5, .5, 0, -1],
    [-1, 0, .5, 0, 0, 0, 0, -1],
    [-2, -1, -1, -.5, -.5, -1, -1, -2]])
pieceMultiplier.set('wk',
    [[-3, -4, -4, -5, -5, -4, -4, -3],
    [-3, -4, -4, -5, -5, -4, -4, -3],
    [-3, -4, -4, -5, -5, -4, -4, -3],
    [-3, -4, -4, -5, -5, -4, -4, -3],
    [-2, -3, -3, -4, -4, -3, -3, -2],
    [-1, -2, -2, -2, -2, -2, -2, -1],
    [2, 2, 0, 0, 0, 0, 2, 2],
    [2, 3, 1, 0, 0, 1, 3, 2]])

function reverseArray(array) {
    return array.slice().reverse();
};

function make2DArrayNegative(array) {
    return array.map((x) => {
        return x.map((y) => {
            return -1 * y
        })
    })
}

pieceMultiplier.set('bp', make2DArrayNegative(reverseArray(pieceMultiplier.get('wp'))))
pieceMultiplier.set('br', make2DArrayNegative(reverseArray(pieceMultiplier.get('wr'))))
pieceMultiplier.set('bb', make2DArrayNegative(reverseArray(pieceMultiplier.get('wb'))))
pieceMultiplier.set('bkn', make2DArrayNegative(reverseArray(pieceMultiplier.get('wkn'))))
pieceMultiplier.set('bq', make2DArrayNegative(pieceMultiplier.get('wq')))
pieceMultiplier.set('bk', make2DArrayNegative(reverseArray(pieceMultiplier.get('wk'))))



export function chessBasicWeightedAITurn(board, turn, lastMove, king, leftRook, rightRook, kingPosition) {
    return dispatch => {
        dispatch(startWaiting())
        let color = turn % 2 == 0 ? 'w' : 'b'
        let allAvailableChessMoves = new Map()
        board.forEach((w, i) => {
            w.forEach((v, j) => {
                if (v[0] == color) {
                    let availableMoves = getAvailableChessMoves(board, i, j, v, lastMove, king, leftRook, rightRook, kingPosition)
                    if (availableMoves.size > 0) {
                        allAvailableChessMoves.set(`${i}-${j}`, availableMoves)
                    }
                }
            })
        })
        if (allAvailableChessMoves.size == 0) {
            if (turn % 2 == 0) {
                if (chessCheckForMate(board, kingPosition, 'w')) {
                    dispatch(tttUpdateResult(true, 2))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            } else {
                if (chessCheckForMate(board, kingPosition, 'b')) {
                    dispatch(tttUpdateResult(true, 1))
                } else {
                    dispatch(tttUpdateResult(true, 0))
                }
            }
        } else {
            let { from, to } = getMoveUsingBasicWeightedPositionEvaluation(board, allAvailableChessMoves, color)
            dispatch(chessMovePiece(board, from, to, turn))
        }
        dispatch(stopWaiting())
    }
}

function getMoveUsingBasicWeightedPositionEvaluation(board, allAvailableChessMoves, color) {
    let maxMove = []
    let score = 0
    let boardScore = getBasicWeightedPositionEvaluation(board)
    let started = false
    allAvailableChessMoves.forEach((piece, i) => {
        let from = { piece: board[i[0]][i[2]], position: { row: i[0], col: i[2] } }
        piece.forEach((move, j) => {
            let currScore = boardScore
            currScore -= (basicPieceValue.get(from.piece) + pieceMultiplier.get(from.piece)[from.position.row][from.position.col])
            if (from.piece == 'wp' && move.row == 0) {
                currScore += (basicPieceValue.get('wq') + pieceMultiplier.get('wq')[move.row][move.col])
                from.piece = 'wq'
            } else if (from.piece == 'bp' && move.row == 7) {
                currScore += (basicPieceValue.get('bq') + pieceMultiplier.get('bq')[move.row][move.col])
                from.piece = 'bq'
            } else {
                currScore += (basicPieceValue.get(from.piece) + pieceMultiplier.get(from.piece)[move.row][move.col])
            }

            let oldPiece = board[move.row][move.col]
            if (oldPiece != '') {
                currScore -= (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[move.row][move.col])
            }
            if (move.castle) {
                if (move.col == 6) {
                    currScore += (basicPieceValue.get(`${from.piece[0]}r`) + pieceMultiplier.get(`${from.piece[0]}r`)[move.row][move.col - 1])
                    currScore -= (basicPieceValue.get(`${from.piece[0]}r`) + pieceMultiplier.get(`${from.piece[0]}r`)[move.row][7])
                } else {
                    currScore += (basicPieceValue.get(`${from.piece[0]}r`) + pieceMultiplier.get(`${from.piece[0]}r`)[move.row][move.col + 1])
                    currScore -= (basicPieceValue.get(`${from.piece[0]}r`) + pieceMultiplier.get(`${from.piece[0]}r`)[move.row][0])
                }
            }

            if (!started) {
                score = currScore
                maxMove = [{ from: from, to: move }]
                started = true
            } else {
                if (color == 'w') {
                    if (currScore > score) {
                        score = currScore
                        maxMove = [{ from: from, to: move }]
                    } else if (currScore == score) {
                        maxMove.push({ from: from, to: move })
                    }
                } else {
                    if (currScore < score) {
                        score = currScore
                        maxMove = [{ from: from, to: move }]
                    } else if (currScore == score) {
                        maxMove.push({ from: from, to: move })
                    }
                }
            }
        })
    })

    return maxMove[Math.floor(Math.random() * maxMove.length)]
}

function getBasicWeightedPositionEvaluation(board) {
    let score = 0
    board.forEach((row, i) => {
        row.forEach((piece, j) => {
            if (piece != '') {
                score += basicPieceValue.get(piece) + pieceMultiplier.get(piece)[i][j]
            }
        })
    })

    return score
}

export function chessBasicMinMaxAITurn(board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, boardStateCount) {
    return dispatch => {
        dispatch(startWaiting())
        let score = getBasicWeightedPositionEvaluation(board)
        let { from, to, result, moveScore, nodeCount } = getMoveUsingBasicMinMaxNoOptimization(0, score, board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition)
        console.log(`Basic: Visited ${nodeCount} nodes`)
        if (result == 1) {
            dispatch(tttUpdateResult(true, 1))
        } else if (result == 2) {
            dispatch(tttUpdateResult(true, 2))
        } else if (result == 3) {
            dispatch(tttUpdateResult(true, 2))
        } else {
            dispatch(chessMovePiece(board, from, to, turn, boardStateCount))
        }
        dispatch(stopWaiting())
    }
}


function getMoveUsingBasicMinMaxNoOptimization(level, score, board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition) {
    let maxLevel = 3
    let { color, isWhite } = turn % 2 == 0 ? { color: 'w', isWhite: true } : { color: 'b', isWhite: false }
    let allAvailableChessMoves = []

    //generate moves
    if (isWhite) {
        allAvailableChessMoves = getAllAvailableChessMovesBasicOrder(board, color, isWhite, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition)
    } else {
        allAvailableChessMoves = getAllAvailableChessMovesBasicOrder(board, color, isWhite, lastMove, blackKing, blackLeftRook, blackRightRook, blackKingPosition)
    }

    //end game 
    if (allAvailableChessMoves.length == 0) {
        if (isWhite) {
            if (chessCheckForMate(board, whiteKingPosition, color)) {
                return { from: undefined, to: undefined, result: 2, moveScore: -10000, nodeCount: 0 }
            } else {
                return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
            }
        } else {
            if (chessCheckForMate(board, blackKingPosition, color)) {
                return { from: undefined, to: undefined, result: 1, moveScore: 10000, nodeCount: 0 }
            } else {
                return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
            }
        }
    }

    if (level >= maxLevel) {
        return { from: undefined, to: undefined, result: 0, moveScore: score, nodeCount: 0 }
    }

    let maxMove = []
    let maxScore = 0
    let started = false
    let nodesVisited = 0



    allAvailableChessMoves.forEach((move, i) => {
        let currScore = score
        let piece = board[move.from.row][move.from.col]
        let oldPiece = board[move.to.row][move.to.col]

        //Adjust score
        let a = basicPieceValue.get(piece)
        let b = pieceMultiplier.get(piece)[move.from.row][move.from.col]
        currScore -= (a + b)
        let c = basicPieceValue.get(move.piece)
        let d = pieceMultiplier.get(move.piece)[move.to.row][move.to.col]
        currScore += (c + d)

        if (move.enPassant) {
            currScore -= (basicPieceValue.get(`${isWhite ? 'b' : 'w'}p`) + pieceMultiplier.get(`${isWhite ? 'b' : 'w'}p`)[move.from.row][move.to.col])
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                currScore -= (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][7])
                currScore += (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][5])
            } else {
                currScore -= (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][0])
                currScore += (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][3])
            }
        }

        if (oldPiece != '') {
            currScore -= (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[move.to.row][move.to.col])
        }

        let currScore2 = score + move.scoreDelta

        if (currScore2 != currScore) {
            console.log('Uh Oh. Updated score does not match original on move:')
            console.log(move)
        }

        //Simulate move
        board[move.from.row][move.from.col] = ''
        board[move.to.row][move.to.col] = move.piece
        let enPassantPiece = board[move.from.row][move.to.col]

        if (move.enPassant) {
            board[move.from.row][move.to.col] = ''
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                board[isWhite ? 7 : 0][7] = ''
                board[isWhite ? 7 : 0][5] = `${color}r`
            } else {
                board[isWhite ? 7 : 0][0] = ''
                board[isWhite ? 7 : 0][3] = `${color}r`
            }
        }

        const goDeeper = () => {
            if (isWhite) {
                let { newKing, newKingPosition } = (piece == 'wk') ? { newKing: false, newKingPosition: { row: move.to.row, col: move.to.col } } : { newKing: whiteKing, newKingPosition: whiteKingPosition }
                let newLeftRook = whiteLeftRook && board[7][0] == 'wr'
                let newRightRook = whiteRightRook && board[7][7] == 'wr'

                let { from, to, result, moveScore, nodeCount } = getMoveUsingBasicMinMaxNoOptimization(level + 1, currScore, board, turn + 1, { piece: piece, from: move.from, to: move.to }, newKing, newLeftRook, newRightRook, newKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition)
                return { from, to, result, moveScore, nodeCount }
            } else {
                let { newKing, newKingPosition } = (piece == 'bk') ? { newKing: false, newKingPosition: { row: move.to.row, col: move.to.col } } : { newKing: blackKing, newKingPosition: blackKingPosition }
                let newLeftRook = blackLeftRook && board[7][0] == 'br'
                let newRightRook = blackRightRook && board[7][7] == 'br'

                let { from, to, result, moveScore, nodeCount } = getMoveUsingBasicMinMaxNoOptimization(level + 1, currScore, board, turn + 1, { piece: piece, from: move.from, to: move.to }, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, newKing, newLeftRook, newRightRook, newKingPosition)
                return { from, to, result, moveScore, nodeCount }
            }
        }

        let { from, to, result, moveScore, nodeCount } = goDeeper()

        nodesVisited += 1 + nodeCount

        //Undo simulated move
        board[move.from.row][move.from.col] = piece
        board[move.to.row][move.to.col] = oldPiece

        if (move.enPassant) {
            board[move.from.row][move.to.col] = enPassantPiece
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                board[isWhite ? 7 : 0][5] = ''
                board[isWhite ? 7 : 0][7] = `${color}r`
            } else {
                board[isWhite ? 7 : 0][3] = ''
                board[isWhite ? 7 : 0][0] = `${color}r`
            }
        }


        if (!started) {
            maxScore = moveScore
            maxMove = [move]
            started = true
        } else {
            if (isWhite) {
                if (moveScore > maxScore) {
                    maxScore = moveScore
                    maxMove = [move]
                } else if (moveScore == maxScore) {
                    maxMove.push(move)
                }
            } else {
                if (moveScore < maxScore) {
                    maxScore = moveScore
                    maxMove = [move]
                } else if (moveScore == maxScore) {
                    maxMove.push(move)
                }
            }
        }
    })

    let chosenMove = maxMove[Math.floor(Math.random() * maxMove.length)]

    return { from: { piece: chosenMove.piece, position: chosenMove.from }, to: { row: chosenMove.to.row, col: chosenMove.to.col, enPassant: chosenMove.enPassant, castle: chosenMove.castle }, result: 0, moveScore: maxScore, nodeCount: nodesVisited }
}

function getAllAvailableChessMovesBasicOrder(board, color, isWhite, lastMove, king, leftRook, rightRook, kingPosition) {
    let allAvailableChessMoves = []
    board.forEach((w, row) => {
        w.forEach((piece, col) => {
            if (piece[0] == color) {
                let oldPiece = ''
                let newRow = row
                let newCol = col
                let scoreDelta = 0

                if (piece[1] == 'p') { //Pawn move
                    if (isWhite) {
                        newRow = row - 1
                        if (board[newRow][col] == '') {
                            oldPiece = board[newRow][col]
                            board[row][col] = ''
                            board[newRow][col] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                if (newRow == 0) {
                                    scoreDelta = (basicPieceValue.get('wq') + pieceMultiplier.get('wq')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'wq', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })

                                    scoreDelta = (basicPieceValue.get('wr') + pieceMultiplier.get('wr')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'wr', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })

                                    scoreDelta = (basicPieceValue.get('wb') + pieceMultiplier.get('wb')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'wb', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })

                                    scoreDelta = (basicPieceValue.get('wkn') + pieceMultiplier.get('wkn')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'wkn', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })
                                } else {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][col])
                                        - (pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })
                                }
                            }
                            board[row][col] = piece
                            board[newRow][col] = oldPiece
                            if (row == 6 && board[row - 2][col] == '') {
                                newRow = row - 2
                                oldPiece = board[newRow][col]
                                board[row][col] = ''
                                board[newRow][col] = piece
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][col])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][col])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                                board[row][col] = piece
                                board[newRow][col] = oldPiece
                            }
                        }
                        newRow = row - 1
                        newCol = col + 1
                        if (col < 7 && board[newRow][newCol][0] == 'b') {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                if (newRow == 0) {
                                    scoreDelta = (basicPieceValue.get('wq') + pieceMultiplier.get('wq')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wq', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('wr') + pieceMultiplier.get('wr')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wr', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('wb') + pieceMultiplier.get('wb')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wb', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('wkn') + pieceMultiplier.get('wkn')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wkn', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                } else {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        newCol = col - 1
                        if (col > 0 && board[newRow][newCol][0] == 'b') {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                if (newRow == 0) {
                                    scoreDelta = (basicPieceValue.get('wq') + pieceMultiplier.get('wq')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wq', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('wr') + pieceMultiplier.get('wr')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wr', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('wb') + pieceMultiplier.get('wb')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wb', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('wkn') + pieceMultiplier.get('wkn')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'wkn', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                } else {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        if (lastMove.piece == 'bp' && lastMove.from.row == 1 && lastMove.to.row == row && row == 3) {
                            newRow = row - 1
                            if (lastMove.to.col == (col - 1)) {
                                newCol = col - 1
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get('bp') + pieceMultiplier.get('bp')[row][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: true, enPassant: true })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
                            } else if (lastMove.to.col == (col + 1)) {
                                newCol = col + 1
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get('bp') + pieceMultiplier.get('bp')[row][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: true, capture: true, enPassant: true })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
                            }
                        }
                    } else {
                        newRow = row + 1
                        if (board[newRow][col] == '') {
                            oldPiece = board[newRow][col]
                            board[row][col] = ''
                            board[newRow][col] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                if (newRow == 7) {
                                    scoreDelta = (basicPieceValue.get('bq') + pieceMultiplier.get('bq')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'bq', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })

                                    scoreDelta = (basicPieceValue.get('br') + pieceMultiplier.get('br')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'br', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })

                                    scoreDelta = (basicPieceValue.get('bb') + pieceMultiplier.get('bb')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'bb', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })

                                    scoreDelta = (basicPieceValue.get('bkn') + pieceMultiplier.get('bkn')[newRow][col])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: 'bkn', from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })
                                } else {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][col])
                                        - (pieceMultiplier.get(piece)[row][col])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: false })
                                }
                            }
                            board[row][col] = piece
                            board[newRow][col] = oldPiece
                            if (row == 1 && board[row + 2][col] == '') {
                                newRow = row + 2
                                oldPiece = board[newRow][col]
                                board[row][col] = ''
                                board[newRow][col] = piece
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][col])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][col])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                                board[row][col] = piece
                                board[newRow][col] = oldPiece
                            }
                        }
                        newRow = row + 1
                        newCol = col + 1
                        if (col < 7 && board[newRow][newCol][0] == 'w') {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                if (newRow == 7) {
                                    scoreDelta = (basicPieceValue.get('bq') + pieceMultiplier.get('bq')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'bq', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('br') + pieceMultiplier.get('br')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'br', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('bb') + pieceMultiplier.get('bb')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'bb', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('bkn') + pieceMultiplier.get('bkn')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'bkn', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                } else {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        newRow = row + 1
                        newCol = col - 1
                        if (col > 0 && board[newRow][newCol][0] == 'w') {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                if (newRow == 7) {
                                    scoreDelta = (basicPieceValue.get('bq') + pieceMultiplier.get('bq')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'bq', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('br') + pieceMultiplier.get('br')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'br', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('bb') + pieceMultiplier.get('bb')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'bb', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })

                                    scoreDelta = (basicPieceValue.get('bkn') + pieceMultiplier.get('bkn')[newRow][newCol])
                                        - (basicPieceValue.get(piece) + pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: 'bkn', from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                } else {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        if (lastMove.piece == 'wp' && lastMove.from.row == 6 && lastMove.to.row == row && row == 4) {
                            newRow = row + 1
                            if (lastMove.to.col == (col - 1)) {
                                newCol = col - 1
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get('wp') + pieceMultiplier.get('wp')[row][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: true, enPassant: true })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
                            } else if (lastMove.to.col == (col + 1)) {
                                newCol = col + 1
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get('wp') + pieceMultiplier.get('wp')[row][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: true, enPassant: true })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
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
                                scoreDelta = (pieceMultiplier.get(piece)[currRowTop][col])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRowTop][col])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRowTop, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                scoreDelta = (pieceMultiplier.get(piece)[currRowBottom][col])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRowBottom][col])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRowBottom, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                scoreDelta = (pieceMultiplier.get(piece)[row][currLeftCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[row][currLeftCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: currLeftCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                scoreDelta = (pieceMultiplier.get(piece)[row][currRightCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[row][currRightCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: currRightCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                        newRow = row - 2
                        newCol = col - 1
                        if (col > 0 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        newRow = row - 2
                        newCol = col + 1
                        if (col < 7 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                    }
                    if (row > 0) {
                        newRow = row - 1
                        newCol = col - 2
                        if (col > 1 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        newRow = row - 1
                        newCol = col + 2
                        if (col < 6 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                    }
                    if (row < 6) {
                        newRow = row + 2
                        newCol = col - 1
                        if (col > 0 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        newRow = row + 2
                        newCol = col + 1
                        if (col < 7 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                    }
                    if (row < 7) {
                        newRow = row + 1
                        newCol = col - 2
                        if (col > 1 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
                        }
                        newRow = row + 1
                        newCol = col + 2
                        if (col < 6 && board[newRow][newCol][0] != color) {
                            oldPiece = board[newRow][newCol]
                            board[row][col] = ''
                            board[newRow][newCol] = piece
                            if (!chessCheckForMate(board, kingPosition, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][newCol] = oldPiece
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currLeftCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currLeftCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currLeftCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currRightCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currRightCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currRightCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currLeftCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currLeftCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currLeftCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currRightCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currRightCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currRightCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                scoreDelta = (pieceMultiplier.get(piece)[row][currLeftCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[row][currLeftCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: currLeftCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                scoreDelta = (pieceMultiplier.get(piece)[row][currRightCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[row][currRightCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: currRightCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currLeftCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currLeftCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currLeftCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][col])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][col])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currRightCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currRightCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currRightCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currLeftCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currLeftCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currLeftCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][col])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][col])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                                    scoreDelta = (pieceMultiplier.get(piece)[currRow][currRightCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[currRow][currRightCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: currRow, col: currRightCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
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
                        newRow = row - 1
                        if (col > 0) {
                            newCol = col - 1
                            if (board[newRow][newCol][0] != color) {
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
                            }
                        }
                        if (board[newRow][col][0] != color) {
                            oldPiece = board[newRow][col]
                            board[row][col] = ''
                            board[newRow][col] = piece
                            if (!chessCheckForMate(board, { row: newRow, col: col }, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][col])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][col])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][col] = oldPiece
                        }
                        if (col < 7) {
                            newCol = col + 1
                            if (board[newRow][newCol][0] != color) {
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
                            }
                        }
                    }

                    //Middle row
                    if (col > 0) {
                        newCol = col - 1
                        if (board[row][newCol][0] != color) {
                            oldPiece = board[row][newCol]
                            board[row][col] = ''
                            board[row][newCol] = piece
                            if (!chessCheckForMate(board, { row: row, col: newCol }, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[row][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[row][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[row][newCol] = oldPiece
                        }
                    }
                    if (col < 7) {
                        newCol = col + 1
                        if (board[row][newCol][0] != color) {
                            oldPiece = board[row][newCol]
                            board[row][col] = ''
                            board[row][newCol] = piece
                            if (!chessCheckForMate(board, { row: row, col: newCol }, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[row][newCol])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[row][newCol])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[row][newCol] = oldPiece
                        }
                    }

                    //Bottom row
                    if (row < 7) {
                        newRow = row + 1
                        if (col > 0) {
                            newCol = col - 1
                            if (board[newRow][newCol][0] != color) {
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
                            }
                        }
                        if (board[newRow][col][0] != color) {
                            oldPiece = board[newRow][col]
                            board[row][col] = ''
                            board[newRow][col] = piece
                            if (!chessCheckForMate(board, { row: newRow, col: col }, color)) {
                                scoreDelta = (pieceMultiplier.get(piece)[newRow][col])
                                    - (pieceMultiplier.get(piece)[row][col])
                                    - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][col])
                                allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: col }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                            }
                            board[row][col] = piece
                            board[newRow][col] = oldPiece
                        }
                        if (col < 7) {
                            newCol = col + 1
                            if (board[newRow][newCol][0] != color) {
                                oldPiece = board[newRow][newCol]
                                board[row][col] = ''
                                board[newRow][newCol] = piece
                                if (!chessCheckForMate(board, { row: newRow, col: newCol }, color)) {
                                    scoreDelta = (pieceMultiplier.get(piece)[newRow][newCol])
                                        - (pieceMultiplier.get(piece)[row][col])
                                        - (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[newRow][newCol])
                                    allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: newRow, col: newCol }, scoreDelta: scoreDelta, capture: oldPiece != '' })
                                }
                                board[row][col] = piece
                                board[newRow][newCol] = oldPiece
                            }
                        }
                    }

                    //Castle
                    if (king) {
                        if (leftRook) {
                            if (board[row][3] == '' && board[row][2] == '' && board[row][1] == '') {
                                //Check for check only on first two spots and curr
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    board[row][col] = ''
                                    board[row][3] = piece
                                    if (!chessCheckForMate(board, { row: row, col: 3 }, color)) {
                                        board[row][3] = ''
                                        board[row][2] = piece
                                        if (!chessCheckForMate(board, { row: row, col: 2 }, color)) {
                                            scoreDelta = (pieceMultiplier.get(piece)[row][2])
                                                - (pieceMultiplier.get(piece)[row][col])
                                                - (pieceMultiplier.get(`${color}r`)[row][0])
                                                + (pieceMultiplier.get(`${color}r`)[row][3])
                                            allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: 2 }, scoreDelta: scoreDelta, capture: false, castle: true })
                                        }
                                    }
                                    board[row][col] = piece
                                    board[row][3] = ''
                                    board[row][2] = ''
                                }
                            }
                        }
                        if (rightRook) {
                            if (board[row][5] == '' && board[row][6] == '') {
                                //Check for check on both spots and curr
                                if (!chessCheckForMate(board, kingPosition, color)) {
                                    board[row][col] = ''
                                    board[row][5] = piece
                                    if (!chessCheckForMate(board, { row: row, col: 5 }, color)) {
                                        board[row][5] = ''
                                        board[row][6] = piece
                                        if (!chessCheckForMate(board, { row: row, col: 6 }, color)) {
                                            scoreDelta = (pieceMultiplier.get(piece)[row][6])
                                                - (pieceMultiplier.get(piece)[row][col])
                                                - (pieceMultiplier.get(`${color}r`)[row][7])
                                                + (pieceMultiplier.get(`${color}r`)[row][5])
                                            allAvailableChessMoves.push({ piece: piece, from: { row: row, col: col }, to: { row: row, col: 6 }, scoreDelta: scoreDelta, capture: false, castle: true })
                                        }
                                    }
                                    board[row][col] = piece
                                    board[row][5] = ''
                                    board[row][6] = ''
                                }
                            }
                        }
                    }
                }
            }
        })
    })

    return allAvailableChessMoves
}

export function chessAlphaBetaMinMaxAITurn(board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, maxRecursionLevel, lastThreeMoveNodeCount, boardStateCount) {
    return dispatch => {
        dispatch(startWaiting())
        let score = getBasicWeightedPositionEvaluation(board)
        let level = 0
        let alpha = -10000
        let beta = 10000
        let maxLevel = maxRecursionLevel
        // if((lastThreeMoveNodeCount[0]<=10000 && lastThreeMoveNodeCount[1]<=10000 && lastThreeMoveNodeCount[2]<=10000)){
        //     maxLevel +=1
        //     console.log("Increased Max Recursion Level")
        //     dispatch(setMaxRecursionLevel(maxLevel))
        // }
        let { from, to, result, moveScore, nodeCount } = getMoveUsingBasicMinMaxWithAlphaBeta(maxLevel, alpha, beta, level, score, board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, boardStateCount)
        console.log(`Alpha Beta: Visited ${nodeCount} nodes`)
        //dispatch(setLastThreeMoveNodeCount([lastThreeMoveNodeCount[1],lastThreeMoveNodeCount[2],nodeCount]))
        if (result == 1) {
            dispatch(tttUpdateResult(true, 1))
        } else if (result == 2) {
            dispatch(tttUpdateResult(true, 2))
        } else if (result == 3) {
            dispatch(tttUpdateResult(true, 0))
        } else {
            dispatch(chessMovePiece(board, from, to, turn, boardStateCount))
        }
        dispatch(stopWaiting())
    }
}


function getMoveUsingBasicMinMaxWithAlphaBeta(maxLevel, alpha, beta, level, score, board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, boardStateCount) {
    let { color, isWhite } = turn % 2 == 0 ? { color: 'w', isWhite: true } : { color: 'b', isWhite: false }
    let allAvailableChessMoves = []

    //Tie by repeat
    let boardRep = `${board}`
    if (boardStateCount.get(boardRep) >= 3) {
        return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
    }

    //generate moves
    if (isWhite) {
        allAvailableChessMoves = getAllAvailableChessMovesBasicOrder(board, color, isWhite, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition)
    } else {
        allAvailableChessMoves = getAllAvailableChessMovesBasicOrder(board, color, isWhite, lastMove, blackKing, blackLeftRook, blackRightRook, blackKingPosition)
    }

    //end game 
    if (allAvailableChessMoves.length == 0) {
        if (isWhite) {
            if (chessCheckForMate(board, whiteKingPosition, color)) {
                return { from: undefined, to: undefined, result: 2, moveScore: -10000, nodeCount: 0 }
            } else {
                return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
            }
        } else {
            if (chessCheckForMate(board, blackKingPosition, color)) {
                return { from: undefined, to: undefined, result: 1, moveScore: 10000, nodeCount: 0 }
            } else {
                return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
            }
        }
    }

    if (level >= maxLevel) {
        return { from: undefined, to: undefined, result: 0, moveScore: score, nodeCount: 0 }
    }

    let maxMove = []
    let maxScore = 0
    let started = false
    let nodesVisited = 0

    //least impact to greatest
    allAvailableChessMoves.sort((a, b) => {
        return Math.abs(a.scoreDelta) - Math.abs(b.scoreDelta)
    })

    //complex sort least impact to greatest with takes at start
    // allAvailableChessMoves.sort((a, b) => {
    //     let aD = Math.abs(a.scoreDelta)
    //     let bD = Math.abs(b.scoreDelta)
    //     if (aD >= 10) {
    //         if (bD >= 10) {
    //             return aD - bD
    //         } else {
    //             return bD - aD
    //         }
    //     }
    //     if (bD > 5) {
    //         return bD - aD
    //     }
    //     return aD - bD
    // })

    //greatest impact to least
    // allAvailableChessMoves.sort((a,b) => { 
    //     return Math.abs(b.scoreDelta)-Math.abs(a.scoreDelta)
    // })

    allAvailableChessMoves.every((move, i) => {
        let currScore = score
        let piece = board[move.from.row][move.from.col]
        let oldPiece = board[move.to.row][move.to.col]

        //Adjust score
        let a = basicPieceValue.get(piece)
        let b = pieceMultiplier.get(piece)[move.from.row][move.from.col]
        currScore -= (a + b)
        let c = basicPieceValue.get(move.piece)
        let d = pieceMultiplier.get(move.piece)[move.to.row][move.to.col]
        currScore += (c + d)

        if (move.enPassant) {
            currScore -= (basicPieceValue.get(`${isWhite ? 'b' : 'w'}p`) + pieceMultiplier.get(`${isWhite ? 'b' : 'w'}p`)[move.from.row][move.to.col])
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                currScore -= (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][7])
                currScore += (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][5])
            } else {
                currScore -= (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][0])
                currScore += (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][3])
            }
        }

        if (oldPiece != '') {
            currScore -= (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[move.to.row][move.to.col])
        }

        let currScore2 = score + move.scoreDelta

        if (currScore2 != currScore) {
            console.log('Uh Oh. Updated score does not match original on move:')
            console.log(move)
        }

        //Simulate move
        board[move.from.row][move.from.col] = ''
        board[move.to.row][move.to.col] = move.piece
        let enPassantPiece = board[move.from.row][move.to.col]

        if (move.enPassant) {
            board[move.from.row][move.to.col] = ''
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                board[isWhite ? 7 : 0][7] = ''
                board[isWhite ? 7 : 0][5] = `${color}r`
            } else {
                board[isWhite ? 7 : 0][0] = ''
                board[isWhite ? 7 : 0][3] = `${color}r`
            }
        }


        boardRep = `${board}`
        if (boardStateCount.has(boardRep)) {
            boardStateCount.set(boardRep, boardStateCount.get(boardRep) + 1)
        } else {
            boardStateCount.set(boardRep, 1)
        }

        const goDeeper = () => {
            if (isWhite) {
                let { newKing, newKingPosition } = (piece == 'wk') ? { newKing: false, newKingPosition: { row: move.to.row, col: move.to.col } } : { newKing: whiteKing, newKingPosition: whiteKingPosition }
                let newLeftRook = whiteLeftRook && board[7][0] == 'wr'
                let newRightRook = whiteRightRook && board[7][7] == 'wr'

                let { from, to, result, moveScore, nodeCount } = getMoveUsingBasicMinMaxWithAlphaBeta(maxLevel, alpha, beta, level + 1, currScore2, board, turn + 1, move, newKing, newLeftRook, newRightRook, newKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, boardStateCount)
                return { from, to, result, moveScore, nodeCount }
            } else {
                let { newKing, newKingPosition } = (piece == 'bk') ? { newKing: false, newKingPosition: { row: move.to.row, col: move.to.col } } : { newKing: blackKing, newKingPosition: blackKingPosition }
                let newLeftRook = blackLeftRook && board[7][0] == 'br'
                let newRightRook = blackRightRook && board[7][7] == 'br'

                let { from, to, result, moveScore, nodeCount } = getMoveUsingBasicMinMaxWithAlphaBeta(maxLevel, alpha, beta, level + 1, currScore2, board, turn + 1, move, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, newKing, newLeftRook, newRightRook, newKingPosition, boardStateCount)
                return { from, to, result, moveScore, nodeCount }
            }
        }

        let { from, to, result, moveScore, nodeCount } = goDeeper()

        nodesVisited += 1 + nodeCount

        //Undo simulated move
        boardStateCount.set(boardRep, boardStateCount.get(boardRep) - 1)
        board[move.from.row][move.from.col] = piece
        board[move.to.row][move.to.col] = oldPiece

        if (move.enPassant) {
            board[move.from.row][move.to.col] = enPassantPiece
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                board[isWhite ? 7 : 0][5] = ''
                board[isWhite ? 7 : 0][7] = `${color}r`
            } else {
                board[isWhite ? 7 : 0][3] = ''
                board[isWhite ? 7 : 0][0] = `${color}r`
            }
        }


        if (!started) {
            maxScore = moveScore
            maxMove = [move]
            started = true
        } else {
            if (isWhite) {
                if (moveScore > maxScore) {
                    maxScore = moveScore
                    maxMove = [move]
                } else if (moveScore == maxScore) {
                    maxMove.push(move)
                }
                alpha = Math.max(alpha, moveScore)
                if (beta <= alpha) {
                    return false
                    // let chosenMove = maxMove[Math.floor(Math.random() * maxMove.length)]

                    // return { from: { piece: chosenMove.piece, position: chosenMove.from }, to: { row: chosenMove.to.row, col: chosenMove.to.col, enPassant: chosenMove.enPassant, castle: chosenMove.castle }, result: 0, moveScore: maxScore, nodeCount: nodesVisited }
                }
            } else {
                if (moveScore < maxScore) {
                    maxScore = moveScore
                    maxMove = [move]
                } else if (moveScore == maxScore) {
                    maxMove.push(move)
                }
                beta = Math.min(beta, moveScore)
                if (beta <= alpha) {
                    return false
                    // let chosenMove = maxMove[Math.floor(Math.random() * maxMove.length)]

                    // return { from: { piece: chosenMove.piece, position: chosenMove.from }, to: { row: chosenMove.to.row, col: chosenMove.to.col, enPassant: chosenMove.enPassant, castle: chosenMove.castle }, result: 0, moveScore: maxScore, nodeCount: nodesVisited }
                }
            }
        }
        return true
    })

    let chosenMove = maxMove[Math.floor(Math.random() * maxMove.length)]

    return { from: { piece: chosenMove.piece, position: chosenMove.from }, to: { row: chosenMove.to.row, col: chosenMove.to.col, enPassant: chosenMove.enPassant, castle: chosenMove.castle }, result: 0, moveScore: maxScore, nodeCount: nodesVisited }
}

export function chessAlphaBetaAndQuiescenceMinMaxAITurn(board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, maxRecursionLevel, lastThreeMoveNodeCount, boardStateCount) {
    return dispatch => {
        dispatch(startWaiting())
        let score = getBasicWeightedPositionEvaluation(board)
        let level = 0
        let alpha = -10000
        let beta = 10000
        let maxLevel = maxRecursionLevel
        // if((lastThreeMoveNodeCount[0]<=10000 && lastThreeMoveNodeCount[1]<=10000 && lastThreeMoveNodeCount[2]<=10000)){
        //     maxLevel +=1
        //     console.log("Increased Max Recursion Level")
        //     dispatch(setMaxRecursionLevel(maxLevel))
        // }
        let { from, to, result, moveScore, nodeCount } = getMoveUsingQuiescenceMinMaxWithAlphaBeta(maxLevel, alpha, beta, level, score, board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, boardStateCount)
        console.log(`Quiescence: Visited ${nodeCount} nodes`)
        //dispatch(setLastThreeMoveNodeCount([lastThreeMoveNodeCount[1],lastThreeMoveNodeCount[2],nodeCount]))
        if (result == 1) {
            dispatch(tttUpdateResult(true, 1))
        } else if (result == 2) {
            dispatch(tttUpdateResult(true, 2))
        } else if (result == 3) {
            dispatch(tttUpdateResult(true, 0))
        } else {
            dispatch(chessMovePiece(board, from, to, turn, boardStateCount))
        }
        dispatch(stopWaiting())
    }
}


function getMoveUsingQuiescenceMinMaxWithAlphaBeta(maxLevel, alpha, beta, level, score, board, turn, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, boardStateCount) {
    let { color, isWhite } = turn % 2 == 0 ? { color: 'w', isWhite: true } : { color: 'b', isWhite: false }
    let allAvailableChessMoves = []

    //Tie by repeat
    let boardRep = `${board}`
    if (boardStateCount.get(boardRep) >= 3) {
        return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
    }

    //generate moves
    if (isWhite) {
        allAvailableChessMoves = getAllAvailableChessMovesBasicOrder(board, color, isWhite, lastMove, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition)
    } else {
        allAvailableChessMoves = getAllAvailableChessMovesBasicOrder(board, color, isWhite, lastMove, blackKing, blackLeftRook, blackRightRook, blackKingPosition)
    }

    //end game 
    if (allAvailableChessMoves.length == 0) {
        if (isWhite) {
            if (chessCheckForMate(board, whiteKingPosition, color)) {
                return { from: undefined, to: undefined, result: 2, moveScore: -10000, nodeCount: 0 }
            } else {
                return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
            }
        } else {
            if (chessCheckForMate(board, blackKingPosition, color)) {
                return { from: undefined, to: undefined, result: 1, moveScore: 10000, nodeCount: 0 }
            } else {
                return { from: undefined, to: undefined, result: 3, moveScore: 0, nodeCount: 0 }
            }
        }
    }

    let quiescence = level >= maxLevel

    let maxMove = []
    let maxScore = 0
    let started = false
    let nodesVisited = 0
    let ogNodes = 0

    //least impact to greatest
    // allAvailableChessMoves.sort((a,b) => { 
    //     return Math.abs(a.scoreDelta)-Math.abs(b.scoreDelta)
    // })

    //complex sort least impact to greatest with takes at start
    if (!quiescence) {
        allAvailableChessMoves.sort((a, b) => {
            let aD = Math.abs(a.scoreDelta)
            let bD = Math.abs(b.scoreDelta)
            if (aD >= 10) {
                if (bD >= 10) {
                    return aD - bD
                } else {
                    return bD - aD
                }
            }
            if (bD > 5) {
                return bD - aD
            }
            return aD - bD
        })
    }
    //greatest impact to least
    if (quiescence) {
        allAvailableChessMoves.sort((a, b) => {
            return Math.abs(b.scoreDelta) - Math.abs(a.scoreDelta)
        })
    }

    allAvailableChessMoves.every((move, i) => {
        if (quiescence && (!move.capture || lastMove.to.row != move.to.row || lastMove.to.col != move.to.col)) {
            return true
        }
        // if(quiescence){
        //     //console.log('added')
        // }
        // let currScore = score
        let piece = board[move.from.row][move.from.col]
        let oldPiece = board[move.to.row][move.to.col]

        // //Adjust score
        // let a = basicPieceValue.get(piece)
        // let b = pieceMultiplier.get(piece)[move.from.row][move.from.col]
        // currScore -= (a + b)
        // let c = basicPieceValue.get(move.piece)
        // let d = pieceMultiplier.get(move.piece)[move.to.row][move.to.col]
        // currScore += (c + d)

        // if (move.enPassant) {
        //     currScore -= (basicPieceValue.get(`${isWhite ? 'b' : 'w'}p`) + pieceMultiplier.get(`${isWhite ? 'b' : 'w'}p`)[move.from.row][move.to.col])
        // } else if (move.castle) {
        //     if (move.to.col > move.from.col) {
        //         currScore -= (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][7])
        //         currScore += (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][5])
        //     } else {
        //         currScore -= (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][0])
        //         currScore += (basicPieceValue.get(`${color}r`) + pieceMultiplier.get(`${color}r`)[isWhite ? 7 : 0][3])
        //     }
        // }

        // if (oldPiece != '') {
        //     currScore -= (basicPieceValue.get(oldPiece) + pieceMultiplier.get(oldPiece)[move.to.row][move.to.col])
        // }

        let currScore2 = score + move.scoreDelta

        // if (currScore2 != currScore) {
        //     console.log('Uh Oh. Updated score does not match original on move:')
        //     console.log(move)
        // }

        //Simulate move
        board[move.from.row][move.from.col] = ''
        board[move.to.row][move.to.col] = move.piece
        let enPassantPiece = board[move.from.row][move.to.col]

        if (move.enPassant) {
            board[move.from.row][move.to.col] = ''
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                board[isWhite ? 7 : 0][7] = ''
                board[isWhite ? 7 : 0][5] = `${color}r`
            } else {
                board[isWhite ? 7 : 0][0] = ''
                board[isWhite ? 7 : 0][3] = `${color}r`
            }
        }


        boardRep = `${board}`
        if (boardStateCount.has(boardRep)) {
            boardStateCount.set(boardRep, boardStateCount.get(boardRep) + 1)
        } else {
            boardStateCount.set(boardRep, 1)
        }

        const goDeeper = () => {
            if (isWhite) {
                let { newKing, newKingPosition } = (piece == 'wk') ? { newKing: false, newKingPosition: { row: move.to.row, col: move.to.col } } : { newKing: whiteKing, newKingPosition: whiteKingPosition }
                let newLeftRook = whiteLeftRook && board[7][0] == 'wr'
                let newRightRook = whiteRightRook && board[7][7] == 'wr'

                let { from, to, result, moveScore, nodeCount } = getMoveUsingQuiescenceMinMaxWithAlphaBeta(maxLevel, alpha, beta, level + 1, currScore2, board, turn + 1, move, newKing, newLeftRook, newRightRook, newKingPosition, blackKing, blackLeftRook, blackRightRook, blackKingPosition, boardStateCount)
                return { from, to, result, moveScore, nodeCount }
            } else {
                let { newKing, newKingPosition } = (piece == 'bk') ? { newKing: false, newKingPosition: { row: move.to.row, col: move.to.col } } : { newKing: blackKing, newKingPosition: blackKingPosition }
                let newLeftRook = blackLeftRook && board[7][0] == 'br'
                let newRightRook = blackRightRook && board[7][7] == 'br'

                let { from, to, result, moveScore, nodeCount } = getMoveUsingQuiescenceMinMaxWithAlphaBeta(maxLevel, alpha, beta, level + 1, currScore2, board, turn + 1, move, whiteKing, whiteLeftRook, whiteRightRook, whiteKingPosition, newKing, newLeftRook, newRightRook, newKingPosition, boardStateCount)
                return { from, to, result, moveScore, nodeCount }
            }
        }

        let { from, to, result, moveScore, nodeCount } = goDeeper()

        nodesVisited += 1 + nodeCount
        ogNodes += 1

        //Undo simulated move
        boardStateCount.set(boardRep, boardStateCount.get(boardRep) - 1)
        board[move.from.row][move.from.col] = piece
        board[move.to.row][move.to.col] = oldPiece

        if (move.enPassant) {
            board[move.from.row][move.to.col] = enPassantPiece
        } else if (move.castle) {
            if (move.to.col > move.from.col) {
                board[isWhite ? 7 : 0][5] = ''
                board[isWhite ? 7 : 0][7] = `${color}r`
            } else {
                board[isWhite ? 7 : 0][3] = ''
                board[isWhite ? 7 : 0][0] = `${color}r`
            }
        }


        if (!started) {
            maxScore = moveScore
            maxMove = [move]
            started = true
        } else {
            if (isWhite) {
                if (moveScore > maxScore) {
                    maxScore = moveScore
                    maxMove = [move]
                } else if (moveScore == maxScore) {
                    maxMove.push(move)
                }
                alpha = Math.max(alpha, moveScore)
                if (beta <= alpha) {
                    return false
                    // let chosenMove = maxMove[Math.floor(Math.random() * maxMove.length)]

                    // return { from: { piece: chosenMove.piece, position: chosenMove.from }, to: { row: chosenMove.to.row, col: chosenMove.to.col, enPassant: chosenMove.enPassant, castle: chosenMove.castle }, result: 0, moveScore: maxScore, nodeCount: nodesVisited }
                }
            } else {
                if (moveScore < maxScore) {
                    maxScore = moveScore
                    maxMove = [move]
                } else if (moveScore == maxScore) {
                    maxMove.push(move)
                }
                beta = Math.min(beta, moveScore)
                if (beta <= alpha) {
                    return false
                    // let chosenMove = maxMove[Math.floor(Math.random() * maxMove.length)]

                    // return { from: { piece: chosenMove.piece, position: chosenMove.from }, to: { row: chosenMove.to.row, col: chosenMove.to.col, enPassant: chosenMove.enPassant, castle: chosenMove.castle }, result: 0, moveScore: maxScore, nodeCount: nodesVisited }
                }
            }
        }
        return true
    })

    // if(level==(maxLevel-1)){
    //     console.log(`Added: ${nodesVisited-ogNodes}`)
    // }

    if (maxMove.length == 0) {
        return { from: undefined, to: undefined, result: 0, moveScore: score, nodeCount: nodesVisited }
    }

    let chosenMove = maxMove[Math.floor(Math.random() * maxMove.length)]

    return { from: { piece: chosenMove.piece, position: chosenMove.from }, to: { row: chosenMove.to.row, col: chosenMove.to.col, enPassant: chosenMove.enPassant, castle: chosenMove.castle }, result: 0, moveScore: maxScore, nodeCount: nodesVisited }
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

/**************************************************Pixel Perfect ****************************************/


export function setPPGoalData(data) {
    return {
        type: Action.SetPPGoalData,
        payload: data
    }
}

export function setPPBestData(data) {
    return {
        type: Action.SetPPBestData,
        payload: data
    }
}

export function setPPCurrData(data) {
    return {
        type: Action.SetPPCurrData,
        payload: data
    }
}

export function setPPStarted(data) {
    return {
        type: Action.SetPPStarted,
        payload: data
    }
}

export function setPPAccuracy(data) {
    return {
        type: Action.SetPPAccuracy,
        payload: data
    }
}

export function setPPGenerationCount(data) {
    return {
        type: Action.SetPPGenerationCount,
        payload: data
    }
}

export function setPPCurrAccuracy(data) {
    return {
        type: Action.SetPPCurrAccuracy,
        payload: data
    }
}

export function setPPChoosePicture(data) {
    return {
        type: Action.SetPPChoosePicture,
        payload: data
    }
}

export function setPPActivePicture(data) {
    return {
        type: Action.SetPPActivePicture,
        payload: data
    }
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

export function startPP(goalData, width, height) {
    return dispatch => {
        dispatch(setPPGoalData(goalData))
        let pix = goalData.data
        let newData = new ImageData(width, height)
        let newPix = newData.data
        let total = 0
        let count = 0
        for (let i = 0, n = pix.length; i < n; i += 4) {
            newPix[i] = Math.random() * 256; // red
            let a = (255 - Math.abs(newPix[i] - pix[i])) / 255
            newPix[i + 1] = Math.random() * 256; // green
            let b = (255 - Math.abs(newPix[i + 1] - pix[i + 1])) / 255
            newPix[i + 2] = Math.random() * 256; // blue
            let c = (255 - Math.abs(newPix[i + 2] - pix[i + 2])) / 255
            newPix[i + 3] = 255

            let d = (a + b + c) / 3
            total += d
            count += 1
        }
        dispatch(setPPCurrData(newData))
        dispatch(setPPAccuracy(total / count))

        dispatch(setPPStarted(true))
    }
}

export function stepPP(goalData, currData, width, height) {
    return dispatch => {

        let mr = 5
        let pix = goalData.data
        let currPix = currData.data

        let newData = new ImageData(width, height)
        let newPix = newData.data
        let count = 0
        let total = 0
        for (let i = 0, n = pix.length; i < n; i += 4) {
            let a = pix[i]
            let maxA = currPix[i]
            let maxAAcc = (255 - Math.abs(maxA - a)) / 255

            let b = pix[i + 1]
            let maxB = currPix[i + 1]
            let maxBAcc = (255 - Math.abs(maxB - b)) / 255

            let c = pix[i + 2]
            let maxC = currPix[i + 2]
            let maxCAcc = (255 - Math.abs(maxC - c)) / 255

            for (let j = 0; j < 10; j++) {
                let newVal = (currPix[i] + getRandomIntInclusive(-mr, mr)) % 255
                let newAcc = (255 - Math.abs(newVal - a)) / 255

                if (newAcc > maxAAcc) {
                    maxAAcc = newAcc
                    maxA = newVal
                }

                newVal = (currPix[i + 1] + getRandomIntInclusive(-mr, mr)) % 255
                newAcc = (255 - Math.abs(newVal - b)) / 255

                if (newAcc > maxBAcc) {
                    maxBAcc = newAcc
                    maxB = newVal
                }


                newVal = (currPix[i + 2] + getRandomIntInclusive(-mr, mr)) % 255
                newAcc = (255 - Math.abs(newVal - c)) / 255

                if (newAcc > maxCAcc) {
                    maxCAcc = newAcc
                    maxC = newVal
                }
            }
            
            newPix[i] = maxA // red
            newPix[i + 1] = maxB // green
            newPix[i + 2] = maxC // blue

            newPix[i + 3] = 255

            let d = (maxAAcc + maxBAcc + maxCAcc) / 3


            total += d
            count++
        }

        dispatch(setPPCurrData(newData))
        dispatch(setPPAccuracy(total / count))
    }
}

export function startPPTri(goalData,context,context2, width, height) {
    return dispatch => {
        dispatch(setPPGoalData(goalData))
        let pix = goalData.data
        let bestData = context.getImageData(0, 0, width, height)
        let currData = context2.getImageData(0, 0, width, height)
        let newPix = bestData.data
        
        dispatch(setPPBestData(bestData))
        dispatch(setPPCurrData(currData))
        dispatch(setPPAccuracy(ppComputeAccuracy(pix,newPix)))

        dispatch(setPPStarted(true))
    }
}

export function stepPPTri(context2,goalData,bestData,accuracy,ppGenerationCount,width,height) {
    return dispatch => {
        dispatch(startWaiting())

        let maxAccuracy = 0
        let maxData = new ImageData(width,height)

        for(let i =0;i<100;i++){
            context2.putImageData(bestData,0,0)

            let r = getRandomIntInclusive(0,255)
            let g = getRandomIntInclusive(0,255)
            let b = getRandomIntInclusive(0,255)
            let a = Math.random()
            
            context2.fillStyle = `rgba(
                ${r},
                ${g},
                ${b},
                ${a})`;
            context2.beginPath();
            let x1 = getRandomIntInclusive(0,width)
            let y1 = getRandomIntInclusive(0,height)
            let x2 = getRandomIntInclusive(0,width)
            let y2 = getRandomIntInclusive(0,height)
            let x3 = getRandomIntInclusive(0,width)
            let y4 = getRandomIntInclusive(0,height)
            context2.moveTo(x1, y1);
            context2.lineTo(x2, y2);
            context2.lineTo(x3, y4);
            context2.fill();
    
            let newData = context2.getImageData(0, 0, width, height)
            let newAccuracy = ppComputeAccuracy(goalData.data,newData.data)

            if (newAccuracy>maxAccuracy){
                maxAccuracy=newAccuracy
                maxData = newData
            }
        }

        
        

     

        if(maxAccuracy>accuracy){
            dispatch(setPPAccuracy(maxAccuracy))
            dispatch(setPPBestData(maxData))
        }

        dispatch(setPPCurrAccuracy(maxAccuracy))
        dispatch(setPPCurrData(maxData))

        dispatch(setPPGenerationCount(ppGenerationCount+1))
        dispatch(stopWaiting())
    }
}

function ppComputeAccuracy(pix,newPix){
    let total = 0
    let count = 0
    for (let i = 0, n = pix.length; i < n; i += 4) {
        let a = (255 - Math.abs(newPix[i] - pix[i])) / 255
        let b = (255 - Math.abs(newPix[i + 1] - pix[i + 1])) / 255
        let c = (255 - Math.abs(newPix[i + 2] - pix[i + 2])) / 255

        let d = (a + b + c) / 3
        total += d
        count += 1
    }
    return total/count
}