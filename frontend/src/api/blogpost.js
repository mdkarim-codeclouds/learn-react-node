import axios from "./axios";

async function all(value) {
    var response = await axios.get('blog_posts', { params: value });
    return await response.json();
}

async function create(params) {
    var response = await axios.post('blog_posts', params);
    return await response.json();
}

async function update(params) {
    var response = await axios.put('blog_posts', params);
    return await response.json();
}

async function remove(params) {
    var response = await axios.delete('blog_posts', params);
    return await response.json();
}

export {
    all,
    create,
    update,
    remove
}