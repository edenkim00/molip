import React, {useEffect} from 'react';
import AuthManager from '@auth';

import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    NativeModules,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import PasswordResetPage from './src/pages/PasswordResetPage';

import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';
import Tabbar from './src/pages/Tabbar';
import {PageName, PAGES, PageStackParamList} from './src/pages/PageConfig';
import {Challenge} from '@components/challenge';
import ApiManager from '@api';
import {LoadingSpinner} from '@components/loading_spinner';

const {StatusBarManager} = NativeModules;

const IS_IOS_PLATFORM = Platform.OS === 'ios';
const PageStack = createStackNavigator<PageStackParamList>();

function MolipApp(): React.ReactElement {
    const [processing, setProcessing] = React.useState(true);
    const [userId, setUserId] = React.useState<string | undefined>(undefined);

    const [keyboardOffset, setKeyboardOffset] = React.useState(0);

    const avoidKeyboard: () => void = () => {
        Platform.OS === 'ios' &&
            StatusBarManager.getHeight((data: {height: number}) => {
                setKeyboardOffset(data.height || 0);
            });
    };

    async function tryAutoLoginAndSelectUserId() {
        try {
            new AuthManager();
            await AuthManager.tryAutoLogin();
        } catch (e) {
            // do nothing
        }
        const userId = await AuthManager.selectUserId();
        if (!userId) {
            throw new Error('Failed to get userId');
        }
        setUserId(userId);
        return;
    }

    useEffect(() => {
        avoidKeyboard();
        try {
            tryAutoLoginAndSelectUserId()
                .then(() => {
                    setProcessing(false);
                })
                .catch(() => {
                    setProcessing(false);
                });
        } catch {
            // do nothing
        }
    }, []);

    useEffect(() => {
        if (userId) {
            setProcessing(false);
        }
    }, [userId]);

    if (processing) {
        return <LoadingSpinner />;
    }

    return (
        <NavigationContainer independent={true}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardOffset}
                behavior={IS_IOS_PLATFORM ? 'padding' : 'height'}
                className="w-full h-full relative">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <PageStack.Navigator screenOptions={{headerShown: false}}>
                        <PageStack.Screen
                            name={PAGES.LoginPage.name as PageName}
                            component={LoginPage}
                            initialParams={{
                                userId,
                            }}
                        />
                        <PageStack.Screen
                            name={PAGES.SignUpPage.name as PageName}
                            component={SignUpPage}
                        />
                        <PageStack.Screen
                            name={PAGES.PasswordResetPage.name as PageName}
                            component={PasswordResetPage}
                        />
                        <PageStack.Screen
                            name={PAGES.Tabbar.name as PageName}
                            component={Tabbar}
                            initialParams={{userId}}
                        />
                    </PageStack.Navigator>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </NavigationContainer>
    );
}

export default MolipApp;
