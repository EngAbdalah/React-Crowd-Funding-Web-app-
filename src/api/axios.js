import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/",
    headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token) => {
    refreshSubscribers.forEach(cb => cb(token));
};

API.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        
        // Proper FormData handling
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }
        
        return config;
    },
    (error) => Promise.reject(error)
);


API.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest.url.includes('api/token/')) {
            if (isRefreshing) {
                return new Promise(resolve => {
                    subscribeTokenRefresh(token => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(API(originalRequest));
                    });
                });
            }

            isRefreshing = true;
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) throw new Error("No refresh token available");
                
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: refreshToken
                });

                const newAccessToken = response.data.access;
                localStorage.setItem("access_token", newAccessToken);
                
                onRefreshed(newAccessToken);
                refreshSubscribers = [];
                
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return API(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        
        return Promise.reject(error);
    }
);

export default API;