import Storage from '@storage';
import {ENDPOINTS, STORAGE_KEYS} from '../../constants';
import retry from 'async-retry';
import {useContext} from 'react';
import {MyDataContext} from '@lib/context';

interface LoginInfo {
    id: string;
    password: string;
}

interface AuthCard {
    userId: string;
    jwtToken: string;
}

class AuthManager {
    private _cached: AuthCard | undefined = undefined;
    private _id: string | undefined = undefined;
    private _password: string | undefined = undefined;
    static main: AuthManager | undefined = undefined;

    constructor() {
        this._id = undefined;
        this._password = undefined;
        AuthManager.main = this;
    }

    static async requestAuth({id, password}: LoginInfo): Promise<any> {
        const path = `${ENDPOINTS.API_SERVER}${ENDPOINTS.PATH.SIGN_IN}`;
        const res = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, password}),
        });
        const body = await res.json();
        if (!body.isSuccess) {
            let responseError = new Error();
            responseError.message = body.message || 'Failed to login';
            throw responseError;
        }
        return body.result;
    }

    static async clear() {
        new AuthManager();
        const main = AuthManager.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }
        main._cached = undefined;
        main._id = undefined;
        main._password = undefined;
        await Storage.remove(STORAGE_KEYS.AUTH);
        await Storage.remove(STORAGE_KEYS.LOGIN_INFO);
    }

    static async set({id, password}: LoginInfo) {
        new AuthManager();
        if (id && password) {
            const main = AuthManager.main;
            if (!main) {
                throw new Error('AuthManager is not initialized');
            }
            main._id = id;
            main._password = password;
            Storage.set(
                STORAGE_KEYS.LOGIN_INFO,
                JSON.stringify({id, password}),
            );
        }
    }

    static async setup() {
        const main = AuthManager.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }

        const {_id: id, _password: password} = main;
        if (!id || !password) {
            throw new Error('Invalid id or password');
        }

        const loginInfo = await this.requestAuth({id, password});
        if (!loginInfo?.token) {
            throw new Error('Failed to login');
        }

        const auth = {
            userId: id,
            jwtToken: loginInfo.token,
        };
        await Storage.set(STORAGE_KEYS.AUTH, JSON.stringify(auth));
        main._cached = auth;
    }

    static async refresh() {
        const main = AuthManager.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }
        // TODO: Refresh token logic in backend and use it here
        // Now, just re-login
        await this.setup();
    }

    static async selectUserId(): Promise<string> {
        const main = AuthManager.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }

        const cachedUserId = this.main?._cached?.userId;
        if (cachedUserId) {
            return cachedUserId;
        }

        return retry(
            async () => {
                if (this.main?._cached?.userId) {
                    return this.main?._cached?.userId;
                }
                await this.refresh();
                throw new Error('Failed to get userId');
            },
            {
                retries: 2,
            },
        );
    }

    static async selectJwtToken(): Promise<string> {
        const main = AuthManager.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }

        const cachedJwtToken = this.main?._cached?.jwtToken;
        if (cachedJwtToken) {
            return cachedJwtToken;
        }

        return retry(
            async () => {
                if (this.main?._cached?.jwtToken) {
                    return this.main?._cached?.jwtToken;
                }
                await this.refresh();
                throw new Error('Failed to get jwtToken');
            },
            {
                retries: 2,
            },
        );
    }

    static async tryAutoLogin() {
        const main = AuthManager.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }

        const auth = await Storage.get(STORAGE_KEYS.AUTH);
        if (auth) {
            main._cached = JSON.parse(auth);
        }

        const loginInfo = await Storage.get(STORAGE_KEYS.LOGIN_INFO);
        if (!loginInfo) {
            throw new Error('Auto login failed');
        }
        const parsedLoginInfo = JSON.parse(loginInfo);

        main._id = parsedLoginInfo.id;
        main._password = parsedLoginInfo.password;
        return this.setup();
    }
}

export default AuthManager;
