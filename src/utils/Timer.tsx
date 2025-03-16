import React from "react"
import { useTimer } from './useTimer'


const Timer:React.FC = () => {
  const { elapsedSeconds } = useTimer()
  const time = new Date(elapsedSeconds * 1000).toISOString().substr(11, 8)
  return <div className="text-base sm:text-lg ">{time}</div>;
};

export default Timer;
