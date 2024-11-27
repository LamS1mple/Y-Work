import axiosClient from "./axiosClient"

const urlBase = "http://localhost:9911"

const WorkApi = {
    workListAll() {
        const url = urlBase + "/work/list"
        return axiosClient.get(url)
    },

    workDetail(workId) {
        const url = urlBase + "/work/detail";
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
        const url = urlBase + "/career/list";
        return axiosClient.get(url);
    },
    skillList(careerId) {
        const url = urlBase + "/career/skill";
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
        const url = urlBase + "/work/status"
        return axiosClient.get(url, {
            params:{
                workId: workId
            }
        })
    }
}

export default WorkApi;