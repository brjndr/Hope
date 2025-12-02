import { useDispatch, useSelector } from 'react-redux';
import './counter.scss';
import type { RootState } from '@store/store';
import { increment, decrement, incrementByAmount } from '@store/counter/counterSlice';
import styled from 'styled-components';

const Button = styled.button`
      padding: 10px 20px;
      background-color: cadetblue;
      color: white;
      border: none;
      border-radius: 5px;

      &:hover {
        background-color: blue;
      }
    `;

const Counter = () =>  {

  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="counterCard">
        <h2>Counter: {count}</h2>
        <div className='actionButton'>
          <Button onClick={() => dispatch(increment())}>Increment</Button>
          <Button onClick={() => dispatch(decrement())}>Decrement</Button>
          <Button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</Button>
        </div>
      </div>
    </>
  )
}      

export default Counter
