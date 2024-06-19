import Bubble from '@components/bubble';
import {ChallengesDropdown} from '@components/dropdown/challenges_dropdown';
import {Space} from '@components/space';
import TimerScreen from '@components/timer';
import {HeaderText} from '@components/header_text';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {LoadingSpinner} from '@components/loading_spinner';
import {Challenge} from '@components/challenge';

export default function Home({route, navigation}: any) {
    const {userId, myChallenges} = route.params ?? {};

    const [processing, setProcessing] = React.useState(!!myChallenges);
    const [challenges, setChallenges] = React.useState<Challenge[]>(
        myChallenges ?? [],
    );
    const [selectedChallenge, setSelectedChallenge] = React.useState(undefined);

    useEffect(() => {
        console.log('myChallenges', myChallenges);
        if (myChallenges) {
            setProcessing(false);
        } else {
            setProcessing(true);
        }
    }, [myChallenges]);

    if (processing || !myChallenges) {
        return <LoadingSpinner />;
    }

    return (
        <View className="flex-col justify-start items-center w-full relative h-full bg-white">
            <Bubble />

            <HeaderText text="Start Challenge!" />
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
