import React, {useEffect, useState} from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function CreateChallengeModal({
    visible,
    onClose,
}: {
    visible: boolean;
    onClose: () => void;
}) {
    const [challengeName, setChallengeName] = useState('');
    const [challengeDescription, setChallengeDescription] = useState('');
    const [password, setPassword] = useState<string | undefined>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [imageUrl, setImageUrl] = useState('');

    const saveChallenge = () => {
        // Save challenge action
        onClose();
    };

    useEffect(() => {
        if (password?.length == 0) {
            setIsPrivate(false);
        } else {
            setIsPrivate(true);
        }
    }, [password]);

    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}>
            <View className="flex-1 justify-center items-center">
                <LinearGradient
                    colors={['#8BC6A3', '#D8EBDD']}
                    className="px-6 py-4 rounded-lg w-5/6 shadow-2xl relative">
                    <View className="absolute right-3 top-3">
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View className="items-center my-4 space-y-1">
                        <View className="w-24 h-24 rounded-full bg-gray-100 justify-center items-center">
                            <Ionicons
                                name="camera-outline"
                                size={30}
                                color="black"
                            />
                        </View>
                        <Text className="text-[#5F5757] tracking-tight text-sm">
                            Challenge Image
                        </Text>
                    </View>
                    <View className="flex-col w-full space-y-1">
                        <TextInput
                            className="rounded-xl px-3 py-4 w-full mb-2 h-12 overflow-hidden bg-white opacity-80 !shadow-2xl shadow-blue-300"
                            placeholder="Challenge name"
                            value={challengeName}
                            onChangeText={setChallengeName}
                        />

                        <TextInput
                            className="rounded-xl px-3 py-4 w-full mb-2 h-24 overflow-hidden bg-white opacity-80"
                            placeholder="Challenge description"
                            multiline={true}
                            value={challengeDescription}
                            onChangeText={setChallengeDescription}
                        />

                        <View className="flex-row justify-between items-center">
                            <TextInput
                                className="rounded-xl px-3 py-4 w-5/6 mb-2 overflow-hidden bg-white opacity-80"
                                placeholder="Enter PW"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                            <TouchableOpacity
                                className="rounded-lg ml-3 mb-2"
                                onPress={() => {
                                    setIsPrivate(!isPrivate);
                                }}>
                                <Ionicons
                                    name={
                                        isPrivate
                                            ? 'lock-closed'
                                            : 'lock-open-outline'
                                    }
                                    size={24}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity
                        className="bg-[#342D60] rounded-lg p-3 mt-4"
                        onPress={saveChallenge}>
                        <Text className="text-white text-center font-semibold">
                            Save
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </Modal>
    );
}
