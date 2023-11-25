import { forwardRef } from "react";
import { twMerge } from "tailwind-merge"

export interface InputButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputButton = forwardRef<HTMLInputElement, InputButtonProps>(({
  className,
  type,
  disabled,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        `z-10
        flex
        w-full h-full
        rounded-lg 
        items-center justify-center 
        text-transparent
        transition-all duration-200 
        text-sm select-none cursor-pointer
        file:cursor-pointer
        file:border-0
        file:hidden
        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
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

InputButton.displayName = "Input";

export default InputButton