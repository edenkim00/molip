import React from 'react';
import {View, Image, Text, Alert} from 'react-native';
import {useState} from 'react';
import LogoImage from '../../assets/molip_logo.png';

import ApiManager from '../api';
import {EmailAuthorization} from '@components/inputs';
import {MolipInput} from '@components/inputs/input';
import {PasswordInput} from '@components/inputs/password';
import {Space} from '@components/space';
import {MethodDivider} from '@components/divider';
import {CreateAccountButton} from '@components/buttons/signup_button';
import {PageProps} from './PageConfig';

function Background() {
    return (
        <View className="w-full flex-col items-center absolute top-[15%]">
            <Image source={LogoImage} alt="Learning Application Banner" />
            <Text className="text-center text-blakc text-sm font-bold mt-8 text-xl tracking-tight">
                Let's get started!
            </Text>
        </View>
    );
}

export default function SignUpPage({}: PageProps) {
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [emailVerified, setEmailVerified] = useState(false);
    const [passwordChecked, setPasswordChecked] = useState(false);

    const validate = () => {
        if (password.length < 4 || password.length > 30) {
            Alert.alert('Password must be between 4 and 30 characters');
            return false;
        }
        return true;
    };

    const signUpCallback = async () => {
        if (!validate()) {
            return;
        }

        const res = await ApiManager.signUp({id, email, password});
        if (!res.isSuccess) {
            Alert.alert(res.message ?? 'Failed to sign up');
        }
    };

    return (
        <View className="w-full h-full flex-col justify-end items-center bg-white pb-8">
            <Background />
            <Space heightClassName={'h-8'} />
            <View className="w-full flex-col justify-center items-center">
                <EmailAuthorization
                    email={email}
                    setEmail={setEmail}
                    verified={emailVerified}
                    setVerified={setEmailVerified}
                />

                <Space heightClassName={'h-3'} />
                {emailVerified && (
                    <>
                        <MolipInput
                            text={id}
                            onChangeText={setId}
                            placeholder="ID"
                        />
                        <Space heightClassName={'h-3'} />
                        <PasswordInput
                            password={password}
                            setPassword={setPassword}
                            setChecked={setPasswordChecked}
                        />
                    </>
                )}
            </View>
            <CreateAccountButton signUpCallback={signUpCallback} />
            <Space heightClassName={'h-8'} />
            <MethodDivider />
        </View>
    );
}
