import React from 'react';
import './App.css';
import ChooseDifficulty from './components/ChooseDifficulty.tsx';
import PauseModal from './components/PauseModal.tsx';
import { CellComponent } from './components/Cell.tsx';
import NumberButtons from './components/NumberButtons.tsx';
import Button from './components/Button';
import Navbar from './components/Navbar';
import { DndContext } from '@dnd-kit/core';
import { useSudokuApp } from './useSudokuApp.ts';


const App: React.FC = () => {
  const {isChooseDifficultyOpen, setDifficulty, handleNewGame, setIsChooseDifficultyOpen, selected,
    difficulty, counts, handleDragEnd, board, handleCellChange, handleFocus, validateSolution,
    handleCheckNumber, handleShowHint, handleValidate, handleShowSolution
  } = useSudokuApp();

  return (
    <div className='App'>
      
  {isChooseDifficultyOpen && (
        <ChooseDifficulty
          setDifficulty={setDifficulty}
          handleNewGame={handleNewGame}
          setIsChooseDifficultyOpen={setIsChooseDifficultyOpen}
        />
      )}
    <PauseModal/>
      <div className='container w-xs sm:w-xl m-auto rounded-lg border-3 bg-sky-200/80 pb-3'>
        <Navbar difficulty={difficulty} hints={counts}/>
        <div className='grid grid-cols-1 sm:grid-cols-2 rounded'>
        <div className='rounded'>
        <DndContext  onDragEnd={handleDragEnd}>
              <div className='grid grid-cols-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)] grid-rows-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)'>
              {board.map(cell =>
              {const isHighlighted = selected.x === cell.x ||
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
                validateSolution={validateSolution}
                />
              }
          )}
              </div>
              <div className='mt-3'>
                <NumberButtons />
              </div>
            </DndContext>
</div>
        <div className='rounded flex flex-col m-auto ms-18'>
          <Button onClick={handleCheckNumber} variant='helpButton' >
            Check Number
          </Button>
          <Button onClick={handleShowHint} variant='helpButton'>
            Show Hint
          </Button>
          <Button onClick={handleValidate}  variant='helpButton'>
            Validate Solution
          </Button>
          <Button onClick={handleShowSolution}  variant='regularButton'>
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
