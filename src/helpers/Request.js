import axios from 'axios';
import { getToken } from '../helpers/Auth';

const Request = (options) => {        
    axios.defaults.baseURL = 'http://localhost:9000';
    axios.defaults.headers.post['Content-Type'] = 'application/json';

    axios.interceptors.request.use((config) => {
        const token = getToken();
        if (token) {
            config.headers.common['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {        
        if (!error.response) {
            console.warn('error', error);            
            return Promise.reject(error);
        }
        
        switch (error.response.status) {
            case 401:
            case 403:                
                window.location.replace('/login');
                break;
            default:
                return Promise.reject(error);
        }
    });

    return axios(options);
};

export default Request;