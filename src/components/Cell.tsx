import { Cell } from '../Types';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = {
  cellData: Cell;
  isSelected: boolean;
  isHighlighted: boolean;
  validateSolution: boolean;
  handler?: (value: number, x: number, y: number) => void;
  handleFocus?: (x: number, y: number) => void;
};

const CellComponent: React.FC<Props> = ({ cellData, handler, handleFocus, isSelected, isHighlighted, validateSolution}) =>  {
  const displayValue = cellData.isRevealed ? cellData.number : " ";
  const { setNodeRef } = useDroppable({
    id: `cell-${cellData.x}-${cellData.y}`,
    data: { cell: cellData },
  });
  const correctInput = cellData.isRevealed || cellData.number  === cellData.inputValue;

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handler?.(Number((event.target.value)),cellData.x,cellData.y)
  } 

  return (
    <div
      ref={setNodeRef} 
      className={`w-8.75 h-9 badge badge-soft ${
        (isSelected || cellData.inputValue ) ? 'badge-primary' : (isHighlighted ? 'badge-warning': 'badge-neutral')
      } ${ (validateSolution && !correctInput ) ? 'badge-secondary' : ""} text-2xl rounded-xs !gap-0 !border-violet-950 ${
        cellData.x % 3 === 0 ? 'border-b-4 border-violet-800' : ""
      } ${cellData.y % 3 === 0 ? 'border-r-4 border-violet-800' : ""} `}
  
    >{!cellData.isRevealed ? (
        <input
          onChange={onChange}
          onFocus={() => handleFocus?.(cellData.x, cellData.y)}
          className="w-8 h-8 text-center"
          defaultValue={cellData.inputValue || ""}
          maxLength={1}
          title="Enter a single number (1-9) or click the number button below to choose the likely value for the selected cell."  
        />
      ) : (
        displayValue
      )}
    </div>
  );
};

export { CellComponent };
