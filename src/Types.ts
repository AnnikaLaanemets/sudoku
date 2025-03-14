type Cell = {
  x: number;
  y: number;
  zoneX: number;
  zoneY: number;
  number: number | null | string;
  inputValue?: number;
  isRevealed: boolean;
  selectedButton?: number | null;
};
type Board = Cell[][];

type Difficulty = 'easy' | 'moderate' | 'intermediate' | 'difficult'

export type {Board, Cell, Difficulty};