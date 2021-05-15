export const Action = Object.freeze({
    StartWaiting: 'StartWaiting',
    StopWaiting: 'StopWaiting',
    OpenMenu: 'OpenMenu',
    CloseMenu: 'CloseMenu',
    TTTSetTurn: 'TTTSetTurn',
    TTTUpdateResult: 'TTTUpdateResult',
});

export function startWaiting() {
    return {
        type: Action.StartWaiting,
        payload: true,
    }
}

export function stopWaiting() {
    return {
        type: Action.StopWaiting,
        payload: false,
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

export function tttSetTurn(board, turn) {
    return {
        type: Action.TTTSetTurn,
        payloadBoard: board,
        payloadTurn: turn,
    }
}

export function tttUpdateResult(gameOver, result){
    console.log('update')
    return {
        type: Action.TTTUpdateResult,
        payloadGameOver: gameOver,
        payloadGameResult: result,
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

export function tttCheckWin(pos, board, turn){
    return dispatch => {
        let winFound = false;
        TTTLines[pos].forEach(line => {
            console.log('checkwin',`${pos}:${board[pos]}, ${line[0]}:${board[line[0]]}, ${line[1]}:${board[line[1]]}`)
            if(!winFound && (board[pos] == board[line[0]] && board[pos] == board[line[1]])){
                winFound = true;
            }
        });
        if(winFound){
            dispatch(tttUpdateResult(true, (turn%2)+1))
        }else if(turn>=9){
            dispatch(tttUpdateResult(true,0))
        }else{
            dispatch(tttUpdateResult(false,0))
        }
    }
}

export function tttTakeTurn(pos, board, turn) {
    console.log('startTurn')
    return dispatch =>{
        dispatch(startWaiting());
        board[pos] = (turn%2)+1;
        turn += 1;
        dispatch(tttCheckWin(pos,board,turn));
        dispatch(tttSetTurn(board,turn));
        dispatch(stopWaiting());
        console.log('endTurn')
    }
}