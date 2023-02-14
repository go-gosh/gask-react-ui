import React, {ReactNode, useState} from "react";
import {CheckIcon} from "../component/TaskCheckbox";
import TaskDetailModel from "../model/TaskDetailModel";
import {FullStarIcon, StarIcon} from "../component/Icon";

interface TaskItemProps {
  initData: TaskDetailModel;
}

interface IconButtonProps {
  children?: ReactNode | undefined;
  className?: string | undefined;
  onChange?: (value: any) => void;
}

function IconButton(props: IconButtonProps) {
  return <button className={`container w-6 h-6 ${props.className}`} onClick={props.onChange}>
    {props.children}
  </button>;
}

export function TaskItem(props: TaskItemProps) {
  const {initData} = props
  const [data, setData] = useState(initData)
  return <div className='container flex border rounded-xl w-full bg-gray-50 hover:bg-gray-100 content-center p-3 cursor-pointer shadow-sm hover:shadow-md'>
    <IconButton
      className={`grow-0 w-6 h-6 ${data.checkedAt ? 'bg-primary border-gray-300' : 'bg-transparent border-gray-500'} rounded-full border-2 hover:border-gray-100`}
      onChange={() => setData({...data, checkedAt: data.checkedAt ? undefined : new Date()})}
    >
      {data.checkedAt && <CheckIcon className='text-gray-50'/>}
    </IconButton>
    <div className={'grow text-gray-500 mx-5'}>{data.title}</div>
    <IconButton
      className='grow-0'
      onChange={() => setData({...data, staredAt: data.staredAt ? undefined : new Date()})}
    >
      {data.staredAt ? <FullStarIcon className='text-yellow-500 hover:text-yellow-100'/> : <StarIcon className='text-gray-500 hover:text-gray-100'/>}
    </IconButton>
  </div>
}

export function TaskList() {
  return <>
  </>
}

export default TaskItem