import React, { useState } from 'react';
import Timer from '../utils/Timer.tsx';
import play from '/play.png';
import pause from '/pause.png';
import { Difficulty } from '../Types.ts';

type Props = {
  difficulty: Difficulty
  hints: number
}
const Navbar: React.FC<Props>= ({difficulty, hints}) => {

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);


  const toggleTimer = () => {
    setIsTimerRunning(prevState => !prevState);
  };

  return (
    <div className="navbar bg-gray-200 shadow-sm rounded-sm">
      <div className="flex-1">
        <a className="btn mx-1 btn-ghost text-2xl">SUDOKU</a>
      </div>
      <div>{difficulty}</div>
      <div>Hints used: {hints}</div>
      <div className="flex-none p-0 m-0">
        <button className="btn btn-circle p-1 mx-0.5 btn-ghost" onClick={toggleTimer}>
          <div>{isTimerRunning ? <img alt="Pause button" src={pause} /> : <img alt="Start button" src={play} />}</div>
        </button>

        <div className="btn text-base p-1 mx-0.5 btn-ghost">
          <Timer isTimerRunning={isTimerRunning} />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
