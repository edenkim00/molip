import React from 'react';
import {View, Text, Dimensions} from 'react-native';

import {Challenge, ChallengeRanking} from '@pages/Challenge';

export interface ChallengeLog {
    challenge: Challenge;
    dt: string;
    engagementTime: number; // in minutes
}

export const sampleData: ChallengeRanking[] = [
    {
        challenge: {
            id: 1,
            name: 'Challenge 1',
            description: 'Description 1',
            private: false,
            password: 'password1',
            creator_id: 'sample1',
            status: 'active',
            image_url: '//placehold.co/600x400/EEE/31343C',
            joined_users_count: 10,
        },
        ranking: 1,
        dt: '2024-01-01',
    },
    {
        challenge: {
            id: 1,
            name: 'Challenge 1',
            description: 'Description 1',
            private: false,
            password: 'password1',
            creator_id: 'sample1',
            status: 'active',
            image_url: '//placehold.co/600x400/EEE/31343C',
            joined_users_count: 10,
        },
        ranking: 3,
        dt: '2024-01-02',
    },
    {
        challenge: {
            id: 1,
            name: 'Challenge 1',
            description: 'Description 1',
            private: false,
            password: 'password1',
            creator_id: 'sample1',
            status: 'active',
            image_url: '//placehold.co/600x400/EEE/31343C',
            joined_users_count: 10,
        },
        ranking: 4,
        dt: '2024-01-03',
    },
    {
        challenge: {
            id: 1,
            name: 'Challenge 1',
            description: 'Description 1',
            private: false,
            password: 'password1',
            creator_id: 'sample1',
            status: 'active',
            image_url: '//placehold.co/600x400/EEE/31343C',
            joined_users_count: 10,
        },
        ranking: 1,
        dt: '2024-01-04',
    },
    {
        challenge: {
            id: 1,
            name: 'Challenge 1',
            description: 'Description 1',
            private: false,
            password: 'password1',
            creator_id: 'sample1',
            status: 'active',
            image_url: '//placehold.co/600x400/EEE/31343C',
            joined_users_count: 10,
        },
        ranking: 1,
        dt: '2024-01-05',
    },
];

import {BarChart, LineChart} from 'react-native-chart-kit';
import _ from 'lodash';

const sanitizeRanking = (ranking: ChallengeRanking[]) => {
    return _(ranking)
        .map(r => ({
            ...r,
            ranking: parseInt((r.ranking as any) || 0),
            duration: parseInt((r.duration as any) || 0),
        }))
        .orderBy(['ranking'], ['asc'])
        .value()
        .slice(0, 10);
};

type rankingChartMode = 'ranking' | 'duration';

function ModeSelector({
    mode,
    setMode,
}: {
    mode: rankingChartMode;
    setMode: (mode: rankingChartMode) => void;
}) {
    return (
        <View className="w-full flex-row justify-center items-center">
            <Text
                style={{
                    padding: 5,
                    color: mode === 'ranking' ? 'black' : 'grey',
                }}
                onPress={() => setMode('ranking')}>
                Ranking
            </Text>
            <Text
                style={{
                    padding: 5,
                    color: mode === 'duration' ? 'black' : 'grey',
                }}
                onPress={() => setMode('duration')}>
                Duration
            </Text>
        </View>
    );
}

export function RankingLineChart({rankings}: {rankings: ChallengeRanking[]}) {
    const [mode, setMode] = React.useState<rankingChartMode>('ranking');
    if (!rankings || rankings.length === 0) {
        return (
            <View>
                <Text>No ranking data</Text>
            </View>
        );
    }

    const screenWidth = Dimensions.get('window').width; // 차트 너비를 디바이스 너비에 맞춤
    const chartConfig = {
        backgroundColor: '#ffffff', // 배경색
        backgroundGradientFrom: '#ffffff', // 그라디언트 시작 색
        backgroundGradientTo: '#AAFF', // 그라디언트 끝 색
        decimalPlaces: 2, // 소수점 없음
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // 라벨 색상
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 라벨 색상
        style: {
            borderRadius: 16,
            paddingTop: 10,
            marginTop: 10,
        },
    };

    return (
        <View className="w-full flex-col justify-center items-center">
            <ModeSelector mode={mode} setMode={setMode} />
            {mode === 'ranking' && (
                <View
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        paddingVertical: 10,
                    }}>
                    <Text
                        style={{
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginBottom: 10,
                        }}>
                        Ranking Chart
                    </Text>
                    <BarChart
                        data={transformedRankingData}
                        width={screenWidth * 0.9}
                        height={260}
                        yAxisLabel=""
                        yAxisSuffix=""
                        chartConfig={chartConfig}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                            elevation: 4, // 안드로이드에 그림자 효과
                            shadowColor: '#999', // iOS에 그림자 효과
                            shadowOffset: {width: 0, height: 3},
                            shadowRadius: 5,
                            shadowOpacity: 0.5,
                        }}
                        verticalLabelRotation={30} // y축 라벨 회전
                    />
                </View>
            )}
            {mode === 'duration' && (
                <LineChart
                    data={durationData}
                    width={300}
                    height={200}
                    yAxisSuffix="h"
                    yAxisInterval={3600}
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) =>
                            `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            paddingTop: 10,
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            )}
        </View>
    );
}
