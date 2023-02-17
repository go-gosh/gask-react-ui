export interface TaskCreateModel {
  title: string;
  remark: string;
  today: boolean;
  deadline?: Date | undefined;
}