import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_HOST + "/user"

export const getStudentData = (jwt) => {
    const getStudentDataUrl = baseUrl + "/student"
    return axios.get(getStudentDataUrl, {
        headers: {
            'Authorization': 'Bearer ' + jwt,
        }})
}

export const updateStudentProfile = (jwt, body, id) => {
    const updatetStudentProfileUrl = baseUrl + "/profile/" + id
    return axios.patch(updatetStudentProfileUrl, body, {
        headers: {
            'Authorization': 'Bearer ' + jwt,
        }})
}

export const deleteStudent = (jwt, id) => {
    const deleteStudentUrl = baseUrl + "/" + id
    return axios.delete(deleteStudentUrl, {
        headers: {
            'Authorization': 'Bearer ' + jwt,
        }})
}