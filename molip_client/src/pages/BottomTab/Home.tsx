import Bubble from '@components/bubble';
import {ChallengesDropdown} from '@components/dropdown/challenges_dropdown';
import {Space} from '@components/space';
import TimerScreen from '@components/timer';
import {HeaderText} from '@components/header_text';
import React from 'react';
import {View, Text} from 'react-native';
const sampleChallenges = [
    {
        id: 1,
        name: 'Challenge 1',
        description: 'Description 1',
        private: false,
        password: '',
        creator_id: '1',
        status: 'active',
        joined_users_count: 1,
    },
    {
        id: 2,
        name: 'Challenge 2',
        description: 'Description 2',
        private: true,
        password: '123',
        creator_id: '1',
        status: 'active',
        joined_users_count: 3,
    },
    {
        id: 3,
        name: 'Challenge 3',
        description: 'Description 2',
        private: true,
        password: '123',
        creator_id: '1',
        status: 'active',
        joined_users_count: 3,
    },
    {
        id: 4,
        name: 'Challenge 5',
        description: 'Description 2',
        private: true,
        password: '123',
        creator_id: '1',
        status: 'active',
        joined_users_count: 3,
    },
    {
        id: 5,
        name: 'Challenge 55',
        description: 'Description 2',
        private: true,
        password: '123',
        creator_id: '1',
        status: 'active',
        joined_users_count: 3,
    },
    {
        id: 6,
        name: 'Challenge 5523',
        description: 'Description 2',
        private: true,
        password: '123',
        creator_id: '1',
        status: 'active',
        joined_users_count: 3,
    },
    {
        id: 7,
        name: 'sChallenge 55',
        description: 'Description 2',
        private: true,
        password: '123',
        creator_id: '1',
        status: 'active',
        joined_users_count: 3,
    },
];

export default function Home({navigation}: any) {
    const [selectedChallenge, setSelectedChallenge] = React.useState(undefined);
    return (
        <View className="flex-col justify-start items-center w-full relative h-full bg-white">
            <Bubble />

            <HeaderText text="Start Challenge!" />
            <Space heightClassName={'h-2'} />
            <View className="flex-row justify-center w-full z-50">
                <View className="flex-row w-[85%] justify-center">
                    <ChallengesDropdown
                        challenges={sampleChallenges}
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
