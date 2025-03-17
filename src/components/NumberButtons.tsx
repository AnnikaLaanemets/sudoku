import React from 'react';
import {  useDraggable } from '@dnd-kit/core';


type NumberButtonsProps = {
  setSelectedButton: (num: number | null) => void;
};

const NumberButton: React.FC<{ num: number; setSelectedButton: (num: number | null) => void }> = ({ num, setSelectedButton }) => {
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
      className='touch-none w-8 h-8 flex items-center justify-center bg-pink-600 text-white text-2xl font-bold rounded-lg shadow-md cursor-pointer select-none transition-transform active:scale-95'
      onClick={() => setSelectedButton(num)}
    >
      {num === 0 ? '' : num}
    </div>
  );
};

const NumberButtons: React.FC<NumberButtonsProps> = ({ setSelectedButton }) => (
    <div className='flex flex-wrap justify-center gap-3'>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <NumberButton key={num} num={num} setSelectedButton={setSelectedButton} />
      ))}
    </div>
);

export default NumberButtons;
