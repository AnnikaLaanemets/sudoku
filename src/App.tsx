import React, { useState } from 'react';
import './App.css';
import { generatePuzzle } from './utils/sudokuUtils.ts';
import { CellComponent } from './components/Cell.tsx';
import NumberButtons from "./components/NumberButtons.tsx";
import Button from "./components/Button";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [selected, setSelected] = useState({x:0,y:0})
  const [selectedButton, setSelectedButton] = useState<number | null>(null);
  const [board, setBoard] = useState(() => generatePuzzle({ difficulty: 'easy' }));
  const [counts, setCounts] = useState(0)
  const isSolved = board.every(cell => cell.isRevealed || cell.inputValue === cell.number)
  const selectedCell = board.find(cell => cell.x===selected.x && cell.y === selected.y)

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
      alert("Correct number");
    } else {
      alert("This number is incorrect");
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
    const isCorrect = board.every((cell) =>
       cell.isRevealed === true || cell.number === cell.inputValue
    );
    alert(isCorrect ? "Congratulations! You solved the sudoku!" : "Some numbers are incorrect.");
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


  const handleNewGame = () => {
    const newPuzzle = generatePuzzle({ difficulty: 'easy' });
    setBoard(newPuzzle);
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
      <div className="container m-auto rounded-lg border-5">
        <Navbar difficulty="easy" hints={counts} />
        <div className="bg-violet-500/80 grid grid-cols-1 sm:grid-cols-3 rounded">
        <div className=" col-span-1 sm:col-span-2  rounded">
        <div className='grid grid-cols-9 border border-gray-800 m-2'>
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
        <NumberButtons setSelectedButton={setSelectedButton} /></div> </div>
        <div className="bg-sky-200/80 rounded flex flex-col justify-center ms-2">
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
          <Button onClick={handleNewGame} variant="regularButton">
            New Game
          </Button>
          </div></div>
        </div>
      </div>
  );
};

export default App;
