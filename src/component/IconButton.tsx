import React from "react";
import { IconButtonProps } from "./IconButtonProps";

export function IconButton(props: IconButtonProps) {
  return (
    <button
      disabled={props.disabled}
      className={`h-6 w-6 transition ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
