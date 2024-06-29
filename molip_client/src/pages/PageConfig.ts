interface NavigationProps {
    navigation: any;
    route: any;
}

interface LoginPageProps extends NavigationProps {}

interface SignUpPageProps extends NavigationProps {}

interface ForgotPasswordLabelProps extends NavigationProps {}

interface TabbarProps extends NavigationProps {}

export type PageName =
    | 'LoginPage'
    | 'SignUpPage'
    | 'PasswordResetPage'
    | 'Tabbar';
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
    Tabbar: {
        name: 'Tabbar',
    },
};

export type PageProps =
    | LoginPageProps
    | SignUpPageProps
    | ForgotPasswordLabelProps
    | TabbarProps;

export type PageStackParamList = {
    LoginPage: LoginPageProps;
    SignUpPage: SignUpPageProps;
    PasswordResetPage: ForgotPasswordLabelProps;
    Tabbar: TabbarProps;
};

export interface TabbarInitialParams {}

export type RootTabParamList = {
    Home: TabbarInitialParams;
    Discover: TabbarInitialParams;
    'My Profile': TabbarInitialParams;
};
