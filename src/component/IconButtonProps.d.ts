import {ReactNode} from "react";

export interface IconButtonProps {
  disabled?: boolean | undefined;
  children?: ReactNode | undefined;
  className?: string | undefined;
  onClick?: (value: any) => void;
}