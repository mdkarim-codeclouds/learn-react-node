import { useEffect } from "react";

const NoPage = () => {
    useEffect(() => {
        document.title = "React Node | 404";
    }, []);
    return <h1>404</h1>;
};

export default NoPage;