import axios from 'axios';

export type HTTPHeaders = Record<string, string>;

export type HTTPRequestOptions = {
  url: string;
  method?:  'GET';
  qs?: Record<string, string | number>;
};

class HttpService {
  async request<T>(options: HTTPRequestOptions): Promise<{ body: T; responseHeaders: HTTPHeaders }> {
    const { method, url } = options;

    const response = await axios.request<T>({
      method,
      url,
      params: options?.qs,
    });

    return { body: response.data, responseHeaders: response.headers };
  }
}

export const httpService = new HttpService();
export type Http = HttpService;