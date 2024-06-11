import Bubble from '@components/bubble';
import {Space} from '@components/space';
import TimerScreen from '@components/timer';
import React from 'react';
import {View, Text} from 'react-native';

function HeaderText() {
    return (
        <View className="flex-row justify-center w-full flex-row">
            <View className="flex-row w-[90%] justify-start">
                <Text className="text-2xl tracking-tight font-semibold">
                    Start Challenge!
                </Text>
            </View>
        </View>
    );
}

export default function Home() {
    return (
        <View className="flex w-full relative">
            <Bubble />
            <Space heightClassName={'h-24'} />
            <HeaderText />
            <Space heightClassName={'h-8'} />
            <TimerScreen />
        </View>
    );
}
