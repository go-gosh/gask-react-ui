import React, {ReactNode, useState} from "react";
import {CheckIcon} from "../component/TaskCheckbox";
import TaskDetailModel from "../model/TaskDetailModel";
import {CalendarDaysIcon, FullStarIcon, StarIcon} from "../component/Icon";

interface TaskItemProps {
  value: TaskDetailModel;
  className?: string | undefined;
  onClick?: (value: any) => void;
  onCheck?: (value: any) => void;
  onStar?: (value: any) => void;
}

interface IconButtonProps {
  children?: ReactNode | undefined;
  className?: string | undefined;
  onChange?: (value: any) => void;
}

function IconButton(props: IconButtonProps) {
  return <button className={`container transition w-6 h-6 ${props.className}`} onClick={props.onChange}>
    {props.children}
  </button>;
}

type TaskItemTextProps = {
  value: TaskDetailModel
};

const TaskItemText: React.FC<TaskItemTextProps> = ({value}) => {
  return (<>
    <div
      className={`transition ${value.checkedAt ? 'text-gray-300 line-through' : 'text-gray-500'}`}>{value.title}</div>
    {value.deadline && (
      <div
        className={`text-xs container flex items-end transition ${value.checkedAt ? 'text-gray-300' : value.deadline < new Date() ? 'text-red-500' : 'text-primary-500'}`}
      >
        <CalendarDaysIcon className={'w-4 h-4 mr-1'}/>
        <p className={'content-center'}>{value.deadline.toLocaleString()}</p>
      </div>
    )}
  </>);
};

export function TaskItem(props: TaskItemProps) {
  const {value} = props
  return <div
    className={`container transition flex border rounded-xl w-full bg-gray-50 hover:bg-gray-100 items-center p-4 cursor-pointer shadow-sm hover:shadow-md ${props.className}`}>
    <IconButton
      className={`content-center grow-0 w-6 h-6 ${value.checkedAt ? 'bg-primary border-gray-300' : 'bg-transparent border-gray-500'} rounded-full border-2 hover:border-gray-100`}
      onChange={props.onCheck}
    >
      {value.checkedAt && <CheckIcon className='text-gray-50 stroke-[3px]'/>}
    </IconButton>
    <div onClick={props.onClick}
         className={`grow mx-5`}>
      <TaskItemText value={value}/></div>
    <IconButton
      className='grow-0'
      onChange={props.onStar}
    >
      {value.staredAt ? <FullStarIcon className='text-yellow-500 hover:text-yellow-100'/> :
        <StarIcon className='text-gray-500 hover:text-gray-100'/>}
    </IconButton>
  </div>
}

interface TaskListProps {
  tasks: TaskDetailModel[];
}

export function TaskList(props: TaskListProps) {
  const {tasks} = props
  const [data, setData] = useState(tasks)
  const onClick = (id: number) => {
    console.log(`Task-${id} detail view`)
  }

  const updateItem = (index: number, item: TaskDetailModel) => {
    const updateList = [...data]
    updateList[index] = item
    setData(updateList)
  }

  return <div className={'transition-all p-2 w-full max-w-lg mx-auto border rounded-2xl'}>
    {data.map((task, index) => <TaskItem
      key={task.id}
      value={task}
      className={'my-3 transition-all'}
      onCheck={() => updateItem(index, {...task, checkedAt: task.checkedAt ? undefined : new Date()})}
      onStar={() => updateItem(index, {...task, staredAt: task.staredAt ? undefined : new Date()})}
      onClick={() => onClick(task.id)}/>)}
  </div>
}

export default TaskItem