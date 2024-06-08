import React, {useState} from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import PhoneImage from '@assets/phone_image.png';
import {EmailAuthorization} from '@components/inputs';
import {Space} from '@components/space';
import {PasswordInput} from '@components/inputs/password';
import {PageProps} from './PageConfig';

function Background(): JSX.Element {
    return (
        <View className="flex-col items-center top-[10%] absolute">
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

export default function PasswordResetPage({}: PageProps): JSX.Element {
    const [email, setEmail] = useState('');
    const [verified, setVerified] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordChecked, setPasswordChecked] = useState(false);

    return (
        <View className="w-full h-full flex-col justify-end items-center relative bg-white">
            <Background />
            <Space heightClassName={'h-6'} />
            <View className="w-full h-[40%] flex-col items-center pb-10">
                <EmailAuthorization
                    email={email}
                    setEmail={setEmail}
                    verified={verified}
                    setVerified={setVerified}
                />
                <Space heightClassName={'h-3'} />
                {verified && (
                    <PasswordInput
                        setChecked={setPasswordChecked}
                        password={password}
                        setPassword={setPassword}
                    />
                )}
            </View>
        </View>
    );
}
