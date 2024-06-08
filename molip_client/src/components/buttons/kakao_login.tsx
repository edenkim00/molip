import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface KakaoLoginButtonProps {
    callback: () => Promise<void>;
}

export function KakaoLoginButton({
    callback,
}: KakaoLoginButtonProps): JSX.Element {
    return (
        <View className="w-[40%] mt-2.5">
            <TouchableOpacity
                onPress={callback}
                className="bg-[#FEEB00] rounded py-3">
                <Text className="text-black text-center text-xs">
                    Sign In With Kakao
                </Text>
            </TouchableOpacity>
        </View>
    );
}
