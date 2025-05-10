import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

const AddToWatchlistButton = ({
  children,
  className,
  variant,
  size,
}: ComponentProps<typeof Button>) => {
  return (
    <Button variant={variant} size={size} className={className}>
      {children}
    </Button>
  );
};

export default AddToWatchlistButton;
