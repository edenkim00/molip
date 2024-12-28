import React, {useEffect, useState} from 'react';
import {Challenge, ChallengeRanking} from '../../pages/Challenge';
import {View, Text, Modal, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ApiManager from '@api';
import {LoadingSpinner} from '@components/loading_spinner';

import {BarChart, LineChart} from 'react-native-gifted-charts';

import {ButtonGroup} from 'react-native-elements';
import _ from 'lodash';

import {LogBox} from 'react-native';
LogBox.ignoreLogs([
    'Warning: TextElement: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
]);

type ChallengeMyDataMode = 'ranking' | 'duration';
const covertLabel = (dt: string) => {
    return dt.split('-').slice(1).join('/');
};

export function UserDataModal({
    visible,
    setModalVisible,
    challenge,
}: {
    visible: boolean;
    setModalVisible: (visible: boolean) => void;
    challenge: Challenge;
    userId: string;
    setMyChallenges: (challenges: Challenge[]) => void;
}) {
    const [challengeRankings, setChallengeRankings] = useState<
        ChallengeRanking[]
    >([]);
    const [offset, setOffset] = useState<number>(0);
    const [fetching, setFetching] = useState<boolean>(false);

    const fetchUserChallengeData = async () => {
        try {
            setFetching(true);
            return await ApiManager.getUserChallengeData({
                challengeId: challenge.id,
                offset: offset,
            });
        } catch (e: any) {
            return [];
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        console.log('fetching user challenge data', offset);
        fetchUserChallengeData().then(res => {
            console.log(res);
            setChallengeRankings(res);
        });
    }, [offset]);

    const modes: ChallengeMyDataMode[] = ['ranking', 'duration'];
    const [mode, setMode] = useState<ChallengeMyDataMode>('duration');
    const updateMode = (selectedIndex: number) => {
        setMode(modes[selectedIndex]);
    };

    const modeBgColorMap = {
        ranking: '#d58ba1',
        duration: '#a1d5a1',
    };

    return (
        <Modal
            style={{zIndex: 10}}
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => setModalVisible(!visible)}>
            <View
                className={`justify-center items-center bg-opacity-50 bg-[${modeBgColorMap[mode]}] w-full h-full relative`}
                style={{
                    backgroundColor: modeBgColorMap[mode],
                }}
                key={`user-challenge-data-modal-${challenge.id}`}>
                <View className="flex-col bg-white w-11/12 h-5/6 rounded-lg p-4 space-y-10 justify-between">
                    <View className="w-full justify-end flex-row">
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}>
                            <Icon name="close" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View className="w-full flex-col justify-start space-y-10">
                        {fetching ? (
                            <LoadingSpinner />
                        ) : challengeRankings.length === 0 ? (
                            <View className="w-full h-full flex-col justify-center items-center">
                                <Text className="text-center text-black">
                                    No data available
                                </Text>
                            </View>
                        ) : (
                            <ChallengeMyData
                                mode={mode}
                                updateMode={updateMode}
                                challenge={challenge}
                                challengeRankings={challengeRankings}
                                offset={offset}
                                setOffset={setOffset}
                            />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
}

function ChallengeMyData({
    offset,
    setOffset,
    mode,
    updateMode,
    challenge,
    challengeRankings,
}: {
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
    mode: ChallengeMyDataMode;
    updateMode: (index: number) => void;
    challenge: Challenge;
    challengeRankings: ChallengeRanking[];
}) {
    if (!challengeRankings?.length) {
        return null;
    }

    return (
        <View className="w-full space-y-5">
            <View className="w-full flex-col justify-start items-center space-y-3 mb-4">
                <Text
                    className="text-black font-bold text-xl text-center"
                    style={{marginTop: -20}}>
                    {challenge.name}
                </Text>
                <Text className="font-normal text-sm text-center text-black">
                    {challengeRankings[0]?.dt.replace(/-/g, '/')} -{' '}
                    {challengeRankings.slice(-1)[0].dt.replace(/-/g, '/')}
                </Text>
            </View>
            <OffsetController offset={offset} setOffset={setOffset} />
            <View className="w-full mb-8">
                <ButtonGroup
                    onPress={updateMode}
                    selectedIndex={mode === 'ranking' ? 0 : 1}
                    buttons={['Ranking', 'Duration']}
                    containerStyle={{height: 35}}
                />
            </View>
            <View className="w-full h-full relative flex-col justify-end items-center ">
                <View className="w-[90%] bg-red-900 absolute top-0 overflow-hidden">
                    {
                        {
                            ranking: (
                                <ChallengeRankingLineChart
                                    challengeRankings={challengeRankings}
                                />
                            ),
                            duration: (
                                <ChallengeDurationChart
                                    challengeRankings={challengeRankings}
                                />
                            ),
                        }[mode]
                    }
                </View>
            </View>
        </View>
    );
}

function ChallengeRankingLineChart({
    challengeRankings,
}: {
    challengeRankings: ChallengeRanking[];
}) {
    let refinedRankingData = _.map(challengeRankings, ({ranking, dt}) => ({
        ranking: ranking || 1,
        dt,
    }));

    const values = refinedRankingData.map(({ranking}) => ranking);
    const [min, max] = [_.min(values) ?? 1, _.max([...values, 10]) ?? 1];
    const stepSize = Math.ceil((max - min) / 10) || 1;
    const stepValue = stepSize > 1 ? stepSize : 1;

    const lineData = refinedRankingData.map(rankingData => ({
        value: max - rankingData.ranking,
        label: covertLabel(rankingData.dt),
        dataPointColor: rankingData.ranking == min ? 'red' : 'orange',
    }));

    let yLabels = [max.toString()];
    for (let i = max - stepValue; i > min; i -= stepValue) {
        yLabels.push(i.toString());
    }

    if (yLabels[yLabels.length - 1] != min.toString()) {
        yLabels.push(min.toString());
    }

    const len = yLabels.length;
    if (len < 10) {
        yLabels = yLabels.concat(
            Array.from({length: 10 - len}, (_, i) => (10 - len - i).toString()),
        );
    }

    return (
        <View className="w-full h-full space-y-4 bg-white">
            <LineChart
                height={(1 / 3) * Dimensions.get('window').height}
                dataPointsRadius={5}
                data={lineData}
                yAxisThickness={0} // y축 선 두께
                xAxisThickness={0} // x축 선 두께
                xAxisIndicesColor={'balck'} // x축 눈금 색상
                xAxisLabelTextStyle={{
                    color: 'black',
                    fontSize: 10,
                }}
                verticalLinesColor="rgba(14,164,164,0.5)"
                color="#0BA5A4"
                stepValue={stepSize}
                formatYLabel={(value: any) =>
                    parseInt(value, 10).toFixed(0).toString()
                }
                yAxisLabelTexts={yLabels}
                yAxisTextStyle={{
                    color: 'black',
                    fontSize: 10,
                    paddingRight: 0,
                }}
                maxValue={max - min}
            />
        </View>
    );
}

function ChallengeDurationChart({
    challengeRankings,
}: {
    challengeRankings: ChallengeRanking[];
}) {
    const refinedDurationData = _.map(challengeRankings, ({duration, dt}) => ({
        duration: duration / 60 || 0, // 단위 변환
        dt,
    }));

    const maxValue = _.max(_.map(refinedDurationData, 'duration'));

    const barData = refinedDurationData.map(durationData => ({
        value: durationData.duration,
        label: covertLabel(durationData.dt),
        frontColor: durationData.duration == maxValue ? 'green' : 'lightgray',
    }));

    return (
        <View className="w-full h-full space-y-4 bg-white">
            <BarChart
                height={(1 / 3) * Dimensions.get('window').height}
                barWidth={0.04 * Dimensions.get('window').width}
                barBorderRadius={4}
                data={barData}
                yAxisThickness={0} // y축 선 두께
                xAxisThickness={0} // x축 선 두께
                xAxisIndicesColor={'black'} // x축 눈금 색상
                xAxisLabelTextStyle={{
                    color: 'black',
                    fontSize: 10,
                }}
                yAxisTextStyle={{
                    color: 'black',
                    fontSize: 10,
                    paddingRight: 0,
                }}
                yAxisLabelSuffix="m"
                maxValue={maxValue}
            />
        </View>
    );
}

function OffsetController({
    offset,
    setOffset,
}: {
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
}) {
    const refreshButton = () => {
        setOffset(0);
    };

    return (
        <View className="w-full flex-row justify-end items-center space-x-3">
            <TouchableOpacity onPress={() => setOffset(offset - 1)}>
                <Icon name="chevron-back" size={16} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setOffset(offset + 1)}
                disabled={offset >= 0}>
                <Icon name="chevron-forward" size={16} />
            </TouchableOpacity>
            <TouchableOpacity onPress={refreshButton}>
                <Icon name="refresh" size={16} />
            </TouchableOpacity>
        </View>
    );
}
