export const Action = Object.freeze({
    StartWaiting: 'StartWaiting',
    StopWaiting: 'StopWaiting',
    OpenMenu: 'OpenMenu',
    CloseMenu: 'CloseMenu',
    //Tic Tac Toe
    TTTSetTurn: 'TTTSetTurn',
    TTTUpdateResult: 'TTTUpdateResult',
    TTTResetGame: 'TTTResetGame',
    TTTSetPlayerFirst: 'TTTSetPlayerFirst',
    //Hangman
    LoadDictionary: 'LoadDictionary',
    PageRight: 'PageRight',
    PageLeft: "PageLeft",
});

const host = 'https://react-man-server.react-man.me:8442';
const wordLimit = 100;
const numWords = 370099;
const maxPage = Math.ceil(numWords/wordLimit)-1;

function checkForErrors(response){
    if(!response.ok){
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

/********************Tic Tac Toe **************************************/

export function tttSetTurn(board, turn) {
    return {
        type: Action.TTTSetTurn,
        payloadBoard: board,
        payloadTurn: turn,
    }
}

export function tttUpdateResult(gameOver, result){
    return {
        type: Action.TTTUpdateResult,
        payloadGameOver: gameOver,
        payloadGameResult: result,
    }
}

export function tttResetGame(){
    return {
        type: Action.TTTResetGame,
        payloadBoard: [0,0,0,0,0,0,0,0,0],
        payloadTurn: 0,
        payloadResult: 0,
        payloadGameOver: false,
    }
}

export function tttSetPlayerFirst(playerFirst){
    return {
        type: Action.TTTSetPlayerFirst,
        payloadPlayerFirst: playerFirst,
    }
}

export function tttSetPlayerFirstAndReset(playerFirst){
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
    [[1,2],[3,6],[4,8]],
    [[0,2],[4,7]],
    [[0,1],[4,6],[5,8]],
    [[0,6],[4,5]],
    [[0,8],[1,7],[2,6],[3,5]],
    [[2,8],[3,4]],
    [[0,3],[2,4],[7,8]],
    [[1,4],[6,8]],
    [[0,4],[2,5],[6,7]],
];

function tttCheckWinNoPush(pos,board){
    let winFound = false;
    TTTLines[pos].forEach(line => {
        // console.log('checkwin',`${pos}:${board[pos]}, ${line[0]}:${board[line[0]]}, ${line[1]}:${board[line[1]]}`)
        if(!winFound && (board[pos] == board[line[0]] && board[pos] == board[line[1]])){
            winFound = true;
        }
    });
    return winFound;
}

export function tttCheckWin(pos, board, turn){
    return dispatch => {
        const winFound = tttCheckWinNoPush(pos, board);

        if(winFound){
            dispatch(tttUpdateResult(true, ((turn-1)%2)+1))
        }else if(turn>=9){
            dispatch(tttUpdateResult(true,0))
        }else{
            dispatch(tttUpdateResult(false,0))
        }
    }
}

export function tttTakeTurn(pos, board, turn) {
    return dispatch => {
        dispatch(startWaiting());
        board[pos] = (turn%2)+1;
        turn += 1;
        dispatch(tttCheckWin(pos,board,turn));
        dispatch(tttSetTurn(board,turn));
        dispatch(stopWaiting());
    }
}

export function tttAITurn(board, turn){
    return dispatch => {
        dispatch(startWaiting());
        dispatch(tttStartMinMax(board, turn));
    }
}

export function tttStartMinMax(board, turn){
    return dispatch => {
        let {maxPos, maxScore} = tttMaxAnalysis(board,turn)
        dispatch(tttTakeTurn(maxPos,board,turn));
        dispatch(stopWaiting());
    }
}

function tttMaxAnalysis(board, turn){
    const playerTurn = (turn%2)+1;
    const availablePositions = getTTTAvailablePositions(board);
    let maxPos = -1;
    let maxScore = -2

    for(let i = 0; i<availablePositions.length;i++){
        let pos = availablePositions[i]
        board[pos] = playerTurn;
        let win = tttCheckWinNoPush(pos, board)
        if(win){
            board[pos] = 0;
            maxPos=pos
            maxScore=1
            return {maxPos, maxScore};
        }else if(turn == 8){
            if(0>=maxScore){
                maxScore = 0;
                maxPos = pos;
            }
        }else{
            let {minPos, minScore} = tttMinAnalysis(board,turn+1)
            if(minScore>=maxScore){
                maxScore = minScore;
                maxPos = pos;
            }
        }
        board[pos] = 0;
    }

    return {maxPos, maxScore};
}

function tttMinAnalysis(board, turn){
    const playerTurn = (turn%2)+1;
    const availablePositions = getTTTAvailablePositions(board);
    let minPos = 9;
    let minScore = 2

    for(let i = 0; i<availablePositions.length;i++){
        let pos = availablePositions[i]
        board[pos] = playerTurn;
        let win = tttCheckWinNoPush(pos, board)
        if(win){
            board[pos] = 0;
            minPos=pos
            minScore=-1
            return {minPos, minScore};
        }else if(turn >= 8){
            if(0<=minScore){
                minScore = 0;
                minPos = pos;
            }
        }else{
            let {maxPos, maxScore} = tttMaxAnalysis(board,turn+1)
            if(maxScore<=minScore){
                minScore = maxScore;
                minPos = pos;
            }
        }
        board[pos] = 0;
    }

    return {minPos, minScore};
}

export function getTTTAvailablePositions(board){
    let availablePositions = []
    board.forEach((val, i) => {
        if(val==0){
            availablePositions.push(i)
        }
    });
    return availablePositions;
}

export function getTTTRandomMove(availablePositions){
    const random = Math.floor(Math.random() * availablePositions.length);
    return availablePositions[random];
}

/********************************Hangman ***************************/

export function loadDictionary(dictionary) {
    return {
        type: Action.LoadDictionary,
        payload: dictionary,
    };
}

export function pageLeft(currPage){
    if(currPage>0){
        return {
            type: Action.PageLeft,
            payload: currPage-1,
        }
    }else{
        return {
            type: Action.PageLeft,
            payload: maxPage,
        }

    }
}

export function pageRight(currPage){
    if(currPage<maxPage){
        return {
            type: Action.PageRight,
            payload: currPage+1,
        }
    }else{
        return {
            type: Action.PageRight,
            payload: 0,
        }

    }
}

export function loadAllWords(offset){
    return dispatch => {
        fetch(`${host}/allwords/${offset*wordLimit}/${wordLimit}`)
        .then(checkForErrors)
        .then(response => response.json())
        .then(data => {
            if(data.ok){
                dispatch(loadDictionary(data.dictionary));
            }
        })
        .catch(e=> console.error(e));
    };
}