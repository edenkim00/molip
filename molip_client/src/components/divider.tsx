import React from 'react';
import {View, Text} from 'react-native';
import {Space} from '@components/space';

export function MethodDivider() {
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
