import React, {useContext, useEffect} from 'react';
import {View, Alert} from 'react-native';
import {HeaderText} from '@components/header_text';
import {Space} from '@components/space';
import Bubble from '@components/bubble';
import {ChallengesDropdown} from '@components/dropdown/challenges_dropdown';
import TimerScreen from '@components/timer';

import {RefreshButton} from '@components/refresh_button';
import {PAGES} from '@pages/PageConfig';
import {fetchChallengeData, MyDataContext} from '@lib/context';

export default function Home({navigation}: any) {
    const myData = useContext(MyDataContext);
    const {
        userId,
        myChallenges: challenges,
        setMyChallenges: setChallenges,
    } = myData;

    const [selectedChallenge, setSelectedChallenge] = React.useState(undefined);

    return (
        <View className="flex-col justify-start items-center w-full relative h-full bg-white">
            <Bubble />
            <Space heightClassName={'h-24'} />
            <View className="flex-row justify-between w-[80%]">
                <HeaderText text="Start Challenge!" />
                <RefreshButton
                    onPress={async () => {
                        const {myChallengesFetched} = await fetchChallengeData(
                            userId,
                            'MyChallenges',
                        );
                        if (myChallengesFetched) {
                            setChallenges(myChallengesFetched);
                        }
                    }}
                />
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
