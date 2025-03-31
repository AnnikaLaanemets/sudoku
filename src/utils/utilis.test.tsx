import { describe, it, expect } from 'vitest';
import { generateEmptyBoard, isValid, shuffleArray, backtrack, removeCells, generatePuzzle } from './sudokuUtils.ts'; 
import { Board} from '../Types';


describe("generateEmptyBoard", () => {
  it("should create a 9x9 board with all cells initialized to 0", () => {
    const board = generateEmptyBoard();
    expect(board).toHaveLength(9);
    board.forEach(row => {
      expect(row).toHaveLength(9);
      row.forEach(cell => {
        expect(cell.number).toBe(0); 
        expect(cell.isRevealed).toBe(true); 
      });
    });
  });
});


describe("isValid", () => {
  it("should return true for a valid move", () => {
    const board: Board = generateEmptyBoard();
    expect(isValid(board, 0, 0, 5)).toBe(true);
  });

  it("should return false for a move that conflicts with a number in the same row", () => {
    const board: Board = generateEmptyBoard();
    board[0][1].number = 5;
    expect(isValid(board, 0, 2, 5)).toBe(false);
  });

  it("should return false for a move that conflicts with a number in the same column", () => {
    const board: Board = generateEmptyBoard();
    board[1][0].number = 5;
    expect(isValid(board, 2, 0, 5)).toBe(false);
  });

  it("should return false for a move that conflicts with a number in the same 3x3 subgrid", () => {
    const board: Board = generateEmptyBoard();
    board[0][0].number = 5;
    expect(isValid(board, 1, 1, 5)).toBe(false);
  });
});


describe("shuffleArray", () => {
  it("should shuffle an array of numbers", () => {
    const originalArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const shuffledArray = shuffleArray([...originalArray]);
    
    expect(shuffledArray).not.toEqual(originalArray); 
    expect(shuffledArray.sort()).toEqual(originalArray); 
  });
});

describe("backtrack", () => {
  it("should successfully solve an empty board", () => {
    const board: Board = generateEmptyBoard();
    const result = backtrack(board);
    expect(result).toBe(true); 
    expect(board.flat().every(cell => cell.number !== 0)).toBe(true); 
  });

  it("should generate different board each time", () => {
    const board1: Board = generateEmptyBoard();
    const board2: Board = generateEmptyBoard();
    backtrack(board1);
    backtrack(board2);
    expect(board1).not.toEqual(board2); 
  });
});


describe("removeCells", () => {
  it("should remove the correct number of cells based on difficulty", () => {
    const board: Board = generateEmptyBoard();
    backtrack(board);
    const difficulty = "easy";

    removeCells(board, difficulty);
    const emptyCells = board.flat().filter(cell => !cell.isRevealed).length;

    expect(emptyCells).toBe(25);
  });

});

describe("generatePuzzle", () => {
  it("should generate a puzzle with the correct number of revealed cells", () => {
    const difficulty = "easy";
    const puzzle = generatePuzzle({difficulty});
    const revealedCells = puzzle.filter(cell => cell.isRevealed).length;
    expect(revealedCells).toBe(81 - 25);
  });

  it("should generate a puzzle with the correct number of revealed cells for a different difficulty", () => {
    const difficulty = "intermediate";
    const puzzle = generatePuzzle({difficulty});
    const revealedCells = puzzle.filter(cell => cell.isRevealed && cell.number!==0 ).length;
    expect(revealedCells).toBe(81 - 45);
  }
);
}
);