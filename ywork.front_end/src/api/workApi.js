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
    }
}

export default WorkApi;