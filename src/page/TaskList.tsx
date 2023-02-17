import React, { useState } from "react";
import { CheckIcon } from "../component/TaskCheckbox";
import TaskDetailModel from "../model/TaskDetailModel";
import { CalendarDaysIcon, FullStarIcon, StarIcon } from "../component/Icon";
import { TaskInput } from "../component/TaskInput";
import { IconButton } from "../component/IconButton";

interface TaskItemProps {
  value: TaskDetailModel;
  className?: string | undefined;
  onClick?: (value: any) => void;
  onCheck?: (value: any) => void;
  onStar?: (value: any) => void;
}

type TaskItemTextProps = {
  value: TaskDetailModel;
};

const TaskItemText: React.FC<TaskItemTextProps> = ({ value }) => {
  return (
    <>
      <div
        style={{ userSelect: "none" }}
        className={`transition ${
          value.checkedAt ? "text-gray-300 line-through" : "text-secondary"
        }`}
      >
        {value.title}
      </div>
      {value.deadline && (
        <div
          style={{ userSelect: "none" }}
          className={`container flex items-end text-xs transition ${
            value.checkedAt
              ? "text-gray-300"
              : value.deadline < new Date()
              ? "text-danger"
              : "text-primary-500"
          }`}
        >
          <CalendarDaysIcon className={"mr-1 h-4 w-4"} />
          <p className={"content-center"}>{value.deadline.toLocaleString()}</p>
        </div>
      )}
    </>
  );
};

export function TaskItem(props: TaskItemProps) {
  const { value } = props;
  return (
    <div
      className={`container flex w-full cursor-pointer items-center rounded-xl border bg-gray-50 p-4 shadow-sm transition hover:bg-gray-100 hover:shadow-md ${props.className}`}
    >
      <IconButton
        className={`h-6 w-6 grow-0 content-center ${
          value.checkedAt
            ? "border-gray-300 bg-primary"
            : "border-secondary bg-transparent"
        } rounded-full border-2 hover:border-gray-100`}
        onClick={props.onCheck}
      >
        {value.checkedAt && <CheckIcon className="stroke-[3px] text-gray-50" />}
      </IconButton>
      <div onClick={props.onClick} className={`mx-5 grow`}>
        <TaskItemText value={value} />
      </div>
      <IconButton className="grow-0" onClick={props.onStar}>
        {value.staredAt ? (
          <FullStarIcon className="text-yellow-500 hover:text-yellow-100" />
        ) : (
          <StarIcon className="text-secondary hover:text-gray-100" />
        )}
      </IconButton>
    </div>
  );
}

interface TaskListProps {
  tasks: TaskDetailModel[];
}

export function TaskList(props: TaskListProps) {
  const { tasks } = props;
  const [data, setData] = useState(tasks);
  const [id, setId] = useState(Math.max(...data.map((value) => value.id)));
  const onClick = (index: number) => {
    const list = [...data];
    list.splice(index, 1);
    setData(list);
  };

  const updateItem = (index: number, item: TaskDetailModel) => {
    const updateList = [...data];
    updateList[index] = item;
    setData(updateList);
  };

  return (
    <div
      className={
        "container mx-auto flex h-screen w-full max-w-lg flex-col rounded-2xl border transition"
      }
    >
      <main className={"w-full grow overflow-y-auto p-2"}>
        {data.map((task, index) => (
          <TaskItem
            key={task.id}
            value={task}
            className={"my-3 transition"}
            onCheck={() =>
              updateItem(index, {
                ...task,
                checkedAt: task.checkedAt ? undefined : new Date(),
              })
            }
            onStar={() =>
              updateItem(index, {
                ...task,
                staredAt: task.staredAt ? undefined : new Date(),
              })
            }
            onClick={() => onClick(index)}
          />
        ))}
      </main>
      <footer className={"sticky bottom-0 mx-0 w-full"}>
        <TaskInput
          onSubmit={(value) => {
            setId(id + 1);
            setData([...data, { id: id, createdAt: new Date(), ...value }]);
          }}
        />
      </footer>
    </div>
  );
}

export default TaskItem;
