import TaskList from "./TaskList";
import { useLoaderData } from "react-router-dom";
import { Task } from "./Model";
import TaskAPI from "./TaskAPI";
import { useState } from "react";

if (process.env.REACT_APP_MOCK) require("../__mock__/Task");

function ListPage() {
  const initData = useLoaderData() as Task[];
  const [data, setData] = useState(initData);
  const refresh = async () => {
    const { data } = await TaskAPI.List();
    setData(data.list);
  };

  return (
    <TaskList
      data={data}
      onChange={async (newValue) => {
        await TaskAPI.Update(newValue.id, newValue);
        await refresh();
      }}
      onClick={() => console.log("click")}
    />
  );
}

const Page = {
  ListPage,
};

export default Page;
