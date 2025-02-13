import ApiManager from '@api';
import React, {useEffect, useState} from 'react';
import {
    Alert,
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import {LinearGradient} from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {openImagePicker} from './upload_image_modal';
import {ScrollView} from 'react-native-gesture-handler';

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

    const validate = () => {
        if (!challengeName) {
            Alert.alert('Please enter challenge name');
            return false;
        }

        if (challengeName.length > 10) {
            Alert.alert('Challenge name should be less than 10 characters');
            return false;
        }

        if (!challengeDescription) {
            Alert.alert('Please enter challenge description');
            return false;
        }
        if (isPrivate && !password) {
            Alert.alert('Please enter password');
            return false;
        }
        return true;
    };

    const saveChallenge = async () => {
        try {
            if (!validate()) {
                return;
            }

            await ApiManager.createChallenge({
                name: challengeName,
                description: challengeDescription,
                isPrivate: isPrivate,
                password: isPrivate ? password : undefined,
                imageUrl: imageUrl || undefined,
            });
            Alert.alert('Challenge created');
            onClose();
        } catch (err: any) {
            Alert.alert(err.message ?? 'Failed to create challenge');
        }
    };

    async function selectImageAndUpload(imageUri?: string) {
        if (!imageUri) {
            return;
        }
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });
            const res = await ApiManager.uploadImage({file: formData});
            const imageUrl = res.image_url;
            setImageUrl(imageUrl);
        } catch (err) {
            Alert.alert('Failed to upload your image');
        }
    }

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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}>
                <View className="flex-col justify-center items-center h-full">
                    <LinearGradient
                        colors={['#8BC6A3', '#D8EBDD']}
                        className="px-6 py-4 rounded-lg w-5/6 shadow-2xl relative">
                        <View className="absolute right-3 top-3">
                            <TouchableOpacity onPress={onClose}>
                                <Ionicons
                                    name="close"
                                    size={20}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                        <View className="items-center my-4 space-y-1 h-24">
                            <View className="w-20 h-20 rounded-full bg-gray-100 justify-center items-center">
                                <TouchableOpacity
                                    onPress={() => {
                                        openImagePicker(selectImageAndUpload);
                                    }}>
                                    {imageUrl ? (
                                        <Image
                                            source={{uri: imageUrl}}
                                            className="w-24 h-24 rounded-full"
                                        />
                                    ) : (
                                        <Ionicons
                                            name="camera-outline"
                                            size={30}
                                            color="black"
                                        />
                                    )}
                                </TouchableOpacity>
                            </View>
                            <Text className="text-[#5F5757] tracking-tight text-sm">
                                Challenge Image
                            </Text>
                        </View>
                        <ScrollView
                            className="flex-col w-full space-y-1 h-40"
                            nestedScrollEnabled={true}>
                            <TextInput
                                className="rounded-xl px-3 py-4 w-full mb-2 h-12 overflow-hidden bg-white opacity-80 !shadow-2xl shadow-blue-300"
                                placeholder="Challenge name"
                                placeholderTextColor={'gray'}
                                value={challengeName}
                                onChangeText={setChallengeName}
                            />

                            <TextInput
                                className="rounded-xl px-3 py-4 w-full mb-2 h-24 overflow-hidden bg-white opacity-80"
                                placeholder="Challenge description"
                                placeholderTextColor={'gray'}
                                multiline={true}
                                value={challengeDescription}
                                onChangeText={setChallengeDescription}
                            />

                            <View className="flex-row justify-between items-center">
                                <TextInput
                                    className="rounded-xl px-3 py-4 w-5/6 mb-2 overflow-hidden bg-white opacity-80"
                                    placeholder="Enter PW"
                                    placeholderTextColor={'gray'}
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
                        </ScrollView>

                        <TouchableOpacity
                            className="bg-[#342D60] rounded-lg p-3 mt-4"
                            onPress={saveChallenge}>
                            <Text className="text-white text-center font-semibold">
                                Save
                            </Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
}
