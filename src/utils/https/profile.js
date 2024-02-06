import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_HOST + "/user"

export const getStudentProfile = (jwt) => {
    const getStudentProfileUrl = baseUrl + "/profile"
    return axios.get(getStudentProfileUrl, {
        headers: {
            'Authorization': 'Bearer ' + jwt,
        }})
}

export const updateStudentProfile = (jwt, body) => {
    const updatetStudentProfileUrl = baseUrl + "/profile"
    return axios.patch(updatetStudentProfileUrl, body, {
        headers: {
            'Authorization': 'Bearer ' + jwt,
        }})
}