import { RequestOptions } from "../_models/types";

const useAPI = () => {
  let API_URL = process.env.NEXT_PUBLIC_API_URL as string;

  const request = (method: string) => {
    return (url: string, body: any) => {
      const requestOptions = {
        method,
        headers: authHeader(url),
      } as RequestOptions;
      if (body) {
        requestOptions.headers["Content-Type"] = "application/json";
        requestOptions.body = JSON.stringify(body);
      }
      return fetch(API_URL + url, requestOptions).then(handleResponse);
    };
  };

  const authHeader = (url: string) => {
    const token = "";
    const isLoggedIn = !!token;
    const isApiUrl = url.startsWith(process.env.NEXT_PUBLIC_API_URL as string);
    if (isLoggedIn && isApiUrl) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  };

  const handleResponse = (response: any) => {
    return response.text().then((text: any) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && (data.detail ?? data)) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  };
  return {
    get: request("GET"),
    post: request("POST"),
    put: request("PUT"),
    patch: request("PATCH"),
    delete: request("DELETE"),
  };
};

export default useAPI;
