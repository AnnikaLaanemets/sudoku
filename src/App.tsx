import React, { useState } from 'react';
import './App.css';
import ChooseDifficulty from './components/ChooseDifficulty.tsx';
import StartModal from './components/StartModal.tsx';
import { generatePuzzle } from './utils/sudokuUtils.ts';
import { CellComponent } from './components/Cell.tsx';
import NumberButtons from './components/NumberButtons.tsx';
import Button from './components/Button';
import Navbar from './components/Navbar';
import {Difficulty} from './Types.ts';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

const App: React.FC = () => {
  const [selected, setSelected] = useState({ x: 0, y: 0 });
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState(() => generatePuzzle({difficulty}));
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
  setIsTimerRunning(true)
  const newPuzzle = generatePuzzle({difficulty});
  setBoard(newPuzzle);
};

const handleCellChange = (value:number,x:number,y:number) => {
  const index = board.findIndex(item => item.x===x && item.y === y)
  board[index].inputValue = value
  setBoard([...board])
  setSelected({x,y})
}

const handleFocus = (x:number,y:number) => {
    setSelected({x,y})
}

  return (
    <div className='App'>
  {isChooseDifficultyOpen && (
        <ChooseDifficulty
          setDifficulty={setDifficulty}
          handleNewGame={handleNewGame}
          setIsChooseDifficultyOpen={setIsChooseDifficultyOpen}
        />
      )}
  {isStartModalOpen && !isTimerRunning && (
    <StartModal
        setIsStartModalOpen={setIsStartModalOpen}
    />
)}
      <div className='container w-xs sm:w-xl m-auto rounded-lg border-3 bg-sky-200/80'>
        <Navbar difficulty={difficulty} hints={counts} isTimerRunning={isTimerRunning} setIsTimerRunning={setIsTimerRunning} difficultyChange={isChooseDifficultyOpen} isStartModalOpen={isStartModalOpen} setIsStartModalOpen={setIsStartModalOpen}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 rounded'>
        <div className='rounded'>
        <DndContext onDragEnd={handleDragEnd}>
              <div className='grid grid-cols-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)] grid-rows-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)'>
              {board.map(cell =>
              {
                const isHighlighted = selected.x === cell.x ||
                selected.y === cell.y || 
                (cell.zoneX === Math.ceil(selected.x/3) && cell.zoneY === Math.ceil(selected.y/3))
                const isSelected = selected.x === cell.x && selected.y === cell.y
                return <CellComponent
                isHighlighted={isHighlighted}
                handler={handleCellChange}
                handleFocus={handleFocus}
                isSelected={isSelected} 
                key={`${cell.x}+${cell.y}`} 
                cellData={cell} 
                selectedButton={selectedButton} 
                />
              }


          )}
              </div>
              <div className='buttonContainer mt-3'>
                <NumberButtons setSelectedButton={setSelectedButton} />
              </div>
            </DndContext>
</div>
        <div className='rounded flex flex-col m-auto mt-8 ms-15'>
          <Button onClick={handleCheckNumber} variant='helpButton' >
            Check Number
          </Button>
          <Button onClick={handleShowHint} variant='helpButton'>
            Show Hint
          </Button>
          <Button onClick={handleValidate} disabled={isSolved} variant='helpButton'>
            Validate Solution
          </Button>
          <Button onClick={handleShowSolution} disabled={isSolved} variant='regularButton'>
            Show Solution
          </Button>
          <Button  onClick={() => handleNewGame(difficulty)}  variant='regularButton'>
            New Game
          </Button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default App;
