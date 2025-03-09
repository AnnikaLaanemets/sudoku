import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'big' | 'small' ;

type ButtonProps = {
  variant?: ButtonVariant;          
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
  children: React.ReactNode;        
  className?: string
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  variant = 'small',     
  className = "",
  onClick,            
  children          
}) => {

  return (
    <>
    <button
     className={clsx(
            'transition-all duration-300 ease-in-out text-white border p-1 text-xl rounded-3xl', 
            variant === 'big' && 'w-96 btn-wide bg-purple-800 hover:bg-violet-400 border-purple-900 block m-auto my-3 p-2',
            variant === 'small'  &&  'w-24 bg-yellow-400 hover:bg-amber-200 border-yellow-600 inline mx-2',
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