import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.use(router)

app.config.globalProperties.loginPath = 'api/auth';
app.config.globalProperties.baseUri = 'http://api.symfony.loc';
app.config.globalProperties.auth = function (login, password) {
    return fetch(this.baseUri + '/' + this.loginPath, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            return Promise.reject();
        })
        .then((tokenData) => {
            const json = JSON.stringify(tokenData);
            sessionStorage.setItem('tokenData', json);
            window.history.back()
        });
}
app.config.globalProperties.fetchWithAuth = function (url, options) {
    let tokenData = null;

    if (sessionStorage.tokenData) {
        tokenData = JSON.parse(sessionStorage.tokenData);
        console.log(tokenData);
    } else {
        return window.location.replace('/auth');
    }

    if (!options.headers) {
        options.headers = {};
    }

    if (tokenData) {
        if (Date.now() >= Date.parse(tokenData.expired_at)) {
            return window.location.replace('/auth');
        }

        options.headers.Authorization = `Bearer ${tokenData.auth_token}`;
    }

    return fetch(url, options).then((response) => {
        if (response.status === 401) {
            window.location.replace('/auth')
        }
        return response;
    });
}

app.mount('#app')

