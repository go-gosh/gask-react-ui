import React, { useState } from "react";
import {
  CalendarIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  PlusIcon,
  SunIcon,
  XCircleIcon,
} from "./Icon";
import Modal from "./Modal";
import { IconButton } from "./IconButton";
import { TaskCreateModel } from "../model/TaskCreateModel";
import dayjs from "dayjs";

interface TaskInputProps {
  onSubmit?: (value: { title: string; remark: string }) => void;
}

export function TaskInput(props: TaskInputProps) {
  const initData: TaskCreateModel = {
    title: "",
    remark: "",
    today: false,
    deadline: undefined,
  };
  const [data, setData] = useState(initData);
  const [focus, setFocus] = useState(false);
  const [tempRemark, setTempRemark] = useState(initData.remark);
  const [editRemark, setEditRemark] = useState(false);

  return (
    <div className={"w-full p-2 transition"}>
      <div
        className={
          "w-full rounded border bg-gray-50 p-2 shadow outline-none transition hover:shadow-lg"
        }
      >
        <div className={"flex h-8 items-center transition-all"}>
          {focus ? (
            <PencilSquareIcon
              className={
                "mx-2 h-6 w-6 stroke-[2px] text-secondary transition-all delay-200"
              }
            />
          ) : (
            <PlusIcon
              className={
                "mx-2 h-6 w-6 stroke-[3px] text-secondary transition-all"
              }
            />
          )}
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={data.title}
            onChange={(event) =>
              setData({ ...data, title: event.target.value })
            }
            type={"text"}
            placeholder={"添加任务"}
            className={
              "mx-5 w-full grow appearance-none bg-transparent text-gray-700 transition-all focus:outline-none"
            }
          />
          <IconButton
            disabled={!data.title}
            onClick={() => {
              props.onSubmit?.(data);
              setData(initData);
              setTempRemark(initData.remark);
            }}
            className={`h-8 w-12 grow border-l px-3 text-secondary transition-all ${
              data.title ? "opacity-100 hover:text-primary" : "opacity-50"
            }`}
          >
            <PaperAirplaneIcon className={"w-8 stroke-[3px]"} />
          </IconButton>
        </div>
      </div>
      <div className={"px-4 pt-3 transition-all"}>
        <IconButton
          onClick={() => setData({ ...data, today: !data.today })}
          className={`mr-2 inline-flex h-6 w-fit items-center rounded-l-full rounded-r-full p-2 ${
            data.today
              ? "bg-primary-dark text-secondary-light hover:bg-primary hover:text-secondary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <SunIcon className={"h-5 w-5 stroke-[2px]"} />
          {data.today && (
            <>
              <p className={"text-xs"}>我的一天</p>
              <XCircleIcon className={"h-5 w-5 stroke-[2px]"} />
            </>
          )}
        </IconButton>
        {/*TODO: add datepicker here.*/}
        <IconButton
          onClick={() =>
            setData({
              ...data,
              deadline: data.deadline ? undefined : new Date(),
            })
          }
          className={`mr-2 inline-flex h-6 w-fit items-center rounded-l-full rounded-r-full p-2 ${
            data.deadline
              ? "bg-primary-dark text-secondary-light hover:bg-primary hover:text-secondary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <CalendarIcon className={"h-5 w-5 stroke-[2px]"} />
          {data.deadline && (
            <>
              <p className={"text-xs"}>
                {dayjs(data.deadline).format("YYYY/MM/DD")}
              </p>
            </>
          )}
        </IconButton>
        <IconButton
          onClick={() => setEditRemark(true)}
          className={`mr-2 inline-flex h-6 w-fit items-center rounded-l-full rounded-r-full p-2 ${
            data.remark
              ? "bg-primary-dark text-secondary-light hover:bg-primary hover:text-secondary"
              : "text-secondary hover:text-primary"
          }`}
        >
          <DocumentTextIcon className={"h-5 w-5 stroke-[2px]"} />
          {data.remark && (
            <>
              <p className={"text-xs"}>备注</p>
            </>
          )}
        </IconButton>
      </div>
      <Modal
        show={editRemark}
        onClose={() => {
          setEditRemark(false);
          setTempRemark(data.remark);
        }}
        onOk={() => {
          setData({ ...data, remark: tempRemark });
          setEditRemark(false);
        }}
      >
        <textarea
          value={tempRemark}
          placeholder={"备注"}
          onChange={(event) => setTempRemark(event.target.value)}
          className={
            "h-full h-40 w-80 max-w-4xl resize-y rounded-md border p-3"
          }
        />
      </Modal>
    </div>
  );
}
