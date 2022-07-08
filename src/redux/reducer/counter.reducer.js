import * as ActionTypes from '../ActionTypes';

const initiVal = {
    counter: 0
}

export const counterReducer = (state = initiVal, action) => {
    console.log(action.type);
    switch (action.type) {
        case ActionTypes.INCREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter + 1
            }
        case ActionTypes.DECREMENT_COUNTER:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state
    }
}