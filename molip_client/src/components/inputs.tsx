import React, {useState, version} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import ApiManager from '@api';
import {validateEmail} from '@lib/utils';

interface EmailInputWithVerificationButtonProps {
    email: string;
    setEmail: (email: string) => void;
    verified: boolean;
    setVerified: (verified: boolean) => void;
}

interface PublishedAuth {
    emailCode?: string;
}

export function EmailAuthorization({
    email,
    setEmail,
    verified,
    setVerified,
}: EmailInputWithVerificationButtonProps): JSX.Element {
    const [authCode, setAuthCode] = useState('');
    const [requested, setRequested] = useState(false);
    const [processing, setProcessing] = useState(false);

    const [border, setBorder] = useState('border-black text-black');
    const [authCodeBorder, setAuthCodeBorder] = useState(
        'border-black text-black',
    );
    const [authCodePublished, setAuthCodePublished] = useState(
        {} as PublishedAuth,
    );

    return (
        <>
            <View
                className={`w-[80%] border rounded-3xl flex-row relative ${border}`}>
                <TextInput
                    className={`px-6 py-3.5 ${border} w-full`}
                    style={{opacity: verified ? 0.5 : 1, borderColor: border}}
                    placeholder={'Email'}
                    value={email}
                    onChangeText={setEmail}
                    secureTextEntry={false}
                    placeholderTextColor={'gray'}
                    readOnly={verified}
                />
                {!processing && !requested && (
                    <TouchableOpacity
                        onPress={async () => {
                            if (!email) {
                                Alert.alert('Please enter email');
                                return;
                            }

                            if (!validateEmail(email)) {
                                Alert.alert('Invalid email format');
                                return;
                            }

                            setProcessing(true);
                            const {code} =
                                await ApiManager.requestEmailAuthCode(email);

                            setRequested(true);
                            setAuthCodePublished({
                                emailCode: code,
                            });
                        }}
                        disabled={processing}
                        className={`bg-white px-4 py-3 absolute right-0 h-full rounded-3xl shadow-sm flex-col justify-center border border-gray-400`}>
                        <Text className="text-center tracking-tight text-xs">
                            Authorize
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
                        placeholderTextColor={'gray'}
                        value={authCode}
                        onChangeText={setAuthCode}
                        secureTextEntry={false}
                    />
                    {requested && processing && (
                        <TouchableOpacity
                            onPress={() => {
                                if (
                                    authCodePublished.emailCode &&
                                    authCode === authCodePublished.emailCode
                                ) {
                                    setProcessing(false);
                                    setVerified(true);
                                } else {
                                    Alert.alert('Wrong auth code');
                                }
                            }}
                            className={`bg-white px-4 py-3 absolute right-0 h-full rounded-3xl shadow-sm flex-col justify-center border border-gray-400`}>
                            <Text className="text-center tracking-tight text-xs">
                                Verify
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </>
    );
}
