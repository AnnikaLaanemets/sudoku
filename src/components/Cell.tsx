import { Cell } from "../Types"
import React from "react";


type Props = {
  cellData: Cell,
  isSelected: boolean;
  handler?:(value:number,x:number,y:number)=> void
  handleFocus?:(x:number,y:number)=> void
}
const CellComponent:React.FC<Props> = ({cellData,isSelected,handler,handleFocus}) => {
  const displayValue = cellData.isRevealed ? cellData.number : ' '

  const onChange:React.ChangeEventHandler<HTMLInputElement> = (event) => {
    handler?.(Number((event.target.value)),cellData.x,cellData.y)
  }

  if(isSelected)
  {
    return <div className="w-10 h-10 badge badge-primary badge-lg">
      <input 
      onChange={onChange}
      onFocus={()=>handleFocus?.(cellData.x,cellData.y)}
       className="w-9 h-9 border-0 text-center" defaultValue={cellData.inputValue} />
    </div>
  }
  return <div className="w-10 h-10 badge badge-primary badge-lg text-yellow-400">{displayValue}</div>

}

export {CellComponent}