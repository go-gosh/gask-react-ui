// create an axios instance
import axios from "axios";
import {message} from "antd";

const service = axios.create({
    baseURL: process.env.REACT_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

// response interceptor
service.interceptors.response.use(response => {
    const res = response.data
    if (res.code > 299) {
        message.error(res.message || 'Error').then(() => {
        })
        return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
}, error => {
    console.log('err' + error) // for debug
    message.error(error.message).then(() => {
    })
    return Promise.reject(error)
})

export default service
