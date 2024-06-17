import {ENDPOINTS} from '../constants';
import Storage from '../storage';
interface SignUpRequestParams {
    id: string;
    email: string;
    password: string;
}

interface SignInRequestParams {
    id: string;
    password: string;
}

interface ChangePasswordRequestParams {
    id: string;
    newPassword: string;
}

class ApiManager {
    static async signUp({
        id,
        email,
        password,
    }: SignUpRequestParams): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.SIGN_UP,
            method: 'POST',
            body: JSON.stringify({id, email, password}),
        });
        return await request.fire();
    }

    static async signIn({id, password}: SignInRequestParams): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.SIGN_IN,
            method: 'POST',
            body: JSON.stringify({id, password}),
        });
        return await request.fire();
    }

    static async changePassword({
        id,
        newPassword,
    }: ChangePasswordRequestParams): Promise<any> {
        const request = new Request();
        // request.set({});
    }

    static async requestEmailAuthCode(email: string): Promise<any> {
        return {
            isSuccess: true,
            result: {
                code: '123456',
            },
        };
        const request = new Request();
        request.set({
            endpoint: '/app/email-auth-code',
            method: 'POST',
            body: JSON.stringify({email}),
        });
        const body = await request.fire();
        console.log('body: ', body);
        return body;
    }
}

interface RequestHeaders {
    'Content-Type'?: string;
    Authorization?: string;
}

type RequestParams = {
    endpoint: string;
    method: string | undefined;
    headers?: RequestHeaders | undefined;
    body?: string | undefined;
};

class Request {
    baseUrl: string;
    endpoint?: string;
    method?: string;
    headers: RequestHeaders;
    body?: string;

    constructor() {
        this.baseUrl = ENDPOINTS.API_SERVER;
        this.headers = {
            'Content-Type': 'application/json',
            'X-Access-Token': undefined,
        } as RequestHeaders;
    }

    set({endpoint, method, headers, body}: RequestParams) {
        this.endpoint = endpoint;
        this.method = method;
        this.headers = Object.assign(
            this.headers,
            headers ?? {},
        ) as RequestHeaders;
        this.body = body;
    }

    async fire() {
        const response = await fetch(`${this.baseUrl}/${this.endpoint}`, {
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
        if (!body.isSuccess || !body.result) {
            let responseError = new Error();
            responseError.message = body.message;
            throw responseError;
        }
        return body.result;
    }
}

export default ApiManager;
