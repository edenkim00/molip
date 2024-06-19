import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export const LoadingSpinner = () => (
    <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);
