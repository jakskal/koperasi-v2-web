import axios from "axios";
import router from "../router"

// eslint-disable-next-line no-undef
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL
axios.interceptors.response.use(function (response) {
    // Do something before request is sent
    return response;
}, function (error) {
    if (error.response.status == 403) {
        localStorage.removeItem("token")
        router.push('/login')
    }
    return Promise.reject(error);
});

axios.interceptors.request.use(function (config) {

    var token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ` + token;
    } else {
        config.headers.Authorization = `Bearer ` + 'token elew elew';

        // axios.defaults.headers.common['Authorization'] = null;
        // /*if setting null does not remove `Authorization` header then try     
        //   delete axios.defaults.headers.common['Authorization'];
        // */
    }
    return config
}, function (error) {

    return Promise.reject(error)
})
export default axios;