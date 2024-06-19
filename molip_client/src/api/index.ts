import {ENDPOINTS} from '../constants';
import Request from './request';

interface SignUpRequestParams {
    id: string;
    email: string;
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

    static async changePassword({
        id,
        newPassword,
    }: ChangePasswordRequestParams): Promise<any> {
        const request = new Request();
        // request.set({});
    }

    static async requestEmailAuthCode(
        email: string,
        shouldExist: boolean = false,
    ): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.REQUEST_EMAIL_VERIFICATION,
            method: 'GET',
            query: {email, shouldExist},
        });
        const body = await request.fire();
        console.log('body: ', body);
        return body;
    }

    static async selectChallenges(): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.SELECT_CHALLENGES,
            method: 'GET',
        });
        return await request.fire();
    }

    static async selectUserChallenges(
        userId: string | undefined = undefined,
    ): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.SELECT_USER_CHALLENGES,
            method: 'GET',
            query: {user_id: userId},
        });
        await request.setAuth();
        return await request.fire();
    }
}

export default ApiManager;
