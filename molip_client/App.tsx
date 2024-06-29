import React, {useEffect} from 'react';
import AuthManager from '@auth';

import {
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    NativeModules,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import LoginPage from '@pages/LoginPage';
import SignUpPage from '@pages/SignUpPage';
import PasswordResetPage from '@pages/PasswordResetPage';
import Tabbar from '@pages/Tabbar';

import {PageName, PAGES, PageStackParamList} from '@pages/PageConfig';
import {
    MyDataContext,
    MyData,
    UserProfile,
    fetchUserProfile,
} from '@lib/context';

import {LoadingSpinner} from '@components/loading_spinner';
import {Challenge} from '@pages/Challenge';

const {StatusBarManager} = NativeModules;

const IS_IOS_PLATFORM = Platform.OS === 'ios';
const PageStack = createStackNavigator<PageStackParamList>();

function MolipApp(): React.ReactElement {
    const [processing, setProcessing] = React.useState(true);

    const [userId, setUserId] = React.useState<string | undefined>(undefined);
    const [myChallenges, setMyChallenges] = React.useState<Challenge[]>([]);
    const [allChallenges, setAllChallenges] = React.useState<Challenge[]>([]);
    const [keyboardOffset, setKeyboardOffset] = React.useState(0);
    const [userProfile, setUserProfile] = React.useState<
        UserProfile | undefined
    >(undefined);

    const MyData: MyData = {
        userId,
        myChallenges,
        allChallenges,
        setUserId,
        setMyChallenges,
        setAllChallenges,
        userProfile,
        setUserProfile,
    };

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
                {processing ? (
                    <LoadingSpinner />
                ) : (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <MyDataContext.Provider value={MyData}>
                            <PageStack.Navigator
                                screenOptions={{headerShown: false}}>
                                <PageStack.Screen
                                    name={PAGES.LoginPage.name as PageName}
                                    component={LoginPage}
                                />
                                <PageStack.Screen
                                    name={PAGES.SignUpPage.name as PageName}
                                    component={SignUpPage}
                                />
                                <PageStack.Screen
                                    name={
                                        PAGES.PasswordResetPage.name as PageName
                                    }
                                    component={PasswordResetPage}
                                />
                                <PageStack.Screen
                                    name={PAGES.Tabbar.name as PageName}
                                    component={Tabbar}
                                />
                            </PageStack.Navigator>
                        </MyDataContext.Provider>
                    </TouchableWithoutFeedback>
                )}
            </KeyboardAvoidingView>
        </NavigationContainer>
    );
}

export default MolipApp;
