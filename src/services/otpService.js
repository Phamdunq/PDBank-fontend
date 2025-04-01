import axios from "./axiosCustomize"

const fetchOtpApi = (email) => {
    const URL_BACKEND = '/v1/api/send-otp';
    return axios.post(URL_BACKEND, { email });
}

const verifyOtpApi = (email, otp) => {
    const URL_BACKEND = '/v1/api/verify-otp';
    return axios.post(URL_BACKEND, { email, otp });
}

export {
    fetchOtpApi, verifyOtpApi
}