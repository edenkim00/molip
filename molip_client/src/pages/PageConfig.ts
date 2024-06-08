interface NavigationProps {
    navigation: any;
}

interface LoginPageProps extends NavigationProps {}

interface SignUpPageProps extends NavigationProps {}

interface ForgotPasswordLabelProps extends NavigationProps {}

export type PageName = 'LoginPage' | 'SignUpPage' | 'PasswordResetPage';
interface PageConfig {
    name: PageName;
}

export const PAGES: Record<string, PageConfig> = {
    LoginPage: {
        name: 'LoginPage',
    },
    PasswordResetPage: {
        name: 'PasswordResetPage',
    },
    SignUpPage: {
        name: 'SignUpPage',
    },
};

export type PageProps =
    | LoginPageProps
    | SignUpPageProps
    | ForgotPasswordLabelProps;

export type PageStackParamList = {
    LoginPage: LoginPageProps;
    SignUpPage: SignUpPageProps;
    PasswordResetPage: ForgotPasswordLabelProps;
};
