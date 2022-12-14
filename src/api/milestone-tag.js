import request from "./request";

export function ListMilestoneTag(params) {
    return request({
        url: '/milestone-tag',
        method: 'get',
        params,
    })
}