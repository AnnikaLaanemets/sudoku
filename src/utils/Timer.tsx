import React, { useState, useEffect } from 'react';

type TimerProps = {
  isTimerRunning: boolean;
  difficultyChange?: boolean
}

const Timer: React.FC<TimerProps> = ({ isTimerRunning, difficultyChange}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
  }, [difficultyChange]);

  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = window.setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [isTimerRunning]); 

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return <div className="text-base sm:text-lg ">{formattedTime}</div>;
};

export default Timer;
