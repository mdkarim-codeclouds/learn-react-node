const checkForImage = (url) => {
    let regex = /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gmi
    let result;
    if (url.match(regex)) {
        result = {
            match: url.match(regex)
        }
    } else {
        result = false;
    }
    return result;
}
const convertToSlug = (text) => {
    return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
}
const validateEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export {
    checkForImage,
    convertToSlug,
    validateEmail
}