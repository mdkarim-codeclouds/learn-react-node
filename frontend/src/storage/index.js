import Config from '../config/index';
import axios from '../api/axios';

const namespace = Config.LOCAL_STORAGE_KEY;
const userInfoNamespace = Config.LOCAL_STORAGE_USER_INFO_KEY;

const setStorage = (key, value) => {
    let data = null;
    if (localStorage.getItem(namespace)) {
        data = localStorage.getItem(namespace);
        data[key] = value;
    } else {
        data = {
            key: value
        }
    }
    localStorage.setItem(namespace, JSON.stringify(data));
    return data;
};
const getStorage = (key) => {
    if (localStorage.getItem(namespace)) {
        let data = JSON.parse(localStorage.getItem(namespace));
        return data[key];
    }
    return false;
};
const removeStorage = (key) => {
    if (localStorage.getItem(namespace)) {
        let data = JSON.parse(localStorage.getItem(namespace));
        delete data[key];
        localStorage.setItem(namespace, JSON.stringify(data));
        return true;
    }
    return false;
};
const setUserData = (value) => {
    let data = null;
    if (localStorage.getItem(namespace)) {
        data = JSON.parse(localStorage.getItem(namespace));
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + value.token;
        data[userInfoNamespace] = value;
    } else {
        data = {
            user_info: value
        }
    }
    localStorage.setItem(namespace, JSON.stringify(data));
    return data;
};
const isUserLogin = () => {
    if (localStorage.getItem(namespace)) {
        let data = JSON.parse(localStorage.getItem(namespace));
        if (data[userInfoNamespace]) {
            return true;
        }
    }
    return false;
};
const getUserName = () => {
    if (localStorage.getItem(namespace)) {
        let data = JSON.parse(localStorage.getItem(namespace));
        if (data[userInfoNamespace]) {
            return data[userInfoNamespace]['name'];
        }
    }
    return false;
};
const unsetUserData = () => {
    if (localStorage.getItem(namespace)) {
        let data = JSON.parse(localStorage.getItem(namespace));
        delete data[userInfoNamespace];
        axios.defaults.headers.common['Authorization'] = null;
        localStorage.setItem(namespace, JSON.stringify(data));
        return true;
    }
    return false;
};
const getUserAuthToken = () => {
    if (localStorage.getItem(namespace)) {
        let data = JSON.parse(localStorage.getItem(namespace));
        if (data[userInfoNamespace]) {
            return data[userInfoNamespace]['token'];
        }
    }
    return null;
}

export {
    setStorage,
    getStorage,
    removeStorage,
    setUserData,
    isUserLogin,
    getUserName,
    unsetUserData,
    getUserAuthToken,
}