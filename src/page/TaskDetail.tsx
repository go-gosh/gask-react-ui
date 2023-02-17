import { HTMLAttributes, ReactNode } from "react";
import dayjs from "dayjs";
import { TaskCheckbox } from "../component/TaskCheckbox";

import {
  CalendarIcon,
  EllipsisHorizontalIcon,
  PlusIcon,
  StarIcon,
  SunIcon,
  XCircleIcon,
} from "../component/Icon";
import TaskDetailModel from "../model/TaskDetailModel";

interface CheckboxProps extends HTMLAttributes<any> {
  icon?: ReactNode;
}

function Checkbox(props: CheckboxProps) {
  return (
    <div className="inline-flex items-center" {...props}>
      <button className="h-6 w-6 rounded-full bg-transparent">
        {props.icon}
      </button>
    </div>
  );
}

function TaskDetail(props: { id?: number }) {
  const { id = 0 } = props;
  const data: TaskDetailModel = {
    id: id,
    title: "Task Title Here",
    remark: "",
    createdAt: new Date(),
    subTasks: [
      { id: 2, title: "Sub Task1", remark: "", createdAt: new Date() },
      { id: 3, title: "Sub Task2", remark: "", createdAt: new Date() },
    ],
  };
  return (
    <div className="container mx-auto h-screen max-w-lg overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="h-full w-full overflow-y-auto p-5">
        <div className="flex border-b p-2">
          <TaskCheckbox className="mr-2 grow-0" />
          <input
            value={data.title}
            className="w-full grow appearance-none bg-transparent text-gray-700 focus:outline-none"
            type="text"
            placeholder="输入你的ToDo"
            id="text"
          />
          <Checkbox className="ml-2 grow-0" icon={<StarIcon />} />
        </div>
        <div className="">
          {data.subTasks?.map((value) => (
            <div className="mx-2 flex border-b p-2">
              <TaskCheckbox className="mr-2 grow-0" />
              <input
                value={value.title}
                className="w-full grow appearance-none bg-transparent text-gray-700 focus:outline-none"
                type="text"
                placeholder="输入你的ToDo"
                id="text"
              />
              <Checkbox
                className="ml-2 grow-0"
                icon={<EllipsisHorizontalIcon />}
              />
            </div>
          ))}
          <div className="mx-2 flex p-2">
            <PlusIcon className="mr-2 h-6 w-6 grow-0" />
            <input
              className="w-full grow appearance-none bg-transparent text-gray-700 focus:outline-none"
              type="text"
              placeholder="下一项"
              id="text"
            />
          </div>
        </div>

        <div className="flex border-b border-t">
          <button className="m-2 flex w-full p-2">
            <SunIcon className="h-6 w-6 grow-0" />
            <span className="mx-2 w-full grow appearance-none bg-transparent text-left text-gray-700 focus:outline-none">
              添加到我的一天
            </span>
          </button>
        </div>
        <div className="flex border-b border-t">
          <button className="m-2 flex w-full p-2">
            <CalendarIcon className="h-6 w-6 grow-0" />
            <span className="mx-2 w-full grow appearance-none bg-transparent text-left text-gray-700 focus:outline-none">
              到期时间
            </span>
          </button>
        </div>
        <div className="flex border-b p-2">
          <textarea
            value={data.remark}
            className="h-48 min-h-max w-full resize-none appearance-none bg-transparent py-1 px-2 text-gray-700 focus:outline-none"
            placeholder="备注"
          />
        </div>
      </div>
      <div className="sticky bottom-0 flex w-full max-w-lg items-center border-t py-5">
        <text className="mx-auto text-gray-700">
          创建于{dayjs(data.createdAt).format("YYYY年MM月DD日 HH:mm")}
        </text>
        <XCircleIcon className="float-right mr-5 flex h-6 w-6" />
      </div>
    </div>
  );
}

export default TaskDetail;
