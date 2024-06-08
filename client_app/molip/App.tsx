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
import {PAGES} from './src/pages/PageConfig';

const {StatusBarManager} = NativeModules;

type RootStackParamList = {
    LoginPage: {
        userId: string | undefined;
    };
    SignUpPage: undefined;
    Tabbar: {
        userId: string;
    };
    PasswordResetPage: {};
};

const IS_IOS_PLATFORM = Platform.OS === 'ios';
const PageStack = createStackNavigator<RootStackParamList>();

function MolipApp(): React.ReactElement {
    const [keyboardOffset, setKeyboardOffset] = React.useState(0);

    useEffect(() => {
        Platform.OS === 'ios' &&
            StatusBarManager.getHeight((res: {height: number}) => {
                setKeyboardOffset(res.height || 0);
            });
    }, []);

    return (
        <NavigationContainer>
            <KeyboardAvoidingView
                keyboardVerticalOffset={keyboardOffset}
                behavior={IS_IOS_PLATFORM ? 'padding' : 'height'}
                className="w-full h-full relative">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <PageStack.Navigator screenOptions={{headerShown: false}}>
                        <PageStack.Screen
                            name="LoginPage"
                            component={LoginPage}
                        />
                        <PageStack.Screen
                            name="SignUpPage"
                            component={SignUpPage}
                        />
                        <PageStack.Screen
                            name="PasswordResetPage"
                            component={PasswordResetPage}
                        />
                    </PageStack.Navigator>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </NavigationContainer>
    );
}

export default MolipApp;
