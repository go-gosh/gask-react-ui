import React, {useEffect, useState} from "react";
import {CheckIcon} from "../component/TaskCheckbox";
import TaskDetailModel from "../model/TaskDetailModel";
import {CalendarDaysIcon, FullStarIcon, StarIcon} from "../component/Icon";
import {TaskInput} from "../component/TaskInput";
import {IconButton} from "../component/IconButton";
import {Link} from "react-router-dom";
import {CreateTask, ListTask, UpdateTask} from "../api/task";
import {TaskCreateModel} from "../model/TaskCreateModel";

interface TaskItemProps {
  value: TaskDetailModel;
  className?: string | undefined;
  onClick?: (value: any) => void;
  onCheck?: (value: any) => void;
  onStar?: (value: any) => void;
}

type TaskItemTextProps = {
  value: TaskDetailModel;
  className?: string | undefined;
};

const TaskItemText: React.FC<TaskItemTextProps> = ({value, className}) => {
  return (
    <div className={className}>
      <div
        style={{userSelect: "none"}}
        className={`transition ${
          value.checkedAt ? "text-gray-300 line-through" : "text-secondary"
        }`}
      >
        {value.title}
      </div>
      {value.deadline && (
        <div
          style={{userSelect: "none"}}
          className={`container flex items-end text-xs transition ${
            value.checkedAt
              ? "text-gray-300"
              : value.deadline < new Date()
                ? "text-danger"
                : "text-primary-500"
          }`}
        >
          <CalendarDaysIcon className={"mr-1 h-4 w-4"}/>
          <p className={"content-center"}>{value.deadline.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export function TaskItem(props: TaskItemProps) {
  const {value} = props;
  return (
    <div
      className={`container backdrop-blur-xl inline-flex w-full cursor-pointer items-center rounded-xl border bg-gray-50/75 px-4 shadow-sm transition hover:bg-gray-100 hover:shadow-md ${props.className}`}
    >
      <IconButton
        className={`h-6 w-6 grow-0 content-center ${
          value.checkedAt
            ? "border-gray-300 bg-primary"
            : "border-secondary bg-transparent"
        } rounded-full border-2 hover:border-gray-100`}
        onClick={props.onCheck}
      >
        {value.checkedAt && <CheckIcon className="stroke-[3px] text-gray-50"/>}
      </IconButton>
      <Link className={`grow h-full`} to={`taskDetail/${value.id}`}>
        <TaskItemText className={'m-5'} value={value}/>
      </Link>
      <IconButton className="grow-0" onClick={props.onStar}>
        {value.staredAt ? (
          <FullStarIcon className="text-yellow-500 hover:text-yellow-100"/>
        ) : (
          <StarIcon className="text-secondary hover:text-gray-100"/>
        )}
      </IconButton>
    </div>
  );
}
export function TaskList() {
  const [data, setData] = useState<TaskDetailModel[]>([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    ListTask({}).then((res) => setData(res.data?.data ?? []))
  }, [refresh])

  const onUpdate = (index: number, item: TaskDetailModel) =>
    UpdateTask(item.id, item).then(res => {
      const updateList = [...data];
      updateList[index] = res?.data ? res?.data : item;
      setData(updateList);
    });
  const onSubmit = (value: TaskCreateModel) => {
    CreateTask(value).then(() => {
      setRefresh(!refresh)
    });
  };

  return (
    <div
      className={
        "container mx-auto flex h-full w-full max-h-screen max-w-lg flex-col transition"
      }
    >
      <main className={"w-full grow overflow-y-auto p-2"}>
        {data.map((task, index) => (
          <TaskItem
            key={task.id}
            value={task}
            className={"my-1 transition"}
            onCheck={() =>
              onUpdate(index, {
                ...task,
                checkedAt: task.checkedAt ? undefined : new Date(),
              })
            }
            onStar={() =>
              onUpdate(index, {
                ...task,
                staredAt: task.staredAt ? undefined : new Date(),
              })
            }
          />
        ))}
      </main>
      <footer className={"sticky bottom-0 mx-0 w-full"}>
        <TaskInput
          onSubmit={onSubmit}
        />
      </footer>
    </div>
  );
}
