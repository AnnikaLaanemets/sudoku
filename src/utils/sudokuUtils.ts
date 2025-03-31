
import { Board,  Difficulty} from '../Types';

const generateEmptyBoard = (): Board =>
  Array.from({ length: 9 }, (_, x) =>
    Array.from({ length: 9 }, (_, y) => ({
      y:y+1,
      x:x+1,
      zoneX: Math.ceil((x+1)/3),
      zoneY: Math.ceil((y+1)/3),
      number: 0,
      isRevealed: true,
    }))
  );

const isValid = (board: Board, row: number, col: number, num: number): boolean => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i].number === num || board[i][col].number === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  return !board.slice(startRow, startRow + 3).some(row =>
    row.slice(startCol, startCol + 3).some(cell => cell.number === num)
  );
};

const shuffleArray = (array: number[]): number[] =>
  array.sort(() => Math.random() - 0.5);

const backtrack = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col].number === 0) {
        for (const num of shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
          if (isValid(board, row, col, num)) {
            board[row][col].number = num;
            if (backtrack(board)) return true;
            board[row][col].number = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const removeCells = (puzzleBoard: Board, difficulty: Difficulty) => {
  const difficultyMap = { easy: 25, moderate: 35, intermediate: 45, difficult: 55 };
  let removeCount = difficultyMap[difficulty];

  while (removeCount > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (puzzleBoard[row][col].isRevealed) {
      puzzleBoard[row][col].isRevealed = false;
      removeCount--;
    }
  }
};

const generatePuzzle = ({difficulty}: {difficulty: Difficulty}) => {
    const newBoard = generateEmptyBoard();
    backtrack(newBoard);
    removeCells(newBoard, difficulty);
    return newBoard.flat();
  
};

export {generatePuzzle, isValid, shuffleArray, backtrack, removeCells, generateEmptyBoard};