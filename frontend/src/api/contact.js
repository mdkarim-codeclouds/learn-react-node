import axios from "./axios";

async function submit(params) {
    var response = await axios.post('contact_us', params);
    return await response.json();
}

async function all(value) {
    var response = await axios.get('contact_us', { params: value });
    return await response.json();
}

export {
    submit,
    all
}