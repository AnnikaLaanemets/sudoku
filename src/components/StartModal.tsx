import React from 'react';
import Button from './Button.tsx';

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
      <div className='fixed inset-0 flex items-center justify-center bg-black-900/90'>
        <div className='bg-cyan-400 p-12 rounded-lg shadow-lg'>
          <h2>Paused</h2>
            <Button variant='regularButton' onClick={handleClick}>
              Start
            </Button>
          </div>
   
      </div>
    );
  
};

export default StartModal;
