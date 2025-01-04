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
    },
    applyCompany(data){
        const url = urlBase + "/company-search/company/apply"
        return axiosClient.post(url, data)
    },
    companyChangeStatusApply(data){
        const url = urlBase + "/company/change-status/apply"
        return axiosClient.post(url, data)
    },
    candidateApplyCompany(data){
        const url = urlBase + "/candidate/list/apply-company"
        return axiosClient.get(url,{
            params: {
                companyId: data,
            }
        })
    },
    candidateChangeStatusCompany(data){
        const url = urlBase + "/candidate/apply-company/status"
        return axiosClient.post(url, data)
    },

    publicListCompany(){
        const url = urlBase + "/public/company-user/list/company"
        return axiosClient.get(url)
    }
}

export default CompanyApi;