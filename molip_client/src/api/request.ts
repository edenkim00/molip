import {ENDPOINTS} from '../constants';
import AuthManager from '@auth';

export interface RequestHeaders {
    'Content-Type'?: string;
    'X-Access-Token'?: string;
}

export type RequestParams = {
    endpoint: string;
    method: string | undefined;
    headers?: RequestHeaders | undefined;
    body?: string | undefined;
    query?: {[key: string]: any} | undefined;
};

class Request {
    baseUrl: string;
    endpoint?: string;
    method?: string;
    headers: RequestHeaders;
    query?: {[key: string]: any};
    body?: string;

    constructor() {
        this.baseUrl = ENDPOINTS.API_SERVER;
        this.headers = {
            'Content-Type': 'application/json',
            'X-Access-Token': undefined,
        } as RequestHeaders;
    }

    set({endpoint, method, headers, body, query}: RequestParams) {
        this.endpoint = endpoint;
        this.method = method;
        this.headers = Object.assign(
            this.headers,
            headers ?? {},
        ) as RequestHeaders;
        this.body = body;
        this.query = query;
    }

    async setAuth() {
        const accessToken = await AuthManager.selectJwtToken();
        if (accessToken) {
            this.headers['X-Access-Token'] = accessToken;
        } else {
            throw new Error('Failed to get Auth');
        }
    }

    async fire() {
        const path =
            `${this.baseUrl}${this.endpoint}` +
            (this.query
                ? `?${new URLSearchParams(this.query).toString().trim()}`
                : ''
            ).replace(/ /g, '');
        const response = await fetch(path, {
            method: this.method,
            headers: this.headers as HeadersInit_,
            body: this.body,
        });
        let body;
        try {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            body = await response.json();
        } catch (error) {
            return null;
        }
        if (!body.isSuccess) {
            let responseError = new Error();
            responseError.message = body.message;
            throw responseError;
        }
        return body.result;
    }
}

export default Request;
