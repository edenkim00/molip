import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Challenge} from '@pages/Challenge';
import {LeaderBoardModal} from './charts/challenge_leader_board';
import {UserDataModal} from './charts/challenge_user_dashboard';

export function showCheckAlert({
    title,
    callback,
}: {
    title: string;
    callback: () => void;
}) {
    Alert.alert(title, `Are you sure you want to join this challenge?`, [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {
            text: 'Join',
            onPress: () => {
                callback();
            },
        },
    ]);
}

function ChallengeCardImage({imageUrl}: {imageUrl?: string}) {
    return (
        <View className="flex-row justify-center w-12 relative">
            {imageUrl ? (
                <Image
                    source={{uri: imageUrl}}
                    className="w-12 rounded-md"
                    style={{
                        resizeMode: 'cover',
                        height: 40,
                    }}
                />
            ) : (
                <Icon
                    name="images-outline"
                    style={{
                        textAlign: 'center',
                        lineHeight: 40,
                        fontSize: 24,
                    }}
                />
            )}
        </View>
    );
}

export function ShortChallegeCard({
    userId,
    challenge,
    setMyChallenges,
}: {
    userId: string;
    challenge: Challenge;
    setMyChallenges: (challenges: Challenge[]) => void;
}) {
    const {
        name: title,
        image_url: imageUrl,
        private: isPrivate,
        joined_users_count,
        password,
    } = challenge;

    const lockIconName = isPrivate
        ? 'lock-closed-outline'
        : 'lock-open-outline';

    const [showRankingModal, setShowRankingModal] = useState<boolean>(false);

    return (
        <View className="w-full flex-col justify-start items-center">
            <TouchableOpacity
                onPress={() => {
                    setShowRankingModal(true);
                }}>
                <View className="flex flex-row items-center justify-between px-4 py-1.5 rounded-lg shadow-xl bg-[#E7E4E4] w-full border border-gray-300 space-x-3 overflow-hidden">
                    <View className="w-[60%] justify-between flex-row items-center space-x-3">
                        <ChallengeCardImage imageUrl={imageUrl} />
                        <Text className="text-lg font-semibold text-gray-800 w-full tracking-tight">
                            {title}
                        </Text>
                    </View>
                    <View>
                        <View className="flex-row items-center space-x-2">
                            <Icon name="person" size={20} />
                            <Text className="text-sm">
                                {joined_users_count ?? '0'}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Icon name={lockIconName} size={20} />
                    </View>
                </View>
            </TouchableOpacity>
            {showRankingModal && (
                <LeaderBoardModal
                    visible={true}
                    setModalVisible={setShowRankingModal}
                    challenge={challenge}
                    userId={userId}
                    setMyChallenges={setMyChallenges}
                />
            )}
        </View>
    );
}

export function LongChallegeCard({
    userId,
    challenge,
    setMyChallenges,
}: {
    userId: string;
    challenge: Challenge;
    setMyChallenges: (challenges: Challenge[]) => void;
}) {
    const {
        name: title,
        image_url: imageUrl,
        private: isPrivate,
        joined_users_count,
    } = challenge;

    const lockIconName = isPrivate
        ? 'lock-closed-outline'
        : 'lock-open-outline';

    const [showRankingModal, setShowRankingModal] = useState<boolean>(false);
    const [showUserDataModal, setShowUserDataModal] = useState<boolean>(false);

    return (
        <View className="w-full flex-col justify-start items-center">
            <TouchableOpacity
                onPress={() => {
                    setShowRankingModal(true);
                }}>
                <View className="flex-col justify-center w-full items-center  overflow-hidden rounded-lg shadow-xl bg-[#E7E4E4] px-4 py-1.5  border-gray-300 border">
                    <View className="flex flex-row items-center justify-between w-full space-x-3 ">
                        <View className="w-[50%] justify-between flex-row items-center space-x-1">
                            <ChallengeCardImage imageUrl={imageUrl} />
                            <Text className="font-semibold text-gray-800 w-full tracking-tight max-w-[60%] px-2">
                                {title}
                            </Text>
                        </View>
                        <View className="flex-col justify-between items-center mt-1 w-[15%]">
                            <TouchableOpacity
                                className="w-full"
                                onPress={() => {
                                    setShowUserDataModal(true);
                                }}>
                                <View className="w-full flex-col items-center">
                                    <Icon name="bar-chart-outline" size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View className="flex-row items-center space-x-2 w-10">
                                <Icon name="person" size={20} />
                                <Text className="text-sm">
                                    {joined_users_count ?? '0'}
                                </Text>
                            </View>
                        </View>
                        <View>
                            <Icon name={lockIconName} size={20} />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <ChallengeModals
                challenge={challenge}
                userId={userId}
                setMyChallenges={setMyChallenges}
                showRankingModal={showRankingModal}
                setShowRankingModal={setShowRankingModal}
                showUserDataModal={showUserDataModal}
                setShowUserDataModal={setShowUserDataModal}
            />
        </View>
    );
}

function ChallengeModals({
    challenge,
    userId,
    setMyChallenges,
    showRankingModal,
    setShowRankingModal,
    showUserDataModal,
    setShowUserDataModal,
}: {
    challenge: Challenge;
    userId: string;
    setMyChallenges: (challenges: Challenge[]) => void;
    showRankingModal: boolean;
    setShowRankingModal: (show: boolean) => void;
    showUserDataModal: boolean;
    setShowUserDataModal: (show: boolean) => void;
}) {
    return (
        <>
            {showRankingModal && (
                <LeaderBoardModal
                    visible={true}
                    setModalVisible={setShowRankingModal}
                    challenge={challenge}
                    userId={userId}
                    setMyChallenges={setMyChallenges}
                />
            )}
            {showUserDataModal && (
                <UserDataModal
                    visible={showUserDataModal}
                    setModalVisible={setShowUserDataModal}
                    challenge={challenge}
                    userId={userId}
                    setMyChallenges={setMyChallenges}
                />
            )}
        </>
    );
}
