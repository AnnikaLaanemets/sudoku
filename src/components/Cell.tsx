import { Cell } from "../Types";
import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  cellData: Cell;
  isSelected: boolean;
  handler?: (value: number, x: number, y: number) => void;
  handleFocus?: (x: number, y: number) => void;
  selectedButton?: number | null;
};

const CellComponent: React.FC<Props> = ({ cellData, handler, handleFocus, isSelected, selectedButton }) => {
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
      className={`w-13 h-13 badge badge-soft ${
        isSelected ? "badge-primary" : "badge-neutral"
      } text-2xl rounded-xs !gap-0 !border-violet-950 ${
        cellData.x % 3 === 0 ? "border-b-4 border-violet-800" : ""
      } ${cellData.y % 3 === 0 ? "border-r-4 border-violet-800" : ""}`}
    >
      {isSelected ? (
        <input
          onChange={onChange}
          onClick={handleClick}
          onFocus={() => handleFocus?.(cellData.x, cellData.y)}
          className="w-11 h-11 border-0 text-center"
          defaultValue={cellData.inputValue}
        />
      ) : (
        displayValue
      )}
    </div>
  );
};

export { CellComponent };
