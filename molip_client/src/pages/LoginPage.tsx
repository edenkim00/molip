import React, {useEffect, useState} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import LogoImage from '@assets/molip_logo.png';
import LearningApplicationBanner from '@assets/language_learning_application.png';
import BackgroundImage from '@assets/login_page_background.png';
import {KakaoLoginButton} from '@components/buttons/kakao_login';
import {PAGES, PageProps} from '@pages/PageConfig';
import {MethodDivider} from '@components/divider';
import AuthManager from '@auth';
// flex-col 주축이 세로로 정렬
// flex-row 주축이 가로로 정렬

// 텍스트 크기 조절: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl
// 텍스트 색깔: text-black, text-white, text-gray-200, text-gray-400, text-gray-600, text-gray-800, text-red-200

function BackgroundImages(): JSX.Element {
    return (
        <View className="flex w-full flex-col items-center top-[10%] absolute">
            <Image
                source={LogoImage}
                alt="Logo"
                className="w-[40%]"
                style={{resizeMode: 'contain'}}
            />
            <Image
                source={LearningApplicationBanner}
                alt="Learning Application Banner"
                className="w-[60%]"
                style={{resizeMode: 'contain'}}
            />
            <Image
                source={BackgroundImage}
                alt="Login Page Background"
                className="mr-3 w-[100%]"
                style={{resizeMode: 'contain'}}
            />
        </View>
    );
}

function WelcomeText(): JSX.Element {
    return (
        <View className="flex-row justify-start w-[85%] mt-1">
            <Text className="font-bold text-lg tracking-tight">
                Welcome to Molip
            </Text>
        </View>
    );
}

function InputTypeSelector({navigation}: {navigation?: any}): JSX.Element {
    return (
        <View className="w-[80%] mt-3 flex-row ">
            <View className="border-b-4 w-[15%] rounded-xs">
                <Text className="tracking-tight text-[15px] text-center font-light text-gray-700 ">
                    Login
                </Text>
            </View>
            <View className="border-b-4 w-[35%] rounded-xs border-[#90DEAF]">
                <TouchableOpacity
                    onPress={() => {
                        if (!navigation) {
                            Alert.alert('Cannot navigate to SignUpPage');
                        }
                        console.log('navigation', PAGES.SignUpPage.name);
                        navigation.navigate(PAGES.SignUpPage.name);
                    }}>
                    <Text className="tracking-tight text-[15px] text-center font-light text-gray-700 x">
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

interface LoginInputProps {
    id: string;
    setId: (id: string) => void;
    password: string;
    setPassword: (password: string) => void;
}

function LoginInput({
    id,
    setId,
    password,
    setPassword,
}: LoginInputProps): JSX.Element {
    return (
        <View
            className="w-[80%] mt-2 border rounded-md border-gray-600
            h-fit
        ">
            <TextInput
                className="px-6 py-4 border-b border-gray-600 "
                placeholder="ID"
                value={id}
                onChangeText={text => setId(text)}
            />
            <TextInput
                className="px-6 py-4 "
                placeholder="Password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
        </View>
    );
}

interface ForgotPasswordLabelProps {
    navigation: any;
}

function ForgotPasswordLabel({
    navigation,
}: ForgotPasswordLabelProps): JSX.Element {
    return (
        <View className="flex-row justify-start w-[80%] mt-3">
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(PAGES.PasswordResetPage.name);
                }}>
                <Text className="text-sm tracking-tight font-normal text-gray-900">
                    Forgot Password?
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function LoginButton({
    handleLogin,
    processing,
}: {
    handleLogin: () => void;
    processing: boolean;
}): JSX.Element {
    return (
        <View className="w-[80%] mt-2.5">
            <TouchableOpacity
                onPress={handleLogin}
                disabled={processing}
                className="bg-[#342D60] rounded py-3">
                {processing ? (
                    <Text className="text-white font-bold text-center">
                        Requesting...
                    </Text>
                ) : (
                    <Text className="text-white font-bold text-center">
                        Sign In
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

export default function LoginPage({navigation, route}: PageProps): JSX.Element {
    const userId = route.params?.userId;
    useEffect(() => {
        if (userId) {
            navigation.navigate(PAGES.Tabbar.name, {userId});
        }
    }, [userId]);

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);

    const kakaoLoginCallback = async () => {};

    const handleLogin = async () => {
        setProcessing(true);
        if (!id || !password) {
            Alert.alert('Please fill in all fields');
            return;
        }
        await AuthManager.set({id, password});
        await AuthManager.setup();
        setProcessing(false);
        navigation.navigate(PAGES.Tabbar.name, {userId: id});
    };

    return (
        <View className="w-full h-full flex-col justify-end items-center bg-white overflow-hidden relative pb-8">
            <BackgroundImages />
            <WelcomeText />
            <InputTypeSelector navigation={navigation} />
            <LoginInput
                id={id}
                setId={setId}
                password={password}
                setPassword={setPassword}
            />
            <ForgotPasswordLabel navigation={navigation} />
            <LoginButton handleLogin={handleLogin} processing={processing} />
            <MethodDivider />
            <KakaoLoginButton callback={kakaoLoginCallback} />
        </View>
    );
}
