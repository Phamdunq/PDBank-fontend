import axios from "./axiosCustomize"

const fetchAllTransactionApi = (limit, page) => {
    const URL_BACKEND = `/v1/api/transactions?limit=${limit}&page=${page}`
    return (
        axios.get(URL_BACKEND)
    )
}

const createTransactionApi = ({ ...transactionData }) => {
    const URL_BACKEND = '/v1/api/transactions'
    return (
        axios.post(URL_BACKEND, transactionData)
    )
}

const deleteTransactionAPI = (id) => {
    const URL_BACKEND = '/v1/api/transactions'
    return (
        axios.delete(URL_BACKEND, { data: { id } })
    )
}

const deleteMultipleTransactionAPI = (transactionsId) => {
    const URL_BACKEND = '/v1/api/transaction-many'
    return (
        axios.delete(URL_BACKEND, { data: { transactionsId } })
    )
}

export {
    fetchAllTransactionApi, createTransactionApi,
    deleteTransactionAPI, deleteMultipleTransactionAPI,
}