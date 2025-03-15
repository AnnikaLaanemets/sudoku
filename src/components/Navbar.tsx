import React from 'react';
import Timer from '../utils/Timer.tsx';
import play from '/play.png';
import pause from '/pause.png';
import { Difficulty } from '../Types.ts';

type Props = {
  difficulty: Difficulty
  difficultyChange: boolean;
  hints?: number;
  isTimerRunning: boolean;
  setIsTimerRunning: (isTimerRunning: boolean) => void;
  isStartModalOpen: boolean;
  setIsStartModalOpen: (isStartModalOpen: boolean) => void;
}
const Navbar: React.FC<Props>= ({difficulty, hints, isTimerRunning, setIsTimerRunning, difficultyChange, isStartModalOpen, setIsStartModalOpen}) => {

  const toggleTimer = () => {
    setIsStartModalOpen(isStartModalOpen ? false: true);
    setIsTimerRunning(isTimerRunning ? false : true);
   
  };
  console.log(isStartModalOpen);
  console.log(isTimerRunning);

  return (
    <div className='navbar bg-blue-200 shadow-sm rounded-sm'>
      <div className='flex-1'>
        <h1 className='btn btn-ghost sm:text-xl'>SUDOKU</h1>
      </div>
      <h3 className="sm:mx-2 capitalize text-xs sm:text-base sm:font-bold">{difficulty}</h3>
      <div className="text-xs sm:text-base  text-center sm:mx-2">Hints: {hints}</div>
      <div className='flex-none p-0 sm:mx-2'>
        <button className='btn btn-circle btn-ghost' onClick={toggleTimer}>
          <div>{isTimerRunning ? <img alt='Pause button' src={pause} /> : <img alt='Start button' src={play} />}</div>
        </button>

        <div className='btn text-base mx-1 btn-ghost'>
          <Timer isTimerRunning={isTimerRunning} difficultyChange={difficultyChange} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
