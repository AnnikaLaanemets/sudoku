import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'helpButton' | 'regularButton' ;

type ButtonProps = {
  variant?: ButtonVariant;          
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
  children: React.ReactNode;        
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant = 'small',     
  className = '',
  onClick,            
  children          
}) => {

  return (
    <>
    <button
     className={clsx(
            'transition-all duration-300 ease-in-out text-white border p-3 text-xl rounded-xl w-48 m-3', 
            variant === 'regularButton' && ' bg-purple-800 hover:bg-violet-400 border-purple-900 block',
            variant === 'helpButton'  &&  ' bg-yellow-400 hover:bg-amber-200 border-yellow-600',
            className
          )}
      onClick={onClick}
    >
      {children} 
    </button>
    </>
  );
};

export default Button;