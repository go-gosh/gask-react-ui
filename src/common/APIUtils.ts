import axios from "axios";

const instance = axios.create();

export function list(resource: string) {
  return async (params?: any) => await instance.get(`/${resource}`, { params });
}

export function update(resource: string) {
  return async (id: number, data?: any) =>
    await instance.put(`/${resource}/${id}`, data);
}

export default instance;
