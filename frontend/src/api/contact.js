import axios from "./axios";

async function submit(params) {
    var response = await axios.post('contact_us', params);
    return response;
}

async function all(value) {
    var response = await axios.get('contact_us', { params: value });
    return response;
}

export {
    submit,
    all
}