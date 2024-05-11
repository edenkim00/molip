import React from 'react';
import {View, Image, Text, TextInput} from 'react-native';
import LogoImage from '../../assets/molip_logo.png';
import LearningApplicationBanner from '../../assets/language_learning_application.png';
import BackgroundImage from '../../assets/login_page_background.png';
// flex-col 주축이 세로로 정렬
// flex-row 주축이 가로로 정렬

// 텍스트 크기 조절: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl
// 텍스트 색깔: text-black, text-white, text-gray-200, text-gray-400, text-gray-600, text-gray-800, text-red-200

function BackgroundImages() {
  return (
    <View className="w-full flex-col items-center">
      <Image source={LogoImage} alt="Learning Application Banner" />
      <Image
        source={LearningApplicationBanner}
        alt="Learning Application Banner"
      />
      <Image
        source={BackgroundImage}
        alt="Login Page Background"
        className="mt-3 mr-0"
      />
    </View>
  );
}

function WelcomeText() {
  return (
    <View className="flex-row justify-start w-[85%] mt-1">
      <Text className="font-bold text-lg tracking-tight">Welcome to Molip</Text>
    </View>
  );
}

function InputLabel() {
  return (
    <View className="w-[80%] mt-3 flex-row">
      <View className="border-b-4 w-[15%] rounded-xs">
        <Text className="tracking-tight text-[15px] text-center font-light text-gray-700 ">
          Login
        </Text>
      </View>
      <View className="border-b-4 w-[35%] rounded-xs border-[#90DEAF]">
        <Text className="tracking-tight text-[15px] text-center font-light text-gray-700 x">
          Sign Up
        </Text>
      </View>
    </View>
  );
}

function ForgotPasswordLabel() {
  return (
    <View className="flex-row justify-start w-[80%] mt-3">
      <Text className="text-sm tracking-tight font-normal text-gray-900">
        Forgot Password?
      </Text>
    </View>
  );
}

export default function LoginPage() {
  return (
    <View className="w-full h-full flex-col justify-start items-center">
      <View className="h-[15%]" />
      <BackgroundImages />
      <WelcomeText />
      <InputLabel />
      <View className="w-[80%] mt-2 border rounded-md border-gray-600">
        <TextInput
          className="px-6 py-4 border-b border-gray-600"
          placeholder="ID"
        />
        <TextInput className="px-6 py-4" placeholder="Password" />
      </View>

      <ForgotPasswordLabel />
    </View>
  );
}
