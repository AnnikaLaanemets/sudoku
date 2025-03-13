import React from "react";
import Button from "./Button.tsx";

type StartModalProps = {
  setIsStartModalOpen: (isStartModalOpen: boolean) => void;
};

const StartModal = ({
  setIsStartModalOpen,
}: StartModalProps) => {

  const handleClick = () => {
    setIsStartModalOpen(false); 
  };

    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-500">
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <Button variant="regularButton" onClick={handleClick}>
              Start
            </Button>
          </div>
   
      </div>
    );
  

  return null; 
};

export default StartModal;
