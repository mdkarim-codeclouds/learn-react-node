// axios
import axios from "axios";
import config from '../config/index';

let domain = "http://localhost:3030/api/"; //Live version 

if (process.env.NODE_ENV === "development") {
    domain = "http://localhost:3030/api/";
}

const headers = {
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
};
const namespace = config.LOCAL_STORAGE_KEY;
const userInfoNamespace = config.LOCAL_STORAGE_USER_INFO_KEY;
if (localStorage.getItem(namespace)) {
    let data = JSON.parse(localStorage.getItem(namespace));
    if (data[userInfoNamespace]) {
        headers["Authorization"] = "Bearer " + data[userInfoNamespace]['token'];
    }
}
var axiosObj = axios.create({
    baseURL: domain,
    timeout: 100000,
    headers: headers,
});

axiosObj.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        return Promise.reject(error.response);
    }
);

export default axiosObj;
