import axiosClient from "./axiosClient"

const urlBase = "http://localhost:9912"

const CompanyApi = {
    // workListAll() {
    //     const url = urlBase + "/work/list"
    //     return axiosClient.get(url)
    // },

    companyDetail(companyId) {
        const url = urlBase + "/company-user/detail";
        return axiosClient.get(url, {
            params: {
                companyId: companyId
            }
        })
    }
}

export default CompanyApi;