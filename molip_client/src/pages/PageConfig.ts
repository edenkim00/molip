interface NavigationProps {
    navigation: any;
    route: any;
    userId: string;
    setUserId: (userId: string) => void;
    myChallenges: any;
    setMyChallenges: any;
    allChallenges: any;
    setAllChallenges: any;
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
