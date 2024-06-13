import React from 'react';
import {View, Text} from 'react-native';
import {Space} from './space';

export function HeaderText({text}: {text: string}) {
    return (
        <>
            <Space heightClassName={'h-24'} />
            <View className="flex-row justify-center w-full flex-row">
                <View className="flex-row w-[80%] justify-start">
                    <Text className="text-xl tracking-tight font-semibold">
                        {text}
                    </Text>
                </View>
            </View>
        </>
    );
}
