import {HTMLAttributes, ReactNode} from "react";
import dayjs from "dayjs";
import {TaskCheckbox} from "../component/TaskCheckbox";
import TaskDetailModel from "../model/TaskDetailModel";
import {CalendarIcon, EllipsisHorizontalIcon, PlusIcon, StarIcon, SunIcon, XCircleIcon} from "../component/Icon";


interface CheckboxProps extends HTMLAttributes<any> {
  icon?: ReactNode;
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