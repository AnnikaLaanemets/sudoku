import React from "react";
import Button from "./Button.tsx";
import { Difficulty } from "../Types.ts";

type ChooseDifficultyProps = {
  setDifficulty: (difficulty: Difficulty) => void;
  handleNewGame: (difficulty: Difficulty) => void;
  isChooseDifficultyOpen: boolean;
  onClose: () => void; 
};

const ChooseDifficulty = ({ setDifficulty, handleNewGame, isChooseDifficultyOpen,  onClose }: ChooseDifficultyProps) => {
  const levels: Difficulty[] = ["easy", "moderate", "intermediate", "difficult"];

  const handleLevelChange = (level: Difficulty) => {
    setDifficulty(level);
    handleNewGame(level);
    onClose();
  };

  return (
    <>
      {isChooseDifficultyOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col gap-2">
              {levels.map((level) => (
                <Button key={level} variant="regularButton" onClick={() => handleLevelChange(level)}>
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChooseDifficulty;
