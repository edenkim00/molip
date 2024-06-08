import {ENDPOINTS} from '../constants';

interface SignUpParams {
    id: string;
    email: string;
    password: string;
}

interface ChangePasswordParams {
    id: string;
    newPassword: string;
}

class ApiManager {
    static async signUp({id, email, password}: SignUpParams): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: '/app/user',
            method: 'POST',
            body: JSON.stringify({id, email, password}),
        });
        const body = await request.fire();
        console.log('body: ', body);
        return body;
    }
    // method: PATCH, body: id, newPassword
    static async changePassword({
        id,
        newPassword,
    }: ChangePasswordParams): Promise<any> {
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
            Authorization: undefined,
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
        try {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            return null;
        }
    }
}

export default ApiManager;
