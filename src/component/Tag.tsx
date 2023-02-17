import { ReactNode } from "react";
import { IconButton } from "./IconButton";
import { XCircleIcon } from "./Icon";

interface TagProps {
  children?: ReactNode | undefined;
  pill?: boolean | undefined;
  closeable?: boolean | undefined;
}

function Tag(props: TagProps) {
  return (
    <div
      className={`max-w-fit items-center justify-center bg-primary-dark p-1 text-xs text-secondary-light ${
        props.pill ? "rounded-r-full rounded-l-full" : "rounded-md"
      }`}
    >
      {props.children}
      <IconButton className={"h-3 w-3"}>
        <XCircleIcon className={"stroke-secondary-light"} />
      </IconButton>
    </div>
  );
}

export default Tag;
