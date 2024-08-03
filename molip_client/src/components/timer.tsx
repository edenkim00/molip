import React, {useState, useEffect} from 'react';
import {
    Platform,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    Button,
} from 'react-native';
import {CircularProgress} from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import {Space} from './space';
import _ from 'lodash';
import {Challenge, ChallengeRecrod} from '@pages/Challenge';
import ApiManager from '@api';

const getButtonClassNames: (enable: boolean) => string = (enable: boolean) => {
    return `w-[28%] p-2 justify-center items-center ${
        enable ? 'bg-[#2D1486]' : 'bg-[#CCCCCC] bg-opacity-30'
    }`;
};

function convertSecondsToTimeDisplay(seconds: number): string {
    const date = new Date(seconds * 1000);
    const [day, hhmmss] = date.toISOString().substr(9, 10).split('T');
    const [hh, mm, ss] = hhmmss.split(':');
    const hhConsideringDay = 24 * (parseInt(day) - 1) + parseInt(hh);
    return `${hhConsideringDay.toString().padStart(2, '0')}:${mm}:${ss}`
        .trim()
        .replace(/\s/g, '');
}

function LapRecord({
    index,
    time,
    isTheLastRecord,
}: {
    index: number;
    time: number;
    isTheLastRecord?: boolean;
}) {
    return (
        <View className="flex-row justify-between w-[60%]">
            <Text
                className={`text-gray-500 ${
                    isTheLastRecord ? 'text-[#2D1486] font-semibold' : ''
                }`}>
                Lap {index + 1}
            </Text>
            <View />
            <Text
                className={`text-sm text-gray-500 tracking-tight ${
                    isTheLastRecord ? 'font-semibold' : ''
                }`}
                style={{
                    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
                }}>
                {convertSecondsToTimeDisplay(time)}
            </Text>
        </View>
    );
}

function TimerScreen({selectedChallenge}: {selectedChallenge?: Challenge}) {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [lapRecords, setLapRecords] = useState<number[]>([]);
    const [timeDisplay, setTimeDisplay] = useState('00:00:00');

    const [challengeRecord, setChallengeRecord] = useState<
        ChallengeRecrod | undefined
    >(undefined);

    useEffect(() => {
        handleRefresh();
    }, [selectedChallenge]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, seconds]);

    useEffect(() => {
        setTimeDisplay(convertSecondsToTimeDisplay(seconds));
    }, [seconds]);

    function checkChallengeSelected() {
        if (!selectedChallenge) {
            Alert.alert('Please select a challenge first!');
            return false;
        }
        return true;
    }

    async function trackLap() {
        const newLapRecords = [...lapRecords, seconds];
        // ORDER BY DESC AND SET RECORDS
        console.log('newLapRecords', newLapRecords);
        setLapRecords(_.orderBy(newLapRecords, [], ['desc']));
    }

    async function handleSubmit() {
        //TODO : Implement this function
        try {
            await ApiManager.track(challengeRecord);
        } catch (error) {
            // console.error('Error while submitting challenge record', error);
        }

        //MARK: LAST TASK
        handleRefresh();
    }

    function handleRefresh(check = false) {
        if (check) {
            Alert.alert('Are you sure you want to refresh the timer?', '', [
                {
                    text: 'OK',
                    onPress: () => {
                        setIsActive(false);
                        setSeconds(0);
                        setLapRecords([]);
                        setChallengeRecord(undefined);
                    },
                },
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
            ]);
        } else {
            setIsActive(false);
            setSeconds(0);
            setLapRecords([]);
            setChallengeRecord(undefined);
        }
    }

    useEffect(() => {
        if (!selectedChallenge?.id) {
            return;
        }

        if (isActive) {
            setChallengeRecord({
                challengeId: selectedChallenge?.id,
                start: Date.now(),
            });
        } else {
            setChallengeRecord({
                ...challengeRecord,
                end: Date.now(),
            } as ChallengeRecrod);
        }
    }, [isActive]);

    return (
        <View className="flex-col justify-between items-center z-10 w-full">
            <CircularProgress
                size={200}
                width={10}
                fill={(seconds % 60) * (100 / 60)}
                tintColor="#6a1b9a"
                backgroundColor="#d3d3d3">
                {() => <Text style={styles.time}>{timeDisplay}</Text>}
            </CircularProgress>
            <Space heightClassName={'h-4'} />
            <View className="w-[85%] flex-row justify-between max-h-12 h-10">
                <TouchableOpacity
                    className={getButtonClassNames(isActive)}
                    onPress={() => {
                        if (!checkChallengeSelected()) {
                            return;
                        }
                        setIsActive(!isActive);
                    }}>
                    <Icon
                        name={isActive ? 'pause' : 'play'}
                        size={18}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    className={getButtonClassNames(!isActive)}
                    disabled={isActive}
                    onPress={() => {
                        if (!checkChallengeSelected()) {
                            return;
                        }
                        handleRefresh(true);
                    }}>
                    <Icon name="refresh" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[28%] bg-[#2D1486] p-2 justify-center items-center"
                    onPress={() => {
                        if (!checkChallengeSelected()) {
                            return;
                        }
                        if (isActive) {
                            trackLap();
                        } else {
                            handleSubmit();
                        }
                    }}>
                    <Text className="text-sm text-white font-bold">
                        {isActive ? 'Lap' : 'Submit'}
                    </Text>
                </TouchableOpacity>
            </View>
            {lapRecords?.length > 0 && (
                <ScrollView
                    className={`w-[85%] mt-4 border-t border-gray-600 max-h-72 ${
                        lapRecords.length > 6 ? 'border-b' : ''
                    }`}>
                    {lapRecords.map((time, index) => {
                        const isTheLastRecord = index === 0;
                        return (
                            <View
                                className="w-full border-b border-gray-600 py-2.5 px-1"
                                key={index}>
                                <LapRecord
                                    key={index}
                                    index={lapRecords.length - index - 1}
                                    time={time}
                                    isTheLastRecord={isTheLastRecord}
                                />
                            </View>
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressContainer: {
        marginBottom: 50,
    },
    time: {
        fontSize: 30,
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        backgroundColor: '#6a1b9a',
        padding: 20,
        borderRadius: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default TimerScreen;
