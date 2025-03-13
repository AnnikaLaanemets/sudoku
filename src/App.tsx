import React, { useState } from "react";
import "./App.css";
import ChooseDifficulty from "./components/ChooseDifficulty.tsx"
import StartModal from "./components/StartModal.tsx";
import { generatePuzzle } from "./utils/sudokuUtils.ts";
import { CellComponent } from "./components/Cell.tsx";
import NumberButtons from "./components/NumberButtons.tsx";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import {Difficulty} from "./Types.ts"
import { DndContext, DragEndEvent } from "@dnd-kit/core";

const App: React.FC = () => {
  const [selected, setSelected] = useState({ x: 0, y: 0 });
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'moderate' | 'intermediate' | 'difficult'>("easy");
  const [board, setBoard] = useState(() => generatePuzzle(difficulty));
  const [counts, setCounts] = useState(0);
  const [isChooseDifficultyOpen, setIsChooseDifficultyOpen] = useState(true);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const isSolved = board.every((cell) => cell.isRevealed || cell.inputValue === cell.number);
  const selectedCell = board.find((cell) => cell.x === selected.x && cell.y === selected.y);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const draggedNumber = active.data.current?.value;
    const targetCell = over.data.current?.cell;
    setSelected(targetCell)

    if (draggedNumber !== undefined && targetCell) {
      const { x, y } = targetCell;

      handleCellChange(draggedNumber, x, y);
    }
  };
  
  const handleCheckNumber = () => {
    if(!selectedCell){
      return
    }
    const value = selectedCell?.inputValue
    const isValid = selectedCell?.inputValue === selectedCell.number
    if (!value || isNaN(value) || value < 1 || value > 9) {
      alert("Please enter a valid number between 1 and 9.");
      return;
    }

    if (isValid) {
      alert("Correct number! 🙂");
    } else {
      alert("This number is incorrect! 🙁");
    }
    
  };


  const handleShowHint = () => {
    setCounts(counts + 1)
  const available = board.filter(cell => !cell.isRevealed && cell.inputValue === undefined)
  const chosen = available[Math.floor(Math.random() * available.length)]
  const newBoard = board.map(item=> {
    if(item.x === chosen.x && item.y === chosen.y)
    {
      return {
        ...item,
        isRevealed:true
      }
    }
    return item
  })
  setBoard(newBoard)

    
  };

  const handleValidate = () => {
    const isCorrect = board.every((cell) => cell.isRevealed || cell.number === cell.inputValue);
    alert(isCorrect ? "Congratulations! You solved the sudoku! 🥳🥳🥳" : "Some numbers are incorrect 😞");
  };

  const handleShowSolution = () => {
    const solved =board.map(item => {
      return {
        ...item,
        isRevealed:true
      }
    })
    setBoard(solved)
}

const handleNewGame = (difficulty: Difficulty) => {
  setIsChooseDifficultyOpen(true);
  setIsStartModalOpen(true)
  setIsTimerRunning(true)
  //restart timer from 0
  const newPuzzle = generatePuzzle({difficulty});
  setBoard(newPuzzle);
};

const handleDifficultyClose = () => {
  setIsChooseDifficultyOpen(false);
};


const handleCellChange = (value:number,x:number,y:number) => {
  const index = board.findIndex(item => item.x===x && item.y === y)
  board[index].inputValue = value
  setBoard([...board])
}

const handleFocus = (x:number,y:number) => {
    setSelected({x,y})
}

  return (
    <div className="App">
  {isChooseDifficultyOpen && (
        <ChooseDifficulty
          setDifficulty={setDifficulty}
          handleNewGame={handleNewGame}
          isChooseDifficultyOpen={isChooseDifficultyOpen}
          onClose={handleDifficultyClose}
        />
      )}
  
  {isStartModalOpen && !isTimerRunning && (
    <StartModal
        setIsStartModalOpen={setIsStartModalOpen}
    />
)}
      <div className="container m-auto rounded-lg border-3 bg-sky-200/80">
        <Navbar difficulty={difficulty} hints={counts} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} />
        <div className=" grid grid-cols-1 sm:grid-cols-3 rounded">
        <div className="col-span-1 sm:col-span-2  rounded">
        <DndContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)] grid-rows-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)">
              {board.map(cell =>
              <CellComponent
              handler={handleCellChange}
              handleFocus={handleFocus}
              isSelected={!cell.isRevealed} key={`${cell.x}+${cell.y}`} 
              cellData={cell} 
              selectedButton={selectedButton} />
          )}
              </div>
              <div className="buttonContainer justify-center m-3">
                <NumberButtons setSelectedButton={setSelectedButton} />
              </div>
            </DndContext>
</div>
        <div className=" rounded flex flex-col justify-center ms-2">
          <Button onClick={handleCheckNumber} variant="helpButton">
            Check Number
          </Button>
          <Button onClick={handleShowHint} variant="helpButton">
            Show Hint
          </Button>
          <Button onClick={handleValidate} disabled={isSolved} variant="helpButton">
            Validate Solution
          </Button>
          <Button onClick={handleShowSolution} disabled={isSolved} variant="regularButton">
            Show Solution
          </Button>
          <Button  onClick={() => handleNewGame(difficulty)}  variant="regularButton">
            New Game
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};




export default App;
