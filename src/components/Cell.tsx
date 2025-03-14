import { Cell } from '../Types';
import React from 'react';
import { useDroppable } from '@dnd-kit/core';

type Props = {
  cellData: Cell;
  isSelected: boolean;
  isHighlighted: boolean;
  handler?: (value: number, x: number, y: number) => void;
  handleFocus?: (x: number, y: number) => void;
  selectedButton?: number | null;
};

const CellComponent: React.FC<Props> = ({ cellData, handler, handleFocus, isSelected, selectedButton, isHighlighted }) =>  {
 const displayValue = cellData.isRevealed ? cellData.number : " ";
  const { setNodeRef } = useDroppable({
    id: `cell-${cellData.x}-${cellData.y}`,
    data: { cell: cellData },
  });

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handler?.(Number((event.target.value)),cellData.x,cellData.y)
  } 
  const handleClick: React.MouseEventHandler<HTMLInputElement> = () => {
    handler?.(Number(selectedButton), cellData.x, cellData.y);
  };

  return (
    <div
      ref={setNodeRef} 
      onClick={handleClick}
      className={`w-13 h-13 badge badge-soft ${
        isSelected ? 'badge-primary' : (isHighlighted ? 'badge-warning': (cellData.isRevealed? 'badge-neutral': 'badge-secondary'))
      } text-2xl rounded-xs !gap-0 !border-violet-950 ${
        cellData.x % 3 === 0 ? 'border-b-4 border-violet-800' : ""
      } ${cellData.y % 3 === 0 ? 'border-r-4 border-violet-800' : ""} `}
  
    >{!cellData.isRevealed ? (
        <input
          onChange={onChange}
          onFocus={() => handleFocus?.(cellData.x, cellData.y)}
          className="w-11 h-11  text-center"
          defaultValue={cellData.inputValue || ""}
          maxLength={1}
        />
      ) : (
        displayValue
      )}
    </div>
  );
};

export { CellComponent };
