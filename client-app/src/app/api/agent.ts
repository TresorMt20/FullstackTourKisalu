import axios, { AxiosResponse } from "axios";
import { Place } from "../models/place";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Places = {
    list: () => requests.get<Place[]>('/places'),
    details: (id: string) => requests.get<Place>(`/places/${id}`),
    create: (place: Place) => axios.post('/places', place),
    update: (place: Place) => axios.put(`/places/${place.id}`, place),
    delete: (id: string) => axios.delete<void>(`/places/${id}`)
}

const agent = {
    Places
}

export default agent;