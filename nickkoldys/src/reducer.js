import {Action} from './actions';

const initialState = {
    isWaiting: false,
    menuOpen:false,
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case Action.OpenMenu:
            return{
                ...state,
                menuOpen: true,
            };
        case Action.CloseMenu:
            return{
                ...state,
                menuOpen: false,
            };
        
        default:
            return state;
    }
}

export default reducer;