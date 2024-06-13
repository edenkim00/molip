import React, {useEffect, useState} from 'react';
import Bubble from '@components/bubble';
import {ShortChallegeCard} from '@components/challenge';
import {ChallengesDropdown} from '@components/dropdown/challenges_dropdown';
import {Space} from '@components/space';
import {View, Text, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CreateChallengeModal} from '@components/modals/create_challenge';
import {HeaderText} from '@components/header_text';

const sampleChallenges = [
    {
        id: 1,
        name: 'Challenge',
        description: 'Description 1',
        private: false,
        password: '',
        creator_id: '1',
        status: 'active',
        joined_users_count: 1,
        image_url:
            'https://notifly.tech/_next/image?url=https%3A%2F%2Fcdn.notifly.tech%2Fprofile_images%2Ffec2f3d0-9e36-4a02-b9b4-05690408fea7.jpg&w=2048&q=75',
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

export default function Discover({navigation}: {navigation: any}) {
    const [showCreateChallengeModal, setShowCreateChallengeModal] =
        useState<boolean>(false);
    const [filteredChalleges, setFilteredChallenges] = React.useState(
        sampleChallenges ?? [],
    );

    useEffect(() => {
        console.log('KDS', filteredChalleges.length);
    }, [filteredChalleges]);

    return (
        <>
            {showCreateChallengeModal ? (
                <CreateChallengeBackground />
            ) : (
                <View className="flex-col justify-betwen items-center w-full h-full bg-white ">
                    <View className="flex-col justify-start items-center w-full relative h-full bg-white max-h-[90%] overflow-hidden">
                        <Bubble />
                        <HeaderText text="Discover Challenges" />
                        <Space heightClassName={'h-2'} />
                        <View className="flex-row justify-center w-full z-50">
                            <View className="flex-row w-[85%] justify-center">
                                <ChallengesDropdown
                                    challenges={sampleChallenges}
                                    onFilteredChange={setFilteredChallenges}
                                />
                            </View>
                        </View>
                        <Space heightClassName={'h-4'} />
                        <View className="w-full flex-col justify-start items-center">
                            <View className="left-[10%] flex-col justify-start w-full">
                                <Text className="text-[#5F5757] text-xl font-semibold tracking-tight">
                                    Active Challenges
                                </Text>
                                <Text className="text-[#5F5757] text-xs font-normal ml-1">
                                    Found {filteredChalleges.length} challenges
                                    with your keyword!
                                </Text>
                            </View>
                            <Space heightClassName={'h-2'} />
                            {filteredChalleges.length > 0 && (
                                <View className="w-[90%] flex-col border rounded-md border-gray-200 px-[4%] py-[3%] relative">
                                    <ScrollView
                                        className="w-full flex-col  space-y-2 "
                                        // style={{
                                        //     backgroundColor: 'white !important',
                                        // }}
                                    >
                                        {filteredChalleges.map(
                                            (challenge, index) => (
                                                <View
                                                    className="w-full flex-row justify-center"
                                                    key={index}>
                                                    <ShortChallegeCard
                                                        challenge={challenge}
                                                    />
                                                </View>
                                            ),
                                        )}
                                    </ScrollView>
                                </View>
                            )}
                        </View>
                    </View>
                    <View className="w-full flex-row justify-center items-start min-h-[10%] pb-2">
                        <View className="w-[80%] mt-2">
                            <TouchableOpacity
                                onPress={() => {
                                    setShowCreateChallengeModal(true);
                                }}
                                className="bg-[#342D60] rounded py-3">
                                <Text className="text-white font-bold text-center">
                                    Create a New Challenge
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
            {showCreateChallengeModal && (
                <CreateChallengeModal
                    visible={showCreateChallengeModal}
                    onClose={() => setShowCreateChallengeModal(false)}
                />
            )}
        </>
    );
}

function CreateChallengeBackground() {
    return (
        <View className="flex-col justify-betwen items-center w-full h-full bg-white ">
            <View className="flex-col justify-start items-center w-full relative h-full bg-white max-h-[90%] overflow-hidden">
                <Bubble />
                <HeaderText text="Create Challenge" />
            </View>
        </View>
    );
}
