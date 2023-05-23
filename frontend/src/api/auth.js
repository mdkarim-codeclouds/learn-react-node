import axios from "./axios";

async function login(params) {
    var response = await axios.post('auth/signin', params);
    return await response.json();
}

async function register(params) {
    var response = await axios.post('auth/signup', params);
    return await response.json();
}

async function logout(params) {
    var response = await axios.post('auth/signout', params);
    return await response.json();
}

export {
    login,
    register,
    logout
}