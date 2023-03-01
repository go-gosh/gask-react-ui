import dayjs from "dayjs";

export function DateFormat(date: Date): string {
  return dayjs(date).format("YYYY/MM/DD");
}
