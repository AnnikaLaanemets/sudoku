import { useState } from 'react';
import { generatePuzzle } from './utils/sudokuUtils.ts';
import {Difficulty} from './Types.ts';
import { useTimer } from './utils/useTimer.ts';
import { DragEndEvent } from '@dnd-kit/core';



const useSudokuApp = () => {

  const [selected, setSelected] = useState({ x: 0, y: 0 });
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [board, setBoard] = useState(() => generatePuzzle({difficulty}));
  const [counts, setCounts] = useState(0);
  const [isChooseDifficultyOpen, setIsChooseDifficultyOpen] = useState(true);
  const [validateSolution, setValidateSolution] = useState(false)
  const selectedCell = board.find((cell) => cell.x === selected.x && cell.y === selected.y);
  const {reset} = useTimer("main");

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const draggedNumber = active.data.current?.value;

    if (!over) {
      handleCurrentCellChange(draggedNumber)
      return;
    }

    const targetCell = over.data.current?.cell;

    
    if (draggedNumber !== undefined && targetCell) {
      const { x, y } = targetCell;
      handleCellChange(draggedNumber, x, y);
      return
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
    setValidateSolution(true);
    const isCorrect = board.every((cell) => cell.isRevealed || cell.number === cell.inputValue);
    alert(isCorrect ? "Congratulations! You solved the sudoku! 🥳🥳🥳" : "Some numbers are incorrect 😞");

  };

  const handleShowSolution = () => {
    const solved = board.map(item => {
      return {
        ...item,
        isRevealed:true
      }
    })
    setBoard(solved)
}

const handleNewGame = (difficulty: Difficulty) => {
  setIsChooseDifficultyOpen(true);
  reset()
  setCounts(0);
  const newPuzzle = generatePuzzle({difficulty});
  setBoard(newPuzzle);
};

const handleCellChange = (value:number,x:number,y:number) => {
  const index = board.findIndex(item => item.x===x && item.y === y)
  board[index].inputValue = value
  setBoard([...board])
}

const handleCurrentCellChange = (value:number) => {
  if(!selectedCell){
    return
  }
  handleCellChange(value,selectedCell.x,selectedCell.y)  
}

const handleFocus = (x:number,y:number) => {
    setSelected({x,y})
}


    return {isChooseDifficultyOpen, setDifficulty, handleNewGame, setIsChooseDifficultyOpen, selected,
      difficulty, counts, handleDragEnd, board, handleCellChange, handleFocus, validateSolution, handleCheckNumber,handleShowHint,handleValidate,handleShowSolution
    }
}

export {useSudokuApp}