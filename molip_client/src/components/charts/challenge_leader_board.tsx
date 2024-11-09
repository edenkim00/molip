import React, {useEffect, useState} from 'react';
import {Challenge, ChallengeRanking} from '../../pages/Challenge';
import {
    View,
    Text,
    Modal,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import {Space} from '@components/space';
import Icon from 'react-native-vector-icons/Ionicons';
import ApiManager from '@api';
import {LoadingSpinner} from '@components/loading_spinner';
import {PasswordInputModal} from '@components/modals/password_input';
import {fetchChallengeData} from '@lib/context';
import {showCheckAlert} from '@components/challenge';
import _ from 'lodash';

const rankingConfig = {
    1: {
        color: '#FFD700',
        heightClass: 'h-32',
        label: '1st',
    },
    2: {
        color: '#C0C0C0',
        heightClass: 'h-20',
        label: '2nd',
    },
    3: {
        color: '#CD7F32',
        heightClass: 'h-12',
        label: '3rd',
    },
};

function Podium({challengeRankings}: {challengeRankings: ChallengeRanking[]}) {
    const [first, second, third] = Array.from(
        {length: 3},
        (_, index) => challengeRankings[index],
    ).map((challengeRanking, index) => ({
        ...(challengeRanking ?? {}),
        ...rankingConfig[(index + 1) as 1 | 2 | 3],
    }));

    const data = [second, first, third];

    return (
        <View className="flex-row justify-center items-end">
            {data.map((ranking, index) => (
                <View className="flex-col items-center" key={`list-${index}`}>
                    <Text className="text-black mt-1 mb-0.5 text-xs">
                        @{ranking?.userId ?? 'N/A'}
                    </Text>
                    <View
                        key={index}
                        className={`w-16 justify-center items-center mx-1 ${ranking?.heightClass}`}
                        style={{
                            backgroundColor: ranking?.color ?? 'transparent',
                        }}>
                        <Text className="text-white font-bold">
                            {ranking?.label ?? 'N/A'}
                        </Text>
                    </View>
                    <Text className="text-black font-light text-xs">
                        {((ranking?.duration ?? 0) / 3600).toFixed(1)} h
                    </Text>
                </View>
            ))}
        </View>
    );
}

function LeaderBoardList({
    challengeRankings,
}: {
    challengeRankings: ChallengeRanking[];
}) {
    return (
        <ScrollView className="flex-col space-y-4 px-3">
            <View className="flex-row justify-between items-center w-full ">
                <View className="flex-row">
                    <View className="w-10">
                        <Text className="text-black font-light text-xs font-semibold">
                            #
                        </Text>
                    </View>
                    <View className="flex-row items-center space-x-3 justify-start w-24">
                        <Text className="text-black font-light text-xs ml-1 font-semibold">
                            User
                        </Text>
                    </View>
                </View>
                <View className="w-16">
                    <Text className="text-black font-light text-xs text-right font-semibold">
                        Time
                    </Text>
                </View>
            </View>
            <View className="w-full my-2 space-y-4">
                {challengeRankings.map((challengeRanking, index) => (
                    <View
                        className="flex-row justify-between items-center w-full"
                        key={`leader-${index}`}>
                        <View className="flex-row items-center justify-start">
                            <View className="w-10">
                                <Text className="text-black font-light text-xs">
                                    {challengeRanking.ranking}
                                </Text>
                            </View>
                            <View className="flex-row items-center space-x-3 justify-start w-24">
                                <Image
                                    source={{
                                        uri:
                                            challengeRanking.profileImageUrl ??
                                            'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
                                    }}
                                    className="w-6 h-6 rounded-full"
                                />
                                <Text className="text-black font-light text-xs">
                                    @{challengeRanking.userId}
                                </Text>
                            </View>
                        </View>

                        <Text className="text-black font-light text-xs">
                            {((challengeRanking.duration ?? 0) / 3600).toFixed(
                                2,
                            )}{' '}
                            h
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

function ChallengeConfig({challenge}: {challenge: Challenge}) {
    return (
        <View className="flex-col justify-center items-center w-full space-y-4">
            {challenge.image_url && (
                <Image
                    source={{
                        uri:
                            challenge.image_url ??
                            'https://via.placeholder.com/150X150',
                    }}
                    className="w-20 h-20  rounded-full"
                />
            )}

            <Text className="text-black font-bold text-xl">
                {challenge.name}
            </Text>
            <View className="w-2/3 justify-between flex-row items-center">
                <Text className="text-black text-sm tracking-tight">
                    {challenge.description}
                </Text>
                <View className="flex-row items-center space-x-2">
                    <Icon name="person" size={20} />
                    <Text className="text-sm">
                        {challenge.joined_users_count ?? '0'}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export function LeaderBoardModal({
    visible,
    setModalVisible,
    challenge,
    userId,
    setMyChallenges,
}: {
    visible: boolean;
    setModalVisible: (visible: boolean) => void;
    challenge: Challenge;
    userId: string;
    setMyChallenges: (challenges: Challenge[]) => void;
}) {
    const {name: title, private: isPrivate, password} = challenge;
    const [challengeRankings, setChallengeRankings] = useState<
        ChallengeRanking[]
    >([]);
    const [fetching, setFetching] = useState<boolean>(false);

    const fetchRanking = async () => {
        try {
            setFetching(true);
            return await ApiManager.getRanking({
                challengeId: challenge.id,
            });
        } catch (e: any) {
            return [];
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchRanking().then(res => {
            setChallengeRankings(res);
        });
    }, []);

    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
    const [passwordInput, setPasswordInput] = useState<string>('');

    const checkPassword = () => {
        if (!isPrivate) {
            return join();
        }
        setShowPasswordInput(true);
    };

    const requestJoin = async () => {
        try {
            await ApiManager.requestJoinChallenge({
                challengeId: challenge.id,
            });
            const {myChallengesFetched} = await fetchChallengeData(
                userId,
                'MyChallenges',
            );
            if (myChallengesFetched) {
                setMyChallenges(myChallengesFetched);
            }
            setShowPasswordInput(false);
            Alert.alert('Successfully joined the challenge');
        } catch (e: any) {
            Alert.alert(e.message ?? 'Failed to join the challenge');
        }
    };

    const join = () => {
        if (isPrivate) {
            if (passwordInput !== password) {
                Alert.alert('Incorrect password');
                return;
            }
        }
        showCheckAlert({
            title,
            callback: requestJoin,
        });
    };

    return (
        <Modal
            style={{zIndex: 10}}
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => setModalVisible(!visible)}>
            <View className="justify-center items-center bg-opacity-50 bg-sky-500 w-full h-full relative">
                <View className="bg-white w-11/12 h-5/6 rounded-lg p-4 space-y-10 justify-between flex-col">
                    <View className="w-full justify-end flex-row">
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}>
                            <Icon name="close" size={30} />
                        </TouchableOpacity>
                    </View>

                    <View className="w-full flex-col justify-center items-center space-y-4 -mt-2">
                        <ChallengeConfig challenge={challenge} />
                    </View>

                    {challengeRankings?.length > 0 ? (
                        <>
                            <Space heightClassName={'h-8'} />
                            <View>
                                <Podium challengeRankings={challengeRankings} />
                            </View>
                            <Space heightClassName={'h-10'} />
                            <LeaderBoardList
                                challengeRankings={challengeRankings}
                            />
                        </>
                    ) : (
                        <View className="w-full h-1/2 items-start justify-start">
                            {fetching ? (
                                <LoadingSpinner />
                            ) : (
                                <View className="w-full flex-row h-2/3 items-center justify-center">
                                    <Text>No Ranking data</Text>
                                </View>
                            )}
                        </View>
                    )}
                    <TouchableOpacity
                        onPress={checkPassword}
                        className="bg-[#342D60] rounded py-2 w-full mb-2">
                        <Text className="text-white font-bold text-center">
                            Join Challenge
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            {showPasswordInput && (
                <View className="absolute w-full h-full flex z-100">
                    <PasswordInputModal
                        showPasswordInput={showPasswordInput}
                        setShowPasswordInput={setShowPasswordInput}
                        passwordInput={passwordInput}
                        setPasswordInput={setPasswordInput}
                        join={join}
                    />
                </View>
            )}
        </Modal>
    );
}
