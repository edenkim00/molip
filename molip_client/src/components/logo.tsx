import React from 'react';
import {Image} from 'react-native';
import image from '@assets/molip_logo.png';

export default function Logo(): JSX.Element {
    return <Image source={image} alt="logo" className="w-full h-full" />;
}
