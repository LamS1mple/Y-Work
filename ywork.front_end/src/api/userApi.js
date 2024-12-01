import axiosClient from "./axiosClient"

const urlBase = "http://localhost:9910"

const userApi = {
    createAccount(user) {
        const url = urlBase + "/public/account/create-user"
        return axiosClient.post(url, user)
    },

    login(user) {
        const url = urlBase + "/public/account/login"
        return axiosClient.post(url, user)
    },

    detailUser() {
        const url = urlBase + "/user/detail"
        return axiosClient.get(url)
    },

    loginCompany(user) {
        const url = urlBase + "/public/account/login/company"
        return axiosClient.post(url, user)
    },
    locationProvinceDistrict() {
        const url = urlBase + "/public/location/list-province-district"
        return axiosClient.get(url)
    }
}

export default userApi;