import axios from "./axios";

async function fetchPost(value) {
    var response = await axios.get('post', { params: value });
    return response;
}

async function all(value) {
    var response = await axios.get('blog_posts', { params: value });
    return response;
}

async function create(params) {
    var response = await axios.post('blog_posts', params);
    return response;
}

async function update(params) {
    var response = await axios.put('blog_posts', params);
    return response;
}

async function remove(params) {
    var response = await axios.delete('blog_posts', { data: params });
    return response;
}

export {
    fetchPost,
    all,
    create,
    update,
    remove
}