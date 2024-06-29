import React from 'react';
import {Dimensions, View} from 'react-native';
import Svg, {Defs, LinearGradient, Stop, Text, TSpan} from 'react-native-svg';

const GradientText = (props: {
    children: string;
    startColor: string;
    endColor: string;
    start?: {x: number; y: number};
    end?: {x: number; y: number};
    fontSize?: number;
}) => {
    const screenWidth = Dimensions.get('window').width;
    return (
        <View className="w-full justify-center flex-row items-center">
            <Svg height={'40'} width={screenWidth}>
                <Defs>
                    <LinearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%">
                        <Stop
                            offset="0%"
                            stopColor={props.startColor ?? '#13315F'}
                        />
                        <Stop
                            offset="100%"
                            stopColor={props.endColor ?? '#6EE7B7'}
                        />
                    </LinearGradient>
                </Defs>
                <Text
                    fill="url(#gradient)"
                    fontSize={props.fontSize?.toString() ?? '20'}
                    fontWeight="bold"
                    textAnchor="middle"
                    x={screenWidth / 2}
                    y="25">
                    {props.children}
                </Text>
            </Svg>
        </View>
    );
};

export default GradientText;
