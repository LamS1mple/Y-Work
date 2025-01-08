import axiosClient from "./axiosClient"

const urlBase = "http://localhost:9911"

const WorkApi = {
    workListAll() {
        const url = urlBase + "/public/work/list"
        return axiosClient.get(url)
    },

    workDetail(workId) {
        const url = urlBase + "/public/work/detail";
        return axiosClient.get(url, {
            params: {
                workId: workId
            }
        })
    },
    createCandidate(formData) {
        const url = urlBase + "/candidate/create";
        return axiosClient.post(url, formData, {
            headers: {
                'x-device-id': 'stuff',
                'Content-Type': 'multipart/form-data',
            },
        });
    },

    companyWork(companyId) {
        const url = urlBase + "/company/job-company";
        return axiosClient.get(url, {
            params: {
                companyId: companyId
            }
        })
    },
    careerList() {
        const url = urlBase + "/public/career/list";
        return axiosClient.get(url);
    },
    skillList(careerId) {
        const url = urlBase + "/public/career/skill";
        return axiosClient.get(url, {
            params: {
                careerId: careerId
            }
        })
    },

    jobCreate(data){
        const url = urlBase + "/company/job/create"
        return axiosClient.post(url, data)
    },

    workChangeStatus(workId){
        const url = urlBase + "/public/work/status"
        return axiosClient.get(url, {
            params:{
                workId: workId
            }
        })
    },
    candidateJobApply(){
        const  url = urlBase +"/candidate/list/apply-job"
        return axiosClient.get(url)
    },

    jobCompanyPublic(companyId){
        const url = urlBase + "/public/work/company/list"
        return axiosClient.get(url, {
            params:{
                companyId: companyId
            }
        })
    },
    statisticJob(companyId){
        const url = urlBase + "/statistic/job-company"
        return axiosClient.get(url, {
            params:{
                companyId: companyId
            }
        })
    },
    deleteWork(workId){
        const url = urlBase + "/company/job/delete"
        return axiosClient.get(url,{
            params:{
                workId: workId
            }
        })
    },
    searchWork(key){
        const url = urlBase + "/public/work/search"
        return axiosClient.get(url,{
            params:{
                key:key
            }
        })
    }
}

export default WorkApi;