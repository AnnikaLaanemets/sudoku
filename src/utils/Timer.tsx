import React, { useState, useEffect } from 'react';

type TimerProps = {
  isTimerRunning: boolean;
}

const Timer: React.FC<TimerProps> = ({ isTimerRunning }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer: number | undefined;

    if (isTimerRunning) {
      timer = window.setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      if (timer) window.clearInterval(timer);
    }

    return () => {
      if (timer) window.clearInterval(timer);
    };
  }, [isTimerRunning]);

 
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;

  return <div>{formattedTime}</div>;
};

export default Timer;
