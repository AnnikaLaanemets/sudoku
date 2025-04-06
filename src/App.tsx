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
    <div className='App pt-5'>
      
  {isChooseDifficultyOpen && (
        <ChooseDifficulty
          setDifficulty={setDifficulty}
          handleNewGame={handleNewGame}
          setIsChooseDifficultyOpen={setIsChooseDifficultyOpen}
        />
      )}
    <PauseModal/>
      <div className='container max-w-132 border-violet-900 m-auto rounded-lg border-3 bg-sky-200/80 pb-4p'>
        <Navbar difficulty={difficulty} hints={counts}/>
        <div id='game-content' className='flex flex-col content-evenly gap-1 items-center sm:justify-evenly sm:flex-row  pt-2 pb-4'>
        <div className='w-90 flex flex-col items-center'>
        <DndContext  onDragEnd={handleDragEnd}>
              <div className='grid 
              w-83 h-83
              grid-cols-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)] 
              grid-rows-[repeat(2,auto)_1fr_repeat(2,auto)_1fr_repeat(3,auto)]'>
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
              <div className='mt-3 w-70'>
                <NumberButtons />
              </div>
            </DndContext>
</div>
        <div id='buttons' className='w-45 flex flex-col items-center p-2 gap-4'>
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
