import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold rounded-radius ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary hover:bg-primary/80 text-accent",
        secondary: "bg-secondary/70 hover:bg-secondary/50 text-accent",
        accent: "bg-accent text-accent-foreground hover:bg-accent/80",
        outline:
          "border border-border bg-transparent text-secondary hover:bg-foreground hover:text-foreground",
        fab: "rounded-full! bg-accent text-accent-foreground hover:bg-accent/80",
        fabOutline:
          "rounded-full! bg-transparent border border-border text-secondary hover:bg-foreground hover:text-foreground",
        link: "hover:underline text-foreground",
        linkStatic: "underline",
        linkGlow: "hover:text-accent",
        ghost: "bg-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-13 px-10",
        xxl: "text-2xl px-8 py-3 [&_svg]:size-7 font-bold",
        fab: "h-10 w-10",
        auto: "h-auto w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = {
  className?: string;
  children: ReactNode;
  type?: "submit" | "reset" | "button";
} & ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = ({ variant, size, className, children, type = "button", ...props }: ButtonProps) => {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props}>
      {children}
    </button>
  );
};

export { Button, buttonVariants };
