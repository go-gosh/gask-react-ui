import React, {ReactNode, useState} from "react";
import {CheckIcon} from "../component/TaskCheckbox";
import TaskDetailModel from "../model/TaskDetailModel";
import {
  CalendarDaysIcon,
  CalendarIcon, DocumentTextIcon,
  FullStarIcon,
  PaperAirplaneIcon, PencilSquareIcon,
  PlusIcon,
  StarIcon,
  SunIcon
} from "../component/Icon";

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
  onClick?: (value: any) => void;
}

function IconButton(props: IconButtonProps) {
  return <button className={`container transition w-6 h-6 ${props.className}`} onClick={props.onClick}>
    {props.children}
  </button>;
}

type TaskItemTextProps = {
  value: TaskDetailModel
};

const TaskItemText: React.FC<TaskItemTextProps> = ({value}) => {
  return (<>
    <div style={{userSelect: 'none'}}
         className={`transition ${value.checkedAt ? 'text-gray-300 line-through' : 'text-gray-500'}`}>{value.title}</div>
    {value.deadline && (
      <div style={{userSelect: 'none'}}
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
      onClick={props.onCheck}
    >
      {value.checkedAt && <CheckIcon className='text-gray-50 stroke-[3px]'/>}
    </IconButton>
    <div onClick={props.onClick}
         className={`grow mx-5`}>
      <TaskItemText value={value}/></div>
    <IconButton
      className='grow-0'
      onClick={props.onStar}
    >
      {value.staredAt ? <FullStarIcon className='text-yellow-500 hover:text-yellow-100'/> :
        <StarIcon className='text-gray-500 hover:text-gray-100'/>}
    </IconButton>
  </div>
}

interface TaskListProps {
  tasks: TaskDetailModel[];
}

interface TaskInputProps {
  onSubmit?: (value: { title: string; remark: string }) => void;
}

function TaskInput(props: TaskInputProps) {
  const initData = {
    title: '',
    remark: '',
  };
  const [data, setData] = useState(initData)
  const [focus, setFocus] = useState(false)
  return <div className={'transition w-full p-2'}>
    <div className={'transition w-full border p-2 rounded-xl'}>
      <div className={'transition-all flex items-center h-8'}>
        {focus ? <PencilSquareIcon className={'transition-all delay-200 w-6 h-6 text-gray-500 stroke-[2px] mx-2'}/> :
          <PlusIcon className={'transition-all w-6 h-6 text-gray-500 stroke-[3px] mx-2'}/>}
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={data.title}
          onChange={event => setData({...data, title: event.target.value})}
          type={'text'} placeholder={'添加任务'}
          className={'grow transition-all mx-5 appearance-none bg-transparent w-full text-gray-700 focus:outline-none'}
        />
        <IconButton
          onClick={() => {
            props.onSubmit?.(data)
            setData(initData)
          }}
          className={`transition-all w-12 h-8 text-gray-500 grow px-3 border-l ${data.title ? 'opacity-100 hover:text-primary' : 'opacity-50'}`}>
          <PaperAirplaneIcon className={'w-8 stroke-[3px]'}/>
        </IconButton>
      </div>
    </div>
    <div className={'transition-all px-4 pt-3'}>
      <IconButton className={'w-5 h-5 text-gray-500 hover:text-primary mr-2'}>
        <SunIcon className={'stroke-[3px]'}/>
      </IconButton>
      <IconButton className={'w-5 h-5 text-gray-500 hover:text-primary mr-2'}>
        <CalendarIcon className={'stroke-[3px]'}/>
      </IconButton>
      <IconButton className={'w-5 h-5 text-gray-500 hover:text-primary mr-2'}>
        <DocumentTextIcon className={'stroke-[3px]'}/>
      </IconButton>
    </div>
  </div>;
}

export function TaskList(props: TaskListProps) {
  const {tasks} = props
  const [data, setData] = useState(tasks)
  const [id, setId] = useState(Math.max(...data.map(value => value.id)))
  const onClick = (index: number) => {
    const list = [...data]
    list.splice(index, 1)
    setData(list)
  }

  const updateItem = (index: number, item: TaskDetailModel) => {
    const updateList = [...data]
    updateList[index] = item
    setData(updateList)
  }

  return <div
    className={'container transition w-full max-w-lg mx-auto flex flex-col h-screen border rounded-2xl'}>
    <main className={'w-full p-2 grow overflow-y-auto'}>
      {data.map((task, index) => <TaskItem
        key={task.id}
        value={task}
        className={'my-3 transition'}
        onCheck={() => updateItem(index, {...task, checkedAt: task.checkedAt ? undefined : new Date()})}
        onStar={() => updateItem(index, {...task, staredAt: task.staredAt ? undefined : new Date()})}
        onClick={() => onClick(index)}/>)}
    </main>
    <footer className={'sticky bottom-0 w-full mx-0'}>
      <TaskInput onSubmit={value => {
        setId(id + 1)
        setData([...data, {id: id, createdAt: new Date(), ...value}])
      }}/>
    </footer>
  </div>
}

export default TaskItem