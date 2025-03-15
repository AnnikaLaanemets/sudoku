
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
      <div className='fixed inset-0 flex items-center justify-center bg-stone-900/96'>
        <div className='bg-sky-900 p-45 rounded-lg shadow-lg'>
          <h2 className="text-center font-bold font-3xl text-white m-8">PAUSED</h2>
            <Button variant='regularButton' onClick={handleClick}>
              Start
            </Button>
          </div>
   
      </div>
    );
  
};

export default StartModal;
