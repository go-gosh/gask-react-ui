export declare interface Task {
  id: number;
  content: string;
  deadline?: Date | undefined;
  checkedAt?: Date | undefined;
  staredAt?: Date | undefined;
}
