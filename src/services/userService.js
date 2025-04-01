import axios from "./axiosCustomize"

const loginAPI = (userData) => {
    const URL_BACKEND = '/v1/api/login'
    return (
        axios.post(URL_BACKEND, userData)
    )
};

const RegisterApi = (userData) => {
    const URL_BACKEND = '/v1/api/register'
    return (
        axios.post(URL_BACKEND, userData)
    )
}

const updateUserPasswordAPI = async (userData) => {
    const URL_BACKEND = "/v1/api/users/update-password";
    return (
        axios.put(URL_BACKEND, userData)
    )
};

const fetchAllUserAPI = (limit, page) => {
    const URL_BACKEND = `/v1/api/users?limit=${limit}&page=${page}`
    return (
        axios.get(URL_BACKEND)
    )
}

const deleteUserAPI = (id) => {
    const URL_BACKEND = '/v1/api/users'
    return (
        axios.delete(URL_BACKEND, { data: { id } })
    )
}

const deleteMultipleUserAPI = (usersId) => {
    const URL_BACKEND = '/v1/api/user-many'
    return (
        axios.delete(URL_BACKEND, { data: { usersId } })
    )
}

const createUserAPI = (userData) => {
    const URL_BACKEND = '/v1/api/users'
    return (
        axios.post(URL_BACKEND, userData)
    )
}
export {
    loginAPI, updateUserPasswordAPI,
    RegisterApi, fetchAllUserAPI,
    deleteMultipleUserAPI, createUserAPI,
    deleteUserAPI
}
