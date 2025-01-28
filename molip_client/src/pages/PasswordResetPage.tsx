import React, {useState} from 'react';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import PhoneImage from '@assets/phone_image.png';
import {EmailAuthorization} from '@components/inputs';
import {Space} from '@components/space';
import {PasswordInput} from '@components/inputs/password';
import {PageProps, PAGES} from './PageConfig';
import {MolipInput} from '@components/inputs/input';
import ApiManager from '@api';

function Background(): JSX.Element {
    return (
        <View className="flex-col items-center absolute top-10">
            <Image
                source={PhoneImage}
                alt="phone image"
                style={{width: 180, height: 156}}
            />
            <View className="flex-row justify-center w-[85%] mt-4">
                <Text className="font-semibold text-2xl tracking-tight">
                    Password Reset
                </Text>
            </View>
            <View className="flex-row justify-center w-[85%] mt-3">
                <Text className="w-[65%] text-md text-center font-semibold text-[#5F5757]">
                    After verifying your email, you can reset the password!
                </Text>
            </View>
        </View>
    );
}

export default function PasswordResetPage({
    navigation,
}: PageProps): JSX.Element {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [verified, setVerified] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordChecked, setPasswordChecked] = useState(false);

    const [processing, setProcessing] = useState(false);

    const onPasswordReset = async () => {
        if (password.length < 4 || password.length > 30) {
            Alert.alert('Password must be between 4 and 30 characters');
            return;
        }

        try {
            setProcessing(true);
            await ApiManager.changePassword({
                email,
                id,
                newPassword: password,
            });
            Alert.alert('Password reset successful');

            navigation.navigate(PAGES.LoginPage.name);
        } catch (e: any) {
            Alert.alert(`Failed to reset password: ${e.message}`);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <View className="w-full h-full flex-col justify-end items-center relative bg-white">
            <Background />
            <View className="w-full flex-col items-center pb-8 absolute bottom-0">
                <EmailAuthorization
                    email={email}
                    setEmail={setEmail}
                    verified={verified}
                    setVerified={setVerified}
                />
                <Space heightClassName={'h-3'} />
                {verified && (
                    <>
                        <MolipInput
                            text={id}
                            onChangeText={text => setId(text)}
                            placeholder="ID"
                        />
                        <Space heightClassName={'h-3'} />
                        <PasswordInput
                            setChecked={setPasswordChecked}
                            password={password}
                            setPassword={setPassword}
                        />
                    </>
                )}

                {verified && id && password && passwordChecked && (
                    <View className="w-[80%] mt-2.5">
                        <TouchableOpacity
                            onPress={onPasswordReset}
                            disabled={!verified || !passwordChecked}
                            className="bg-[#342D60] rounded py-3">
                            {processing ? (
                                <Text className="text-white font-bold text-center">
                                    Processing...
                                </Text>
                            ) : (
                                <Text className="text-white font-bold text-center">
                                    Reset Password
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </View>
    );
}
