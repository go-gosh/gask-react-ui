import {HTMLAttributes, ReactNode} from "react";

import {SVGAttributes} from "react";
import dayjs from "dayjs";
export function PlusIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
    </svg>
  );
}

export function SunIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"></path>
    </svg>
  );
}

export function StarIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
    </svg>
  );
}


export function CalendarIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>
    </svg>
  );
}

export function EllipsisHorizontalIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
    </svg>
  );
}


interface TaskDetailModel {
  id: number;
  title: string;
  remark: string;
  checkedAt?: Date;
  createdAt: Date;
  subTasks?: TaskDetailModel[],
}

function TaskCheckbox(props: HTMLAttributes<any>) {
  return <div className="inline-flex items-center" {...props}>
    <button className="w-6 h-6 bg-transparent rounded-full border border-gray-300"/>
  </div>;
}

interface CheckboxProps extends HTMLAttributes<any> {
  icon?: ReactNode;
}


export function XCircleIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  );
}


function Checkbox(props: CheckboxProps) {
  return <div className="inline-flex items-center" {...props}>
    <button className="w-6 h-6 bg-transparent rounded-full">
      {props.icon}
    </button>
  </div>;
}

function TaskDetail(props: { id?: number }) {
  const {id = 0} = props
  const data: TaskDetailModel = {
    id: id,
    title: 'Task Title Here',
    remark: '',
    createdAt: new Date(),
    subTasks: [
      {id: 2, title: 'Sub Task1', remark: '', createdAt: new Date(),},
      {id: 3, title: 'Sub Task2', remark: '', createdAt: new Date(),},
    ]
  }
  return <div
    className="container mx-auto h-screen max-w-lg bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
    <div className="h-full w-full p-5 overflow-y-auto">
      <div className="flex border-b p-2">
        <TaskCheckbox className='grow-0 mr-2'/>
        <input
          value={data.title}
          className="grow appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
          type="text" placeholder="输入你的ToDo" id="text"/>
        <Checkbox className='grow-0 ml-2' icon={<StarIcon/>}/>
      </div>
      <div className=''>
        {
          data.subTasks?.map(value => <div className='flex border-b p-2 mx-2'>
            <TaskCheckbox className='grow-0 mr-2'/>
            <input
              value={value.title}
              className="grow appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
              type="text" placeholder="输入你的ToDo" id="text"/>
            <Checkbox className='grow-0 ml-2' icon={<EllipsisHorizontalIcon/>}/>
          </div>)
        }
        <div className='flex p-2 mx-2'>
          <PlusIcon className='grow-0 mr-2 w-6 h-6'/>
          <input
            className="grow appearance-none bg-transparent w-full text-gray-700 focus:outline-none"
            type="text" placeholder="下一项" id="text"/>
        </div>
      </div>

      <div className='flex border-b border-t'>
        <button className='flex p-2 w-full m-2'>
          <SunIcon className='grow-0 w-6 h-6'/>
          <span
            className='grow appearance-none bg-transparent text-left mx-2 w-full text-gray-700 focus:outline-none'>添加到我的一天</span>
        </button>
      </div>
      <div className='flex border-b border-t'>
        <button className='flex p-2 w-full m-2'>
          <CalendarIcon className='grow-0 w-6 h-6'/>
          <span
            className='grow appearance-none bg-transparent text-left mx-2 w-full text-gray-700 focus:outline-none'>到期时间</span>
        </button>
      </div>
      <div className='flex border-b p-2'>
        <textarea value={data.remark}
                  className='appearance-none bg-transparent min-h-max h-48 w-full text-gray-700 py-1 px-2 focus:outline-none resize-none'
                  placeholder='备注'/>
      </div>
    </div>
    <div className='sticky bottom-0 w-full max-w-lg flex items-center py-5 border-t'>
      <text className='mx-auto text-gray-700'>创建于{dayjs(data.createdAt).format('YYYY年MM月DD日 HH:mm')}</text>
      <XCircleIcon className='w-6 h-6 float-right flex mr-5'/>
    </div>
  </div>
}

export default TaskDetail