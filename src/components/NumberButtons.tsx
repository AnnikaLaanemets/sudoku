import React from "react";

interface NumberButtonsProps {
  setSelectedButton: (num: number | null) => void;
}

const NumberButtons: React.FC<NumberButtonsProps> = ({ setSelectedButton }) => {
  return (
    <div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((num) => (
        <div
          key={num}
          className="w-12 h-12 badge badge-soft badge-primary text-2xl m-3"
          onClick={() => setSelectedButton(num)}
        >
          {num === 0 ? "" : num}
        </div>
      ))}
    </div>
  );
};

export default NumberButtons;




