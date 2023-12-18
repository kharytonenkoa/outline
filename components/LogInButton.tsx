import { forwardRef } from "react";
import { KeyRound } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface SignInButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SignInButton = forwardRef<HTMLButtonElement, SignInButtonProps>(({
        className,
        children,
        disabled,
        type = 'button',
        ...props
      }, ref) => {
    return ( 
      <Button 
        disabled={disabled}
        ref={ref}
        {...props}
        size={"sm"}
        className="rounded-full"
        >
        <KeyRound className="mr-2 h-4 w-4" /> Login
      </Button>
     );
});

SignInButton.displayName = "SignInButton";
 
export default SignInButton;