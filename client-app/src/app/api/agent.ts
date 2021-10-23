import axios, { AxiosResponse } from "axios";
import { Place } from "../models/place";


axios.defaults.baseURL = 'http://localhost:5000/api';



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