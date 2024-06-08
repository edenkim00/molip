import React from 'react';
import {View} from 'react-native';

export function Space({
    heightClassName,
}: {
    heightClassName: string;
}): JSX.Element {
    return <View className={heightClassName} />;
}
