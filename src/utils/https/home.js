import axios from "axios";


export const registerStudent = (body) => {
    const baseUrl = import.meta.env.VITE_BACKEND_HOST + "/auth/register"
    return axios.post(baseUrl, body,)
}

export const getBranchOfficeProgram = (id) => {
    const baseUrl = import.meta.env.VITE_BACKEND_HOST + "/office/" + id
    return axios.get(baseUrl)
}