import {ENDPOINTS} from '../constants';

class ApiManager {
    static async signUp({id, email, password}) {
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
    static async changePassword({id, newPassword}) {
        const request = new Request();
        request.set({
            end
        })
    }
}

class Request {
    constructor() {
        this.baseUrl = ENDPOINTS.API_SERVER;
        this.headers = {
            'Content-Type': 'application/json',
        };
    }

    set({endpoint, method, headers, body}) {
        this.endpoint = endpoint;
        this.method = method;
        this.headers = Object.assign(this.headers, headers);
        this.body = body;
    }

    async fire() {
        const response = await fetch(`${this.baseUrl}/${this.endpoint}`, {
            method: this.method,
            headers: this.headers,
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
