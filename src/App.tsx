import React, { useState } from 'react';
import './App.css';
import { generatePuzzle } from './utils/sudokuUtils.ts';
import { CellComponent } from './components/Cell.tsx';
import Button from "./components/Button";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  const [selected, setSelected] = useState({x:0,y:0})
  const [board, setBoard] = useState(() => generatePuzzle({ difficulty: 'easy' }));
  const isSolved = board.every(cell => cell.isRevealed || cell.inputValue === cell.number)
  const selectedCell = board.find(cell => cell.x===selected.x && cell.y === selected.y)

  console.log("Solved Board:", {board});
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
    alert(isCorrect ? "Congratulations! You solved it!" : "Some numbers are incorrect.");
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
      <div className="container m-auto rounded-sm">
        <Navbar difficulty="easy" hints={3} />
        <div className='grid grid-cols-9 gap-1'>
          {board.map(cell =>
              <CellComponent
              handler={handleCellChange}
              handleFocus={handleFocus}
              isSelected={!cell.isRevealed} key={`${cell.x}+${cell.y}`} cellData={cell}/>
          )}
        </div>
        <div className="buttonContainer justify-center mt-4">
          <Button onClick={handleCheckNumber} className="m-2" variant="small">
            Check Number
          </Button>
          <Button onClick={handleShowHint} className="m-2" variant="small">
            Show Hint
          </Button>
          <Button onClick={handleValidate} disabled={isSolved} className="m-2" variant="small">
            Validate Solution
          </Button>
          <Button onClick={handleShowSolution} disabled={isSolved} className="m-2" variant="big">
            Show Solution
          </Button>
          <Button onClick={handleNewGame} className="m-2" variant="big">
            New Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
