interface NavigationProps {
    navigation: any;
}

interface LoginPageProps extends NavigationProps {}

interface SignUpPageProps extends NavigationProps {}

interface ForgotPasswordLabelProps extends NavigationProps {}

interface PageConfig {
    name: string;
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

export type PageName = keyof typeof PAGES;
