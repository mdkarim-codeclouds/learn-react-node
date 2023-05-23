import Config from '../config/index';

const notifyError = (msg = 'Something went wrong!') => {
    return toast.error(msg);
}
const notifySuccess = (msg = 'Success') => {
    return toast.success(msg);
}
const notifyInfo = (msg = 'Information') => {
    return toast.info(msg);
}
const notifyWarn = (msg = 'Warning!!!') => {
    return toast.warning(msg);
}

export {
    notifyError,
    notifySuccess,
    notifyInfo,
    notifyWarn
}