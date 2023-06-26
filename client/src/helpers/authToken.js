import axios from "axios";

const setAuthToken = token => {
    if (token){
        axios.defaults.headers.Authorization =  token ? `Bearer ${token}` : '';
        //axios.defaults.headers.Authorization= token;
    } else (
        delete axios.defaults.headers.Authorization
    )
}

export default setAuthToken;