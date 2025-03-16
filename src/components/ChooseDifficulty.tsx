import React from 'react';
import Button from './Button.tsx';
import { Difficulty } from '../Types.ts';

type ChooseDifficultyProps = {
  setDifficulty: (difficulty: Difficulty) => void;
  handleNewGame: (difficulty: Difficulty) => void;
  setIsChooseDifficultyOpen: (setIsChooseDifficultyOpen: boolean) => void;
};

const ChooseDifficulty:React.FC<ChooseDifficultyProps> = ({ setDifficulty, handleNewGame, setIsChooseDifficultyOpen }) => {
  const levels: Difficulty[] = ['easy', 'moderate', 'intermediate', 'difficult'];

  const handleLevelChange = (level: Difficulty) => {
    setDifficulty(level);
    handleNewGame(level);
    setIsChooseDifficultyOpen(false);
  };

  return (
    <>
        <div className='fixed inset-0 flex items-center justify-center bg-gray-900/90'>
          <div className='bg-cyan-200/82 rounded-lg shadow-lg p-15'>
            <div className='flex flex-col gap-2'>
              {levels.map((level) => (
                <Button key={level} variant='regularButton' onClick={() => handleLevelChange(level)}>
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
    </>
  );
};

export default ChooseDifficulty;
