import React from 'react';
import {View} from 'react-native';
import {Space} from '@components/space';
import Bubble from '@components/bubble';

export default function MyProfile({route, navigation}: any) {
    return (
        <View className="flex-col justify-start items-center w-full relative h-full bg-white">
            <Bubble />
            <Space heightClassName={'h-24'} />
        </View>
    );
}
