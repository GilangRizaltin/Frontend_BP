import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_HOST + "/auth"

export const loginUser = (body) => {
    const loginUrl = baseUrl + "/login"
    return axios.post(loginUrl, body)
}

export const registerUser = (body) => {
    const registerUrl = baseUrl + "/register"
    return axios.post(registerUrl, body)
}

export const logoutUser = (body) => {
    const logoutUrl = baseUrl + "/logout"
    return axios.post(logoutUrl, body)
}