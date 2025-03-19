
import { useTimer } from '../utils/useTimer.ts';
import Button from './Button.tsx';
import React from 'react';


const PauseModal:React.FC = () => {
const {isActive, resume} = useTimer();
      if (isActive) {
        return null
      }

    return (
      <div className='fixed inset-0 flex items-center justify-center bg-stone-900/96'>
        <div className='bg-sky-900 p-25 rounded-lg shadow-lg'>
          <h2 className="text-center font-bold font-3xl text-white m-8">PAUSED</h2>
            <Button variant='regularButton' onClick={resume}>
              Resume
            </Button>
          </div>
      </div>
    );
  
};

export default PauseModal;
