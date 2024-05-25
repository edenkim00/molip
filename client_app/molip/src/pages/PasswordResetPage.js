import React from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import PhoneImage from '../../assets/phone_image.png';

// flex-col 주축이 세로로 정렬
// flex-row 주축이 가로로 정렬

// 텍스트 크기 조절: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl
// 텍스트 색깔: text-black, text-white, text-gray-200, text-gray-400, text-gray-600, text-gray-800, text-red-200

function Background() {
    return (
        <View className="flex-col items-center">
            <Image
                source={PhoneImage}
                alt="phone image"
                style={{width: 180, height: 156}}
            />
        </View>
    );
}

function Title() {
    return (
        <View className="flex-row justify-center w-[85%] mt-4">
            <Text className="font-semibold text-2xl tracking-tight">
                Password Reset
            </Text>
        </View>
    );
}

function Subtitle() {
    return (
        <View className="flex-row justify-center w-[85%] mt-3">
            <Text className="w-[65%] text-md text-center font-semibold text-[#5F5757]">
                After verifying your email, you can reset the password!
            </Text>
        </View>
    );
}

function CheckAuthCodeInput() {
    return (
        <View className="w-[80%] border-[1.2px] rounded-3xl border-black">
            <TextInput
                className="px-6 py-4 border-gray-600"
                placeholder="Verification Code"
            />
        </View>
    );
}

function NewPasswordInput() {
    return (
        <View className="w-[80%] border-[1.2px] rounded-3xl border-black">
            <TextInput
                className="px-6 py-4 border-gray-600"
                placeholder="Enter New Password"
            />
        </View>
    );
}

function ConfirmNewPasswordInput() {
    return (
        <View className="w-[80%] border-[1.2px] rounded-3xl border-black">
            <TextInput
                className="px-6 py-4 border-gray-600"
                placeholder="Confirm New Password"
            />
        </View>
    );
}

function Space({heightClassName}) {
    return <View className={heightClassName} />;
}

export default function PasswordResetPage() {
    return (
        <View className="w-full h-full flex-col justify-start items-center">
            <Space heightClassName={'h-[15%]'} />
            <Background />
            <Title />
            <Subtitle />
            <Space heightClassName={'h-[5%]'} />
            <CheckAuthCodeInput />
            <Space heightClassName={'h-[2%]'} />
            <NewPasswordInput />
            <Space heightClassName={'h-[2%]'} />
            <ConfirmNewPasswordInput />
        </View>
    );
}
