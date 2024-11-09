import AuthManager from '@auth';
import {ENDPOINTS} from '../constants';
import Request from './request';
import {ChallengeRanking} from '@pages/Challenge';

interface SignUpRequestParams {
    id: string;
    email: string;
    password: string;
}

interface ChangePasswordRequestParams {
    email: string;
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
        email,
        id,
        newPassword,
    }: ChangePasswordRequestParams): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.CHANGE_PASSWORD,
            method: 'PATCH',
            body: JSON.stringify({email, id, newPassword}),
        });
        return await request.fire();
    }

    static async getUserProfile(): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.GET_USER_PROFILE,
            method: 'GET',
        });
        await request.setAuth();
        return await request.fire();
    }

    static async uploadImage({file}: {file: FormData}): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.UPLOAD_IMAGE,
            method: 'POST',
            headers: {
                'Content-Type': `multipart/form-data`,
            },
            body: file,
        });
        return await request.fire();
    }

    static async updateUserProfile({
        imageUrl,
    }: {
        imageUrl: string;
    }): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.UPDATE_USER_PROFILE_IMAGE,
            method: 'PATCH',
            body: JSON.stringify({
                image_url: imageUrl,
            }),
        });
        await request.setAuth();
        return await request.fire();
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
        const res = await request.fire();
        return res;
    }

    static async requestJoinChallenge({
        challengeId,
    }: {
        challengeId: number;
    }): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.CONNECT_USER_CHALLENGE,
            method: 'POST',
            body: JSON.stringify({
                challenge_id: challengeId,
                user_id: await AuthManager.selectUserId(),
            }),
        });
        await request.setAuth();
        return await request.fire();
    }

    static async createChallenge({
        name,
        description,
        isPrivate = false,
        password,
        imageUrl,
    }: {
        name: string;
        description: string;
        isPrivate: boolean;
        password?: string;
        imageUrl?: string;
    }): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.CREATE_CHALLENGE,
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                private: isPrivate,
                password,
                image_url: imageUrl,
            }),
        });
        await request.setAuth();
        return await request.fire();
    }

    static async deleteAccount(): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.DELETE_ACCOUNT,
            method: 'DELETE',
        });
        await request.setAuth();
        return await request.fire();
    }

    static async track(challengeRecord: any): Promise<any> {
        console.log(challengeRecord);
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.TRACK_RECORD,
            method: 'POST',
            body: JSON.stringify({
                challenge_id: challengeRecord.challengeId,
                start: Math.floor(challengeRecord.start / 1000),
                end: Math.floor(challengeRecord.end / 1000),
            }),
        });
        await request.setAuth();
        return await request.fire();
    }

    static async getRanking({
        challengeId,
    }: {
        challengeId: number;
    }): Promise<ChallengeRanking[]> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.GET_RANKING,
            method: 'GET',
            query: {
                challenge_id: challengeId,
            },
        });
        const res = await request.fire();
        return res;
    }

    static async getUserChallengeData({
        challengeId,
        offset = 0,
    }: {
        challengeId: number;
        offset?: number;
    }): Promise<any> {
        const request = new Request();
        request.set({
            endpoint: ENDPOINTS.PATH.GET_USER_CHALLENGE_DATA,
            method: 'GET',
            query: {
                challenge_id: challengeId,
                offset: offset,
            },
        });
        await request.setAuth();
        const res = await request.fire();
        return res;
    }
}

export default ApiManager;
