export default interface TaskDetailModel {
  id: number;
  title: string;
  remark: string;
  checkedAt?: Date;
  staredAt?: Date;
  deadline?: Date;
  createdAt: Date;
  subTasks?: TaskDetailModel[],
}