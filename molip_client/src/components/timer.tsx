import React, {useState, useEffect} from 'react';
import {
    Platform,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import {CircularProgress} from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import {Space} from './space';
import _ from 'lodash';

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

function TimerScreen() {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [lapRecords, setLapRecords] = useState<number[]>([]);
    const [timeDisplay, setTimeDisplay] = useState('00:00:00');

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

    async function trackLap() {
        const newLapRecords = [...lapRecords, seconds];
        // ORDER BY DESC AND SET RECORDS
        console.log('newLapRecords', newLapRecords);
        setLapRecords(_.orderBy(newLapRecords, [], ['desc']));
    }

    async function handleSubmit() {
        //TODO : Implement this function

        //MARK: LAST TASK
        handleRefresh();
    }

    function handleRefresh() {
        setSeconds(0);
        setLapRecords([]);
    }

    return (
        <View className="flex-col justify-start items-center z-10 w-full">
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
                    onPress={handleRefresh}>
                    <Icon name="refresh" size={18} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[28%] bg-[#2D1486] p-2 justify-center items-center"
                    onPress={() => {
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
                    className={`w-[85%] mt-4 border-t border-gray-600 max-h-36 ${
                        lapRecords.length > 4 ? 'border-b' : ''
                    }`}>
                    {lapRecords.map((time, index) => {
                        const isTheLastRecord = index === 0;
                        return (
                            <View className="w-full border-b border-gray-600 py-2.5 px-1">
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
