import React from 'react';
import NumberButton from './NumberButton.tsx';

const NumberButtons: React.FC = () => {

 return (
    <div className='flex flex-wrap justify-center gap-3'>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <NumberButton key={num} num={num} />
      ))}
    </div>
);}

export default NumberButtons;
