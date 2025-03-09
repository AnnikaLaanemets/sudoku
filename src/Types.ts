type Cell = {
  x: number;
  y: number;
  number: number | null | string;
  inputValue?: number;
  isRevealed: boolean;
};
type Board = Cell[][];

type Difficulty =  'easy' | 'moderate' | 'intermediate' | 'difficult';

export type {Board, Cell, Difficulty};