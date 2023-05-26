import axios from "./axios";

async function login(params) {
    var response = await axios.post('auth/signin', params);
    return response;
}

async function register(params) {
    var response = await axios.post('auth/signup', params);
    return response;
}

async function logout(params) {
    var response = await axios.post('auth/signout', params);
    return response;
}

async function checkUserToken(params) {
    var response = await axios.post('auth/check', params);
    return response;
}

export {
    login,
    register,
    logout,
    checkUserToken
}