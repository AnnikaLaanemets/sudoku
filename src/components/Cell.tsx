import { Cell } from "../Types"
import React from "react";

type Props = {
  cellData: Cell,
  isSelected: boolean;
  handler?:(value:number,x:number,y:number)=> void
  handleFocus?:(x:number,y:number)=> void
  selectedButton?: number | null;
}
const CellComponent:React.FC<Props> = ({ cellData,handler, handleFocus, isSelected, selectedButton}) => {
  const displayValue = cellData.isRevealed ? cellData.number : ' '

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handler?.(Number((event.target.value)),cellData.x,cellData.y)
  }
  const handleClick:React.MouseEventHandler<HTMLInputElement> = () => {
    handler?.(Number(selectedButton),cellData.x,cellData.y)
  }
  

  if(isSelected)
  {
    return <div className={`w-12 h-12 badge badge-soft badge-primary text-2xl rounded-xs !gap-0 !border-violet-900 ${cellData.x % 3 === 0 ? "border-b-4 border-gray-800" : ""} ${cellData.y % 3 === 0 ?  "border-r-4 border-gray-800" : ""}`}>
      <input 
      onChange={onChange}
      onClick={handleClick}
      onFocus={()=>handleFocus?.(cellData.x,cellData.y)}
       className="w-11 h-11 border-0 text-center" defaultValue={cellData.inputValue} />
    </div>
  }
  return <div className={`w-12 h-12 badge badge-soft badge-neutral text-2xl !gap-0 rounded-xs !border-violet-900 ${cellData.x % 3 === 0 ? "border-b-4 border-gray-800" : ""} ${cellData.y % 3 === 0 ? "border-r-4 border-gray-800" : ""}`}>{displayValue}</div>

}

export {CellComponent}