import React, {useEffect} from 'react';
import {View, Alert} from 'react-native';
import {HeaderText} from '@components/header_text';
import {Space} from '@components/space';
import Bubble from '@components/bubble';
import {ChallengesDropdown} from '@components/dropdown/challenges_dropdown';
import TimerScreen from '@components/timer';

import {LoadingSpinner} from '@components/loading_spinner';
import ApiManager from '@api';
import {RefreshButton} from '@components/refresh_button';
import {PAGES} from '@pages/PageConfig';

export default function Home({route, navigation}: any) {
    const {myData} = route.params ?? {};
    if (!myData) {
        navigation.navigate(PAGES.LoginPage.name);
        Alert.alert('Failed to get data. Please try again.');
        return null;
    }

    const {
        userId,
        myChallenges: challenges,
        setMyChallenges: setChallenges,
    } = myData;

    const [processing, setProcessing] = React.useState(false);
    const [selectedChallenge, setSelectedChallenge] = React.useState(undefined);

    useEffect(() => {
        console.log('CHANGE: ', challenges);
    }, [challenges]);
    const refreshMyChallenges = async () => {
        try {
            setProcessing(true);
            const myChallengesFetched = await ApiManager.selectUserChallenges(
                userId,
            );
            setChallenges(myChallengesFetched);
            setProcessing(false);
        } catch (err) {
            Alert.alert('Failed to refresh challenges');
            setProcessing(false);
        }
    };

    if (processing) {
        return <LoadingSpinner />;
    }

    return (
        <View className="flex-col justify-start items-center w-full relative h-full bg-white">
            <Bubble />
            <Space heightClassName={'h-24'} />
            <View className="flex-row justify-between w-[80%]">
                <HeaderText text="Start Challenge!" />
                <RefreshButton onPress={refreshMyChallenges} />
            </View>
            <Space heightClassName={'h-2'} />
            <View className="flex-row justify-center w-full z-50">
                <View className="flex-row w-[85%] justify-center">
                    <ChallengesDropdown
                        challenges={challenges}
                        onChallengeSelect={setSelectedChallenge}
                    />
                </View>
            </View>
            <Space heightClassName={'h-3'} />
            <TimerScreen selectedChallenge={selectedChallenge} />
            <Space heightClassName={'h-4'} />
        </View>
    );
}
