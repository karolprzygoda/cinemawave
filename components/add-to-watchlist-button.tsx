import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

const AddToWatchlistButton = ({
  children,
  className,
  variant,
  size,
  ...props
}: ComponentProps<typeof Button>) => {
  return (
    <Button
      aria-label={"Add to watch list"}
      variant={variant}
      size={size}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AddToWatchlistButton;
