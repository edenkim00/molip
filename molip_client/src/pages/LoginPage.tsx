import React, {useContext, useEffect, useState} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';

import AuthManager from '@auth';

import LogoImage from '@assets/molip_logo.png';
import LearningApplicationBanner from '@assets/language_learning_application.png';
import BackgroundImage from '@assets/login_page_background.png';

import {PAGES, PageProps} from '@pages/PageConfig';

import {LoadingSpinner} from '@components/loading_spinner';
import {
    fetchChallengeData,
    fetchUserProfile,
    MyDataContext,
} from '@lib/context';
import {Space} from '@components/space';

function BackgroundImages(): JSX.Element {
    return (
        <View className="flex w-full flex-col justify-start items-center h-1/2 absolute top-24">
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
                placeholderTextColor={'gray'}
                value={id}
                onChangeText={text => setId(text)}
            />
            <TextInput
                className="px-6 py-4 "
                placeholder="Password"
                placeholderTextColor={'gray'}
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

export default function LoginPage({navigation}: PageProps): JSX.Element {
    const myData = useContext(MyDataContext);
    const {
        userId,
        setUserId,
        setAllChallenges,
        setMyChallenges,
        setUserProfile,
    } = myData;

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        const fetchData = async (userId: string) => {
            try {
                const userProfile = await fetchUserProfile();
                setUserProfile(userProfile);
                const {allChallengesFetched, myChallengesFetched} =
                    await fetchChallengeData(userId);
                if (allChallengesFetched) {
                    setAllChallenges(allChallengesFetched);
                }
                if (myChallengesFetched) {
                    setMyChallenges(myChallengesFetched);
                }
                navigation.navigate(PAGES.Tabbar.name);
            } catch (err) {
                Alert.alert('Failed to login, please try again later.');
                setProcessing(false);
            }

            setTimeout(() => {
                setProcessing(false);
            }, 2000);
        };
        if (userId) {
            setProcessing(true);
            fetchData(userId);
        }
    }, [userId]);

    const handleLogin = async () => {
        setProcessing(true);
        if (!id || !password) {
            Alert.alert('Please fill in all fields');
            return;
        }

        try {
            await AuthManager.set({id, password});
            await AuthManager.setup();
        } catch (e) {
            Alert.alert('Failed to login, please try again.');
            setProcessing(false);
            return;
        }

        setUserId(id);

        try {
            const userProfile = await fetchUserProfile();
            setUserProfile(userProfile);

            const {allChallengesFetched, myChallengesFetched} =
                await fetchChallengeData(id);
            if (allChallengesFetched) {
                setAllChallenges(allChallengesFetched);
            }
            if (myChallengesFetched) {
                setMyChallenges(myChallengesFetched);
            }
            navigation.navigate(PAGES.Tabbar.name);
        } catch (e) {
            Alert.alert('Failed to login, please try again later.');
            setProcessing(false);
        }
    };

    if (processing) {
        return <LoadingSpinner />;
    }

    return (
        <View className="w-full h-full flex-col justify-between items-center bg-white overflow-hidden relative pb-8">
            <BackgroundImages />
            <View className="w-full justify-center items-center flex-col absolute bottom-10">
                <Space heightClassName={'h-10'} />
                <WelcomeText />
                <InputTypeSelector navigation={navigation} />
                <LoginInput
                    id={id}
                    setId={setId}
                    password={password}
                    setPassword={setPassword}
                />

                <ForgotPasswordLabel navigation={navigation} />
                <LoginButton
                    handleLogin={handleLogin}
                    processing={processing}
                />
            </View>
            <Space heightClassName={'h-8'} />
        </View>
    );
}
