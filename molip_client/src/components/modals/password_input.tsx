import React from 'react';
import {Modal, View, Text, TextInput, TouchableOpacity} from 'react-native';

export function PasswordInputModal({
    showPasswordInput,
    setShowPasswordInput,
    passwordInput,
    setPasswordInput,
    join,
}: {
    showPasswordInput: boolean;
    setShowPasswordInput: (value: boolean) => void;
    passwordInput: string;
    setPasswordInput: (value: string) => void;
    join: () => void;
}) {
    return (
        <Modal
            style={{zIndex: 30}}
            transparent={true}
            animationType="fade"
            visible={showPasswordInput}
            onRequestClose={() => setShowPasswordInput(false)}>
            <View className="flex-col justify-center items-center h-full">
                <View className="px-6 py-4 rounded-lg w-3/4 bg-gray-100 shadow-xl border border-gray-300 shadow-gray-300">
                    <Text className="text-lg font-semibold">
                        Enter password
                    </Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2 w-full mt-2"
                        placeholder="Enter password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                        value={passwordInput}
                        onChangeText={setPasswordInput}
                    />
                    <TouchableOpacity
                        className="bg-blue-500 rounded-lg p-2 mt-2"
                        onPress={join}>
                        <Text className="text-white text-center font-semibold">
                            Join
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
