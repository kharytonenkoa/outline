import { forwardRef } from "react";
import { twMerge } from "tailwind-merge"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        `
        flex 
        w-full  
        text-2xl font-bold
        file:border-0 
        file:bg-transparent 
        file:text-lg
        file:font-bold 
        bg-transparent
        placeholder:text-neutral-300
        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
        border-b
        border-white/40
      `,
        disabled && 'opacity-75',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  )
});

Input.displayName = "Input";

export default Input