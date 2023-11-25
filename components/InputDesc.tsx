import { forwardRef } from "react";
import { twMerge } from "tailwind-merge"

export interface InputDescProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const InputDesc = forwardRef<HTMLTextAreaElement, InputDescProps>(({
  className,
  disabled,
  ...props
}, ref) => {
  return (
    <textarea
      className={twMerge(
        `
        flex 
        w-full
        break-all
        h-[150px]
        bg-transparent
        text-sm
        font-regular
        file:border-0 
        file:bg-transparent 
        file:text-sm
        file:font-regular
        placeholder:text-white 
        disabled:cursor-not-allowed 
        disabled:opacity-50
        focus:outline-none
        resize-none
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

InputDesc.displayName = "Input";

export default InputDesc
