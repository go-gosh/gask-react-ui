import TaskDetailModel from "../model/TaskDetailModel";
import TaskUpdateModel from "../model/TaskUpdateModel";
import {TaskCreateModel} from "../model/TaskCreateModel";

let data: TaskDetailModel[] = [...Array(10)].map((_, index) => ({
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

let id = 50;

interface ListTaskParam {
  page?: number | undefined;
  pageSize?: number | undefined;
}

interface Paginator<T> {
  page: number;
  pageSize: number;
  total: number;
  data: T[];
}

interface Response<T> {
  code: number;
  message?: string | undefined;
  data?: T | undefined;
}

function mockResponse<T>(param: T): Promise<Response<T>> {
  return new Promise(resolve => setTimeout(() => resolve({
    code: 200,
    message: 'success',
    data: param,
  }), 200))
}

export function ListTask(param: ListTaskParam): Promise<Response<Paginator<TaskDetailModel>>> {
  console.log('List tasks', id, data)
  return mockResponse({
    page: param.page ?? 1,
    pageSize: param.pageSize ?? 1,
    total: data.length,
    data: data,
  })
}

export function UpdateTask(id: number, update: TaskUpdateModel): Promise<Response<TaskDetailModel>> {
  console.log('Update task')
  const index = data.findIndex(value => value.id === id);
  data.splice(index, 1, {...data[index], ...update})
  return mockResponse(data[index])
}

export function CreateTask(create: TaskCreateModel): Promise<Response<TaskDetailModel>> {
  console.log('Create task')
  const newData: TaskDetailModel = {
    ...create,
    id: id,
    createdAt: new Date(),
  }
  data.push(newData)
  id++
  return mockResponse(newData)
}