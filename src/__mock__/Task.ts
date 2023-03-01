import { axiosMock } from "./mock";
import { Task } from "../task/Model";

const data = [...Array(30)].map((value, index): Task => {
  return {
    id: index + 1,
    content: `Task ${index + 1}`,
    deadline: index % 2 === 0 ? new Date() : undefined,
    checkedAt: index % 3 === 0 ? new Date() : undefined,
    staredAt: index % 4 === 0 ? new Date() : undefined,
  };
});

axiosMock.onGet("/task").reply(200, {
  list: data,
});

axiosMock.onPut(/\/task\/\d+/).reply((config) => {
  const temp = config.url?.split("/").pop();
  const id = parseInt(temp ?? "");
  const index = data.findIndex((value) => value.id === id);
  data[index] = JSON.parse(config.data) as Task;
  return [200, config.data];
});
