import axios from "axios";

const axiosClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Accept": "*/*",

    }
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem('access_token');

    if (token) {
        // Thêm Authorization header
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    if (error.response) {
        // Phản hồi từ server
        console.error("Lỗi từ server:", error.response.data);
    } else if (error.request) {
        // Không nhận được phản hồi từ server
        console.error("Không nhận được phản hồi từ server:", error.request);
    } else {
        // Các lỗi khác
        console.error("Lỗi khác:", error.message);
    }
    return Promise.reject(error);
});


export default axiosClient