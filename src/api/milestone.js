import request from "./request";

export function ListMilestone(params) {
    return request({
        url: '/milestone',
        method: 'get',
        params,
    })
}

export function CreateMilestone(data) {
    return request({
        url: '/milestone',
        method: 'post',
        data,
    })
}

export function UpdateMilestone(id, data) {
    return request({
        url: '/milestone/' + id,
        method: 'put',
        data,
    })
}

export function DeleteMilestone(id) {
    return request({
        url: '/milestone/' + id,
        method: 'delete',
    })
}
