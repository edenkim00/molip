type Endpoints = {
    API_SERVER: string;
    PATH: {
        [key: string]: string;
    };
};

export const ENDPOINTS: Endpoints = {
    API_SERVER:
        'https://yvn47itsk7gktfq7sz3bw5vpru0bkknb.lambda-url.ap-northeast-2.on.aws',
    PATH: {
        SIGN_IN: '/app/user/sign-in',
        SIGN_UP: '/app/user',
        DELETE_ACCOUNT: '/app/user',
        GET_USER_PROFILE: '/app/user',
        CHANGE_PASSWORD: '/app/user-password',
        REQUEST_EMAIL_VERIFICATION: '/app/user/email-verification',
        CREATE_CHALLENGE: '/app/challenge',
        SELECT_CHALLENGES: '/app/challenge',
        SELECT_USER_CHALLENGES: '/app/user/challenge',
        CONNECT_USER_CHALLENGE: '/app/challenge-join',
        DISCONNECT_USER_CHALLENGE: '/app/challenge-join',
        UPLOAD_IMAGE: '/app/image',
        UPDATE_USER_PROFILE_IMAGE: '/app/user/profile-image',
    },
};

export const STORAGE_KEYS = {
    LOGIN_INFO: 'login_info',
    AUTH: 'auth',
};
