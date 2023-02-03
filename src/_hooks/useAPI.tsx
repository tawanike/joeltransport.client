import { useContext } from "react";
import UserAuthStateContext from "../_contexts/userAuth.context";
import { LOGOUT, RequestOptions } from "../_models/types";

const useAPI = () => {
    const API_URL = 'http://localhost:8000/v1';
    console.log('API_URL', API_URL);
    const { UserAuthState, dispatchUserAuth } = useContext(UserAuthStateContext);

    const request = (method: string) => {
        return (url: string, body: any) => {
            const requestOptions = {
                method,
                headers: authHeader(url)
            } as RequestOptions;
            if (body) {
                requestOptions.headers['Content-Type'] = 'application/json';
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(API_URL + url, requestOptions).then(handleResponse);
        }
    }

    const authHeader = (url: string) => {
        const token = authToken();
        const isLoggedIn = !!token;
        const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL as string);
        if (isLoggedIn && isApiUrl) {
            return { Authorization: `Bearer ${token}` };
        } else {
            return {};
        }
    }

    const authToken = () => {
        return UserAuthState?.token;
    }

    const handleResponse = (response: any) => {
        return response.text().then((text: any) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].includes(response.status) && authToken()) {
                    dispatchUserAuth({
                        type: LOGOUT
                    });
                }
                const error = (data && (data.detail ?? data)) || response.statusText;
                return Promise.reject(error);
            }
            return data;
        });
    }
    return {
        get: request('GET'),
        post: request('POST'),
        put: request('PUT'),
        delete: request('DELETE')
    };
}

export default useAPI;
