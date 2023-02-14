import {HTMLAttributes} from "react";
import {SVGAttributes} from "react";

export function CheckIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
    </svg>
  );
}

interface TaskCheckboxProps {
  checked?: boolean;
  className?: string | undefined;
  onChange?: (value: boolean) => void;
}

export function TaskCheckbox(props: TaskCheckboxProps) {
  const {checked = false, onChange = () => {} } = props
  return <div className={`inline-flex items-center ${props.className ?? ''}`}>
    <button className={`w-6 h-6 ${checked ? 'bg-primary' : 'bg-transparent'} rounded-full border border-gray-300`}
            onClick={() => onChange(!props.checked)}>
      {checked && <CheckIcon className='text-gray-100'/>}
    </button>
  </div>;
}