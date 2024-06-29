import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {PasswordInputModal} from './modals/password_input';
import ApiManager from '@api';
import {Challenge} from '@pages/Challenge';
import {fetchChallengeData} from '@lib/context';

function showCheckAlert({
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
    const [showPasswordInput, setShowPasswordInput] = useState<boolean>(false);
    const [passwordInput, setPasswordInput] = useState<string>('');

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

            Alert.alert('Successfully joined the challenge');
        } catch (e: any) {
            Alert.alert(e.message ?? 'Failed to join the challenge');
        }
    };

    const join = () => {
        setShowPasswordInput(false);
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
        <View className="w-full flex-col justify-start items-center">
            <TouchableOpacity onPress={checkPassword}>
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
            {showPasswordInput && (
                <PasswordInputModal
                    showPasswordInput={showPasswordInput}
                    setShowPasswordInput={setShowPasswordInput}
                    passwordInput={passwordInput}
                    setPasswordInput={setPasswordInput}
                    join={join}
                />
            )}
        </View>
    );
}
