import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import '@/assets/styles/app.css'
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';




// axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.baseURL = 'https://eden-wiki.herokuapp.com/api/'

// var inceptorInstance = axios.create({
//     baseURL: 'http://localhost:8000/api/'
// })

let isRefreshing = false;

axios.interceptors.request.use((config) => {
    NProgress.start();
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, (err) => Promise.reject(err));


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (error.response.status == 401 && error.response.data.message == 'token_expired') {
        if (!isRefreshing) {
            isRefreshing = true;
            axios.post('token/refresh').then((response) => {
                localStorage.setItem("token", response.data.token);
                router.go();
            });
        }
    } else if (error.response.status == 401 && error.response.data.message != 'token_expired') {
        router.replace('/admin/login');
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

const app = createApp(App)
app.use(router)
app.mount('#app')
