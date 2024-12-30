import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    },
    withCredentials: false
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // API uyanana kadar timeout süresini artıralım
        config.timeout = 10000;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.code === 'ERR_NETWORK' || error.response?.status === 503) {
            console.log('API servisi geçici olarak ulaşılamıyor. Lütfen biraz sonra tekrar deneyin.');
            // Burada kullanıcıya gösterilecek bir hata mesajı ekleyebiliriz
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
