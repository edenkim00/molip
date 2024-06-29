import React, {useEffect, useState} from 'react';
import Bubble from '@components/bubble';
import {Challenge, ShortChallegeCard} from '@components/challenge';
import {ChallengesDropdown} from '@components/dropdown/challenges_dropdown';
import {Space} from '@components/space';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {CreateChallengeModal} from '@components/modals/create_challenge';
import {HeaderText} from '@components/header_text';
import {LoadingSpinner} from '@components/loading_spinner';
import ApiManager from '@api';
import {RefreshButton} from '@components/refresh_button';

export default function Discover({navigation, route}: any) {
    const {userId, allChallenges} = route.params ?? {};
    const [challenges, setChallenges] = React.useState<Challenge[]>(
        allChallenges ?? [],
    );
    const [processing, setProcessing] = React.useState(!!allChallenges);

    const [showCreateChallengeModal, setShowCreateChallengeModal] =
        useState<boolean>(false);
    const [filteredChalleges, setFilteredChallenges] = React.useState(
        allChallenges ?? [],
    );

    const refreshAllChallenges = async () => {
        try {
            const allChallengesFetched = await ApiManager.selectChallenges();
            setChallenges(allChallengesFetched);
        } catch (err) {
            Alert.alert('Failed to refresh challenges');
        }
    };

    useEffect(() => {
        if (allChallenges) {
            setProcessing(false);
            setChallenges(allChallenges);
        } else {
            setProcessing(true);
        }
    }, [allChallenges]);

    if (processing || !allChallenges) {
        return <LoadingSpinner />;
    }

    return (
        <>
            {showCreateChallengeModal ? (
                <CreateChallengeBackground />
            ) : (
                <View className="flex-col justify-betwen items-center w-full h-full bg-white ">
                    <View className="flex-col justify-start items-center w-full relative h-full bg-white max-h-[90%] overflow-hidden">
                        <Bubble />
                        <Space heightClassName={'h-24'} />
                        <View className="flex-row justify-between w-[80%]">
                            <HeaderText text="Discover Challenges" />
                            <RefreshButton onPress={refreshAllChallenges} />
                        </View>
                        <Space heightClassName={'h-2'} />
                        <View className="flex-row justify-center w-full z-50">
                            <View className="flex-row w-[85%] justify-center">
                                <ChallengesDropdown
                                    challenges={challenges}
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
                                    <ScrollView className="w-full flex-col  space-y-2 ">
                                        {filteredChalleges.map(
                                            (
                                                challenge: Challenge,
                                                index: number,
                                            ) => (
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
                    onClose={() => {
                        refreshAllChallenges();
                        setShowCreateChallengeModal(false);
                    }}
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
