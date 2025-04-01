import axios from "./axiosCustomize"

const fetchAllAccountApi = (limit, page, accountNumber, accountType) => {
    let URL_BACKEND = `/v1/api/accounts?limit=${limit}&page=${page}`;

    if (accountNumber) URL_BACKEND += `&accountNumber=${accountNumber}`;
    if (accountType) URL_BACKEND += `&accountType=${accountType}`;

    return axios.get(URL_BACKEND);
};

const fetchAccountApi = () => {
    const URL_BACKEND = '/v1/api/accounts';
    return axios.get(URL_BACKEND);
}


const deleteAccountAPI = (id) => {
    const URL_BACKEND = `/v1/api/accounts`
    return (
        axios.delete(URL_BACKEND, { data: { id } })
    )
}

const deleteMultipleAccountAPI = (accountsId) => {
    const URL_BACKEND = '/v1/api/account-many';
    return axios.delete(URL_BACKEND, { data: { accountsId } });
};


const createAccountAPI = (accountData) => {
    const URL_BACKEND = '/v1/api/accounts'
    return (
        axios.post(URL_BACKEND, accountData)
    )
}

const updateAccountAPI = (accountData) => {
    const URL_BACKEND = '/v1/api/accounts'
    return (
        axios.put(URL_BACKEND, accountData)
    )
}

const fetchAllAccountByCustomerApi = () => {
    const URL_BACKEND = '/v1/api/accounts-customers'
    return (
        axios.get(URL_BACKEND)
    )
}

const fetchAccount = () => {
    const URL_BACKEND = '/v1/api/accounts/get'
    return (
        axios.get(URL_BACKEND)
    )
}
export {
    fetchAllAccountApi, deleteAccountAPI,
    createAccountAPI, updateAccountAPI,
    deleteMultipleAccountAPI, fetchAccountApi,
    fetchAllAccountByCustomerApi, fetchAccount
}