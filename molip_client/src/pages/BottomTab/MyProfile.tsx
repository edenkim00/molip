import React, {useContext} from 'react';
import {View, Alert} from 'react-native';
import {MyDataContext} from '@lib/context';

import {PAGES} from '@pages/PageConfig';

import {Space} from '@components/space';
import Bubble from '@components/bubble';

export default function MyProfile({navigation}: any) {
    const myData = useContext(MyDataContext);
    const {
        userId,
        allChallenges: challenges,
        setAllChallenges: setChallenges,
    } = myData;

    if (!userId) {
        navigation.navigate(PAGES.LoginPage.name);
        Alert.alert('Failed to get data. Please try again.');
        return null;
    }

    return (
        <View className="flex-col justify-start items-center w-full relative h-full bg-white">
            <Bubble />
            <Space heightClassName={'h-24'} />
        </View>
    );
}
