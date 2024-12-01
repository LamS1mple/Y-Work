import axiosClient from "./axiosClient"

const urlBase = "http://localhost:9912"

const CompanyApi = {
    // workListAll() {
    //     const url = urlBase + "/work/list"
    //     return axiosClient.get(url)
    // },
    companyCreate(companyCreate) {
        const url = `${urlBase}/company/create-company`
        return axiosClient.postForm(url, companyCreate, {
            headers: {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    companyDetail(companyId) {
        const url = urlBase + "/public/company-user/detail";
        return axiosClient.get(url, {
            params: {
                companyId: companyId
            }
        })
    },

    companySearchList(data) {
        const url = urlBase + "/company-search/get-company"
        return axiosClient.post(url, data)
    },

    candidateList(data){
        const url = urlBase + "/candidate/list"
        return axiosClient.post(url, data);
    },
    candidateChangeStatus(data){
        const url = urlBase + "/candidate/status"
        return axiosClient.post(url, data)
    }
}

export default CompanyApi;