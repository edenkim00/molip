import React, {useEffect} from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    NativeModules,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import PasswordResetPage from './src/pages/PasswordResetPage';

import LoginPage from './src/pages/LoginPage';
import SignUpPage from './src/pages/SignUpPage';
import Tabbar from './src/pages/Tabbar';
import {PageName, PAGES, PageStackParamList} from './src/pages/PageConfig';
import AuthManger from 'src/api/auth';

const {StatusBarManager} = NativeModules;

const IS_IOS_PLATFORM = Platform.OS === 'ios';
const PageStack = createStackNavigator<PageStackParamList>();

async function tryAutoLoginAndSelectUserId() {
    await AuthManger.tryAutoLogin();
    return await AuthManger.selectUserId();
}

function MolipApp(): React.ReactElement {
    const [userId, setUserId] = React.useState<string | undefined>(undefined);

    const [keyboardOffset, setKeyboardOffset] = React.useState(0);

    const avoidKeyboard: () => void = () => {
        Platform.OS === 'ios' &&
            StatusBarManager.getHeight((data: {height: number}) => {
                setKeyboardOffset(data.height || 0);
            });
    };

    useEffect(() => {
        avoidKeyboard();
        try {
            tryAutoLoginAndSelectUserId().then(setUserId);
        } catch {
            // do nothing
        }
    }, []);

    return (
        <NavigationContainer independent={true}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardOffset}
                behavior={IS_IOS_PLATFORM ? 'padding' : 'height'}
                className="w-full h-full relative">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <PageStack.Navigator screenOptions={{headerShown: false}}>
                        <PageStack.Screen
                            name={PAGES.Tabbar.name as PageName}
                            component={Tabbar}
                            initialParams={{userId}}
                        />
                        <PageStack.Screen
                            name={PAGES.LoginPage.name as PageName}
                            component={LoginPage}
                            initialParams={{userId}}
                        />
                        <PageStack.Screen
                            name={PAGES.SignUpPage.name as PageName}
                            component={SignUpPage}
                        />
                        <PageStack.Screen
                            name={PAGES.PasswordResetPage.name as PageName}
                            component={PasswordResetPage}
                        />
                    </PageStack.Navigator>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </NavigationContainer>
    );
}

export default MolipApp;
