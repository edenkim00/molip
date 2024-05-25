import React from 'react';
import {View, Image, Text, TextInput, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import LogoImage from '../../assets/molip_logo.png';
import LearningApplicationBanner from '../../assets/language_learning_application.png';
import BackgroundImage from '../../assets/login_page_background.png';

// flex-col 주축이 세로로 정렬
// flex-row 주축이 가로로 정렬

// 텍스트 크기 조절: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, text-5xl
// 텍스트 색깔: text-black, text-white, text-gray-200, text-gray-400, text-gray-600, text-gray-800, text-red-200

function Background() {
    return (
        <View className="w-full flex-col items-center">
            <Image source={LogoImage} alt="Learning Application Banner" />
            <Text className="text-center text-blakc text-sm font-bold mt-8 text-xl tracking-tight">
                Let's get started!
            </Text>
        </View>
    );
}

function Space({heightClassName}) {
    return <View className={heightClassName} />;
}

function SignUpInputs() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View className="w-full flex-col justify-center items-center">
            <EmailInputWithVerificationButton
                email={email}
                setEmail={setEmail}
                emailVerified={false}
                setEmailVerified={null}
            />
            <SignUpInput input={id} setInput={setId} placeholder="ID" />
            <SignUpInput
                input={password}
                setInput={setPassword}
                placeholder="Password"
            />
            <SignUpInput
                input={confirmPassword}
                setInput={setConfirmPassword}
                placeholder="Confirm Password"
            />
        </View>
    );
}

function SignUpInput({input, setInput, placeholder, secureTextEntry = false}) {
    const [border, setBorder] = useState('border-black text-black');
    return (
        <View className={`w-[80%] border rounded-3xl flex-col my-2 ${border}`}>
            <TextInput
                className={`px-6 py-3.5 ${border}`}
                placeholder={placeholder}
                value={input}
                onChangeText={setInput}
                secureTextEntry={secureTextEntry}
                onFocus={() => setBorder('border-[#504593] text-[#504593]')}
                onBlur={() => setBorder('border-black text-black')}
            />
        </View>
    );
}

function EmailInputWithVerificationButton({
    email,
    setEmail,
    emailVerified,
    setEmailVerified,
}) {
    const [border, setBorder] = useState('border-black text-black');
    const [authCodeBorder, setAuthCodeBorder] = useState(
        'border-black text-black',
    );
    const [processing, setProcessing] = useState(false);
    const [authCode, setAuthCode] = useState('');

    return (
        <>
            <View
                className={`w-[80%] border rounded-3xl my-2 flex-row relative ${border}`}>
                <TextInput
                    className={`px-6 py-3.5 ${border}`}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={setEmail}
                    secureTextEntry={false}
                    onFocus={() => setBorder('border-[#504593] text-[#504593]')}
                    onBlur={() => setBorder('border-black text-black')}
                />
                {!processing && !emailVerified && (
                    <TouchableOpacity
                        onPress={() => {
                            setProcessing(true);
                        }}
                        disabled={processing}
                        className={`bg-white px-4 py-3 absolute right-0 h-full rounded-3xl shadow-sm flex-col justify-center border border-gray-400`}>
                        <Text className="text-center tracking-tight text-xs">
                            Verify
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            {processing && (
                <View
                    className={`w-[80%] border rounded-3xl my-2 flex-row relative ${authCodeBorder}`}>
                    <TextInput
                        className={`px-6 py-3.5 ${authCodeBorder}`}
                        placeholder={'Verification Code'}
                        value={authCode}
                        onChangeText={setAuthCode}
                        secureTextEntry={false}
                        onFocus={() =>
                            setAuthCodeBorder('border-[#504593] text-[#504593]')
                        }
                        onBlur={() =>
                            setAuthCodeBorder('border-black text-black')
                        }
                    />
                </View>
            )}
        </>
    );
}

function CreateAccountButton() {
    return (
        <View className="w-[37%]">
            <Space heightClassName={'h-7'} />
            <TouchableOpacity
                onPress={() => {
                    //TODO: 로그인 버튼 눌렀을 때 로그인 처리
                }}
                className="bg-[#312A5A] rounded py-3">
                <Text className="text-white font-bold text-center tracking-tight text-sm">
                    Create Account
                </Text>
            </TouchableOpacity>
        </View>
    );
}

function SignInMethodDivider() {
    return (
        <View className="w-full h-[3.5%] flex-row">
            <Space heightClassName={'h-7'} />
            <View className="w-[38%] border-b h-[50%]" />
            <View className="w-[24%] h-full flex-col justify-center">
                <Text className="text-center text-gray-600 text-sm font-bold">
                    or
                </Text>
            </View>

            <View className="w-[38%] border-b h-[50%]" />
        </View>
    );
}

export default function SignUpPage() {
    return (
        <View className="w-full h-full flex-col justify-start items-center">
            <Space heightClassName={'h-[15%]'} />
            <Background />
            <Space heightClassName={'h-8'} />
            <View className=""></View>
            <SignUpInputs />
            <CreateAccountButton />
            <Space heightClassName={'h-8'} />
            <SignInMethodDivider />
        </View>
    );
}
