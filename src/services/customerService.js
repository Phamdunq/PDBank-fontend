import axios from "./axiosCustomize"

const fetchAllCustomerAPI = (limit, page) => {
    const URL_BACKEND = `/v1/api/customers?limit=${limit}&page=${page}`
    return (
        axios.get(URL_BACKEND)
    )
}

const fetchFullCustomersAPI = () => {
    const URL_BACKEND = `/v1/api/customers`
    return (
        axios.get(URL_BACKEND)
    )
}

const fetchCustomerByIdAPI = (id) => {
    const URL_BACKEND = `/v1/api/customers`
    return (
        axios.get(URL_BACKEND, { data: { id } })
    )
}

const deleteCustomerAPI = (id) => {
    const URL_BACKEND = `/v1/api/customers`
    return (
        axios.delete(URL_BACKEND, { data: { id } })
    )
}
const deleteMultipleCustomerAPI = (customersId) => {
    const URL_BACKEND = '/v1/api/customers-many'
    return (
        axios.delete(URL_BACKEND, { data: { customersId } })
    )
}

const createCustomerAPI = (customerData) => {
    const URL_BACKEND = '/v1/api/customers'
    return (
        axios.post(URL_BACKEND, customerData)
    )
}

const updateCustomerAPI = (customerData) => {
    const URL_BACKEND = '/v1/api/customers'
    return (
        axios.put(URL_BACKEND, customerData)
    )
}

export {
    fetchAllCustomerAPI, deleteMultipleCustomerAPI,
    createCustomerAPI, updateCustomerAPI,
    deleteCustomerAPI, fetchCustomerByIdAPI,
    fetchFullCustomersAPI
}