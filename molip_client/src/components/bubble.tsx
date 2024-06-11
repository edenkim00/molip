import React from 'react';
import {Image} from 'react-native';
import image from '@assets/bubble.png';

export default function Bubble(): JSX.Element {
    return (
        <Image
            source={image}
            alt="logo"
            className="absolute -left-12 -top-12 w-48 h-36"
        />
    );
}
