import { createBrowserRouter } from "react-router-dom";
import React from "react";
import TaskAPI from "./task/TaskAPI";
import Task from "./task";

if (process.env.REACT_APP_MOCK_ENABLED) require("./__mock__");

export default createBrowserRouter([
  {
    path: "/",
    element: <Task.ListPage />,
    loader: async () => {
      const { data } = await TaskAPI.List();
      return data.list;
    },
  },
]);
