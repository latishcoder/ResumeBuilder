import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
   timeout: 10000,
   headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
   }
});

//REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use((config) => {
    const accessToken  = localStorage.getItem("accessToken");
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
},
(error) => {
    return Promise.reject(error);
}
);

//RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use((response) => {
    (response) => {
        return response;
    }
},
(error) => {
    if(error.response) {
        if(error.response.status === 401) {
        window.location.href = "/login";
    }
     else if (error.response.status === 403) {
         console.error('Server error');
         
     }
    }
    else if (error.code === 'ENCONNABORTED') {
        console.error("Request timed out");
        
    }
    return Promise.reject(error);
}
);

export default axiosInstance;