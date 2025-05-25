import { Children, cloneElement, HTMLAttributes, isValidElement, ReactNode, Ref } from "react";
import { AnyProps } from "@/lib/types";
import { mergeProps } from "@/lib/utils";

type SlotProps = {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
} & HTMLAttributes<HTMLElement>;

const Slot = ({ children, ref, ...props }: SlotProps) => {
  if (isValidElement(children)) {
    return cloneElement(children, mergeProps({ ref, ...props }, children.props as AnyProps));
  }

  if (Children.count(children) > 1) {
    Children.only(null);
  }

  return null;
};

export default Slot;
