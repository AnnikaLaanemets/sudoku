import React from 'react';
import Timer from '../utils/Timer.tsx';
import { useTimer } from '../utils/useTimer.ts';
import play from '/play.png';
import pause from '/pause.png';
import { Difficulty } from '../Types.ts';

type Props = {
  difficulty: Difficulty
  hints?: number;
}
const Navbar: React.FC<Props>= ({difficulty, hints}) => {
  const { isActive,
    toggle } = useTimer();

  return (
    <div className='navbar bg-blue-200 shadow-sm rounded-sm'>
      <div className='flex-1'>
        <h1 className='btn btn-ghost sm:text-xl p-1'>SUDOKU</h1>
      </div>
      <h3 className="mx-1 capitalize text-xs sm:text-base sm:font-bold">{difficulty}</h3>
      <div className="text-xs sm:text-base  text-center mx-1 sm:mx-3">Hints: {hints}</div>
      <div className='flex-none p-0 mx-2'>
        <button className='btn btn-circle btn-ghost' onClick={toggle}>
          <div>{isActive ? <img alt='Pause button' src={pause} /> : <img alt='Start button' src={play} />}</div>
        </button>

        <div className='btn text-base btn-ghost p-1'>
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
