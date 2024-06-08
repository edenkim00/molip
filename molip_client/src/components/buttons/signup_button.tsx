import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Space} from '@components/space';

interface CreateAccountButtonProps {
    signUpCallback: () => Promise<void>;
}

export function CreateAccountButton({
    signUpCallback: signUp,
}: CreateAccountButtonProps) {
    return (
        <View className="w-[37%]">
            <Space heightClassName={'h-7'} />
            <TouchableOpacity
                onPress={() => {
                    signUp();
                }}
                className="bg-[#312A5A] rounded py-3">
                <Text className="text-white font-bold text-center tracking-tight text-sm">
                    Create Account
                </Text>
            </TouchableOpacity>
        </View>
    );
}
