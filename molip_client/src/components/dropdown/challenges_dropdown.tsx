import React, {useEffect, useState, useRef} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    FlatList,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import Icon from 'react-native-vector-icons/Ionicons';

interface Challenge {
    id: number;
    name: string;
    description?: string;
    private: boolean;
    password?: string;
    creator_id: string;
    status: string;
    joined_users_count: number;
}

export function ChallengesDropdown({challenges}: {challenges: Challenge[]}) {
    const filtered = challenges.filter(
        challenge => challenge.status !== 'deleted',
    );

    const [query, setQuery] = useState<string>('');
    const [selectedChallenge, setSelectedChallenge] =
        useState<Challenge | null>(null);
    const [filteredData, setFilteredData] = useState<Challenge[]>(filtered);
    const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
    const inputRef = useRef<TextInput>(null);

    const [queryTextColorClassName, setQueryTextColorClassName] =
        useState('text-gray-500');

    const refreshFilteredData = (query: string) => {
        if (query?.length === 0) {
            setFilteredData(
                challenges.filter(challenge => challenge.status !== 'deleted'),
            );
        } else {
            setFilteredData(
                challenges.filter(challenge =>
                    challenge.name.toLowerCase().includes(query.toLowerCase()),
                ),
            );
        }
    };

    const handleInputChange = (text: string) => {
        setQuery(text);
        refreshFilteredData(text);
        if (!text) {
            setIsDropdownVisible(false);
        } else {
            setIsDropdownVisible(true);
        }
    };

    const handleDropdownToggle = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };

    const handleOutsidePress = () => {
        setIsDropdownVisible(false);

        if (!selectedChallenge) {
            setQueryTextColorClassName('text-gray-500');
            setQuery('');
        }

        Keyboard.dismiss();
    };

    const handleItemPress = (item: Challenge) => {
        setQuery(item.name);
        setFilteredData([]);
        setIsDropdownVisible(false);
        setSelectedChallenge(item);
        setQueryTextColorClassName('text-black');
    };

    useEffect(() => {
        if (!isDropdownVisible) {
            setFilteredData([]);
            return;
        }
        refreshFilteredData(query);
    }, [isDropdownVisible]);

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View className="flex w-full items-center justify-center max-h-24">
                <View className="relative">
                    <View className="flex-row items-center border rounded-3xl px-4 pb-3 pt-2 justify-center ">
                        <TextInput
                            className={`w-full text-sm ${queryTextColorClassName}`}
                            value={query}
                            onChangeText={handleInputChange}
                            onFocus={() => setIsDropdownVisible(true)}
                            placeholder="Enter your challenge name"
                            ref={inputRef}
                        />
                        <TouchableOpacity
                            onPress={handleDropdownToggle}
                            className="absolute right-3">
                            <Icon
                                name={
                                    isDropdownVisible
                                        ? 'chevron-up-outline'
                                        : 'chevron-down-outline'
                                }
                                size={18}
                            />
                        </TouchableOpacity>
                    </View>
                    {isDropdownVisible && filteredData?.length !== 0 && (
                        <View className="absolute top-full right-0 border rounded-3xl pt-1 px-2 bg-white z-50 w-full max-h-60">
                            <FlatList
                                scrollEnabled
                                data={filteredData}
                                renderItem={({
                                    item,
                                    index,
                                }: {
                                    item: Challenge;
                                    index: number;
                                }) => (
                                    <View className="w-full flex-row justify-center">
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleItemPress(item)
                                            }
                                            className={`border-gray-400 rounded-3 w-[95%] ${
                                                index < filteredData.length - 1
                                                    ? 'border-b'
                                                    : ''
                                            }`}>
                                            <Text className="px-2 py-2.5 text-md">
                                                {item.name}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item: Challenge) =>
                                    item.id.toString()
                                }
                                className=""
                                nestedScrollEnabled
                            />
                        </View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
