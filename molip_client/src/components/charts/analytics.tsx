import React from 'react';
import {View, Text} from 'react-native';

import {Challenge} from '@pages/Challenge';

export interface Ranking {
    challenge: Challenge;
    ranking: number;
    dt: string;
}

export interface ChallengeLog {
    challenge: Challenge;
    dt: string;
    engagementTime: number; // in minutes
}

export const sampleData: Ranking[] = [
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
        ranking: 1,
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
        ranking: 1,
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

import {LineChart} from 'react-native-chart-kit';

export function RankingLineChart({rankings}: {rankings: Ranking[]}) {
    const data = {
        labels: rankings.map(r => r.dt),
        datasets: [
            {
                data: rankings.map(r => r.ranking),
            },
        ],
    };

    return (
        <LineChart
            data={data}
            width={300}
            height={200}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
                backgroundColor: '#1cc910',
                backgroundGradientFrom: '#eff3ff',
                backgroundGradientTo: '#efefef',
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
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
    );
}
