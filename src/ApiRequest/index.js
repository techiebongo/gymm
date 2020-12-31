import axios from 'axios';

// axios.defaults.baseURL= 'https://nodeserver.mydevfactory.com:1436/api';

// axios.defaults.timeout=2500

export const API_URL = 'https://nodeserver.mydevfactory.com:1436/api';


export function getRequest(url, header) {
    return axios.get(`${API_URL}/${url}`, {
        headers: {
            'Accept': header.Accept,
            'Information': header.information,
            'Authorization': header.Authorization
        }
    });
}


export function postRequest(url, payload, header) {
    console.log("url----->", `${API_URL}/${url}`)
    return axios.post(`${API_URL}/${url}`, payload, {
        headers: {
            // "Accept": header.Accept,
            'Content-Type': header.Contenttype,
            // 'Authorization': header.Authorization, 
            // 'Information': header.information,
        }
    });
}

export function deleteRequest(url, header) {
    return axios.delete(`${API_URL}/${url}`, {
        headers: {
            'Content-Type': header.contenttype,
            'Authorization': header.Authorization,
            'Information': header.information,
        }
    });
}


export function putRequest(url, payload, header) {
    return axios.put(`${API_URL}/${url}`, payload, {
        headers: {
            'information': header.information,
            'Content-Type': header.contenttype,
            'Authorization': header.Authorization,
        }
    });
}


