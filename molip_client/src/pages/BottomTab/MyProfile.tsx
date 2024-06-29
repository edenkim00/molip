import React, {useContext, useState} from 'react';
import {
    View,
    Alert,
    Image,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {fetchUserProfile, MyDataContext} from '@lib/context';

import {PAGES} from '@pages/PageConfig';

import {Space} from '@components/space';
import Bubble from '@components/bubble';
import DEFAULT_PROFILE_IMAGE from '@assets/default_profile.png';
import GradientText from '@components/gradient_text';
import {openImagePicker} from '@components/modals/upload_image_modal';
import ApiManager from '@api';
import AuthManager from '@auth';

function MyPageButtonGroup({navigation}: {navigation: any}) {
    const handleLogout = async () => {
        await AuthManager.clear();
        navigation.navigate(PAGES.LoginPage.name);
    };
    
    const handleDeleteAccount = async () => {
        await ApiManager.deleteAccount();
        navigation.navigate(PAGES.LoginPage.name);
        Alert.alert('Account deleted successfully');
    };

    return (
        <View className="flex-row justify-center w-[80%] space-x-2 mb-[5%]">
            <TouchableOpacity
                onPress={handleDeleteAccount}
                className="bg-[#342D60] rounded py-3 w-[50%]">
                <Text className="text-white font-bold text-center">
                    Delete Account
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleLogout}
                className="bg-[#342D60] rounded py-3 w-[50%]">
                <Text className="text-white font-bold text-center">Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

export default function MyProfile({navigation}: any) {
    const myData = useContext(MyDataContext);
    const {
        userId,
        allChallenges: challenges,
        setAllChallenges: setChallenges,
        userProfile,
        setUserProfile,
    } = myData;

    if (!userId || !userProfile) {
        navigation.navigate(PAGES.LoginPage.name);
        Alert.alert('Failed to get data. Please try again.');
        return null;
    }

    const {id, profile_image_url} = userProfile;

    async function selectImageAndUploadUserProfileImage(imageUri?: string) {
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
            await ApiManager.updateUserProfile({
                imageUrl,
            });
            const newProfileData = await fetchUserProfile();
            setUserProfile(newProfileData);
            Alert.alert('Profile image uploaded successfully');
        } catch (err) {
            Alert.alert('Failed to upload your profile image');
        }
    }

    return (
        <View className="w-full flex-col justify-between items-center bg-white h-full">
            <View className="flex-col justify-start items-center w-full relative bg-white">
                <Bubble />
                <Space heightClassName={'h-24'} />
                <View className="flex-row justify-center w-full">
                    <GradientText
                        startColor="#3E00E6"
                        endColor="#13315F"
                        fontSize={30}>
                        My Profile
                    </GradientText>
                </View>

                <View className="flex-col justify-center items-center w-full">
                    <View className="flex-col justify-center items-center w-32 h-32 rounded-full bg-gray-200">
                        <TouchableOpacity
                            onPress={() => {
                                openImagePicker(
                                    selectImageAndUploadUserProfileImage,
                                );
                            }}>
                            <Image
                                source={
                                    profile_image_url
                                        ? {uri: profile_image_url}
                                        : DEFAULT_PROFILE_IMAGE
                                }
                                className="w-32 h-32 rounded-full"
                            />
                        </TouchableOpacity>
                    </View>
                    <Space heightClassName={'h-2'} />
                    <GradientText
                        startColor="#3E00E6"
                        endColor="#13315F"
                        fontSize={20}>
                        {`Welcome, ${id}!`}
                    </GradientText>
                </View>
            </View>
            <MyPageButtonGroup navigation={navigation} />
        </View>
    );
}
