import { list, update } from "../common/APIUtils";

const resource = "task";

const TaskAPI = {
  List: list(resource),
  Update: update(resource),
};

export default TaskAPI;
