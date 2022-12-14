import dayjs from "dayjs";

export function DateText(text) {
    return text ? dayjs(text).format('YYYY-MM-DD HH:mm') : '-'
}