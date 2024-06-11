import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {CircularProgress} from 'react-native-circular-progress';
import Icon from 'react-native-vector-icons/Ionicons';
import {Space} from './space';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TimerScreen = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

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

    function track() {}
    return (
        <View className="flex justify-center items-center">
            <CircularProgress
                size={200}
                width={10}
                fill={(seconds % 60) * (100 / 60)}
                tintColor="#6a1b9a"
                backgroundColor="#d3d3d3">
                {() => (
                    <Text style={styles.time}>
                        {new Date(seconds * 1000).toISOString().substr(11, 8)}
                    </Text>
                )}
            </CircularProgress>
            <Space heightClassName={'h-4'} />
            <View className="w-[85%] flex-row justify-between max-h-12 h-10">
                <TouchableOpacity
                    className={`w-[28%] p-2 justify-center items-center ${
                        isActive ? 'bg-[#2D1486]' : 'bg-[#CCCCCC] bg-opacity-30'
                    }`}
                    onPress={() => {
                        setIsActive(!isActive);
                    }}>
                    <Icon
                        name={isActive ? 'pause' : 'play'}
                        size={20}
                        color="white"
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    className={`w-[28%] p-2 justify-center items-center ${
                        !isActive
                            ? 'bg-[#2D1486]'
                            : 'bg-[#CCCCCC] bg-opacity-30'
                    }`}
                    disabled={isActive}
                    onPress={() => {
                        setSeconds(0);
                    }}>
                    <Icon name="refresh" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="w-[28%] bg-[#2D1486] p-2 justify-center items-center"
                    onPress={track}>
                    <Text className="text-base text-white font-bold">Lap</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
