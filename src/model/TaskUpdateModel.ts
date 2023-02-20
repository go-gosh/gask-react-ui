export default interface TaskUpdateModel {
  title: string;
  remark: string;
  checkedAt?: Date;
  staredAt?: Date;
  deadline?: Date;
}