import React from 'react';
import { useDraggable } from '@dnd-kit/core';

type NumberButtonProps = {
  num: number;
};

const NumberButton: React.FC<NumberButtonProps> = ({ num}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `number-${num}`,
    data: { value: num },
  });
 
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.5 : 1,
      }}
      className='touch-none w-8 h-8 flex justify-center bg-pink-600 text-white text-2xl font-bold rounded-lg shadow-md cursor-pointer select-none transition-transform active:scale-95'
      title="Drag the chosen number to the suitable empty cell">
      {num === 0 ? '' : num}
     
    </div>
  );
};


export default NumberButton