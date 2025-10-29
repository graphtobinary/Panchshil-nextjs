import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "hero" | "overlay" | "signature";
  size?: "default" | "sm" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variants = {
      default: "bg-gray-900 text-white hover:bg-gray-800",
      outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
      ghost: "hover:bg-gray-100 text-gray-900",
      hero: "relative overflow-hidden bg-white/40 hover:bg-white/50 text-white transition-opacity duration-300",
      overlay:
        "bg-black-chocolate/55 relative overflow-hidden hover:bg-black-chocolate/65 text-white transition-opacity duration-300",
      signature:
        "bg-gold-beige text-white hover:opacity-95 transition-opacity duration-300",
    };

    const sizes = {
      default: "h-10 px-4 py-2 text-sm",
      sm: "h-9 px-3 text-sm",
      lg: "h-12 px-6 text-lg",
    };

    return (
      <button
        className={cn(
          "cursor-pointer inline-flex items-center justify-center  font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
