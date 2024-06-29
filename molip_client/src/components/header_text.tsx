import React from 'react';
import {View, Text} from 'react-native';
import {Space} from './space';

export function HeaderText({text}: {text: string}) {
    return <Text className="text-xl tracking-tight font-semibold">{text}</Text>;
}
