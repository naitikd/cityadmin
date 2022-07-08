import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/action/counter.action';

function Counter(props) {
    const co = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const handleIncrement = () => {
        dispatch(increment());
    }

    const handleDecrement = () => {
        dispatch(decrement());
    }    
    return (
        <div>
            <h1>Counter</h1>

            <button onClick={() => handleIncrement()}>+</button>
            <span>{co.counter}</span>
            <button onClick={() => handleDecrement()}>-</button>
        </div>
    );
}

export default Counter;