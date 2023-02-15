import React from 'react';
import {TaskList} from "./page/TaskList";
import TaskDetailModel from "./model/TaskDetailModel";

function App() {
  const data: TaskDetailModel[] = [...Array(10)].map((_, index) => ({
    id: index * 3 + 1,
    title: 'Task Title Here',
    remark: '',
    createdAt: new Date(),
    deadline: index % 3 === 0 ? new Date() : undefined,
    subTasks: [
      {id: index * 3 + 2, title: 'Sub Task1', remark: '', createdAt: new Date(),},
      {id: index * 3 + 3, title: 'Sub Task2', remark: '', createdAt: new Date(),},
    ]
  }))

  return (
    <TaskList tasks={data}/>
  );
}

export default App;
