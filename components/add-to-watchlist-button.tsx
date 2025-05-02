import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type AddToWatchlistButtonProps = {
  children: ReactNode;
  className?: string;
}

const AddToWatchlistButton = ({children, className}: AddToWatchlistButtonProps) => {
  return <Button className={className}>{children}</Button>;
};

export default AddToWatchlistButton;
