import ApiManager from '@api';
import Storage from '@storage';
import {STORAGE_KEYS} from 'src/constants';
import retry from 'async-retry';

interface LoginInfo {
    id: string;
    password: string;
}

interface AuthCard {
    userId: string;
    jwtToken: string;
}

export default class AuthManger {
    private _cached: AuthCard | undefined = undefined;
    private _id: string | undefined = undefined;
    private _password: string | undefined = undefined;
    static main: AuthManger | undefined = undefined;

    constructor() {
        this._id = undefined;
        this._password = undefined;
        AuthManger.main = this;
    }

    static async set({id, password}: LoginInfo) {
        new AuthManger();
        if (id && password) {
            Storage.set(STORAGE_KEYS.LOGIN_INFO, {id, password});
        }
    }

    static async setup() {
        const main = AuthManger.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }

        const {_id: id, _password: password} = main;
        if (!id || !password) {
            throw new Error('Invalid id or password');
        }

        const loginInfo = await ApiManager.signIn({id, password});
        await Storage.set(STORAGE_KEYS.AUTH, JSON.stringify(loginInfo));
        main._cached = {
            userId: loginInfo.userId,
            jwtToken: loginInfo.jwtToken,
        };
    }

    static async refresh() {
        const main = AuthManger.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }
        // TODO: Refresh token logic in backend and use it here
        // Now, just re-login
        await this.setup();
    }

    static async selectUserId(): Promise<string> {
        const main = AuthManger.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }

        const cachedUserId = this.main?._cached?.userId;
        if (cachedUserId) {
            return cachedUserId;
        }

        await this.refresh();
        return retry(
            async () => {
                return this.selectUserId();
            },
            {
                retries: 2,
            },
        );
    }

    static async selectJwtToken(): Promise<string> {
        const main = AuthManger.main;
        if (!main) {
            throw new Error('AuthManager is not initialized');
        }

        const cachedJwtToken = this.main?._cached?.jwtToken;
        if (cachedJwtToken) {
            return cachedJwtToken;
        }

        await this.refresh();

        return retry(
            async () => {
                return this.selectJwtToken();
            },
            {
                retries: 2,
            },
        );
    }

    static async tryAutoLogin() {
        const main = AuthManger.main;
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

        main._id = loginInfo.id;
        main._password = loginInfo.password;
        return this.setup();
    }
}
