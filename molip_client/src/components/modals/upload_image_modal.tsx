import React, {useState} from 'react';
import {Alert} from 'react-native';

import {
    ImagePickerResponse,
    launchCamera,
    launchImageLibrary,
    MediaType,
} from 'react-native-image-picker';

export function openImagePicker(
    callback: (imageUri: string | undefined) => void,
): void {
    const options = {
        mediaType: 'photo' as MediaType,
        includeBase64: false,
        maxHeight: 300,
        maxWidth: 500,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
        if (response.didCancel) {
            return;
        }
        if (response.errorCode) {
            Alert.alert(response.errorMessage ?? 'Failed to pick image');
            return;
        }
        let imageUri = response.assets?.[0]?.uri;
        callback(imageUri);
    });
}
