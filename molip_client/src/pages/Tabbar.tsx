import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Svg, {Path} from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {View, Text, Button} from 'react-native';
import {PageProps} from './PageConfig';
import Home from './BottomTab/Home';
import Discover from './BottomTab/Discover';

function SettingsScreen({navigation, route}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('LoginPage')}
            />
            <Text>Settings!</Text>
        </View>
    );
}

interface TabbarInitialParams {
    userId: string;
    myChallenges: any;
    setMyChallenges: any;
    allChallenges: any;
    setAllChallenges: any;
}

type RootTabParamList = {
    Home: TabbarInitialParams;
    Discover: TabbarInitialParams;
    'My Profile': TabbarInitialParams;
};

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function App({navigation, route}: PageProps) {
    const {
        userId,
        refreshChallengeData,
        myChallenges,
        setMyChallenges,
        allChallenges,
        setAllChallenges,
    } = route.params ?? {};

    return (
        <BottomTab.Navigator
            screenOptions={{headerShown: false}}
            tabBar={props => <CustomTabBar {...props} />}>
            <BottomTab.Screen
                name="Home"
                component={Home}
                initialParams={{
                    userId,
                    myChallenges,
                    setMyChallenges,
                    allChallenges,
                    setAllChallenges,
                }}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />

            <BottomTab.Screen
                name="Discover"
                component={Discover}
                initialParams={{
                    userId,
                    myChallenges,
                    setMyChallenges,
                    allChallenges,
                    setAllChallenges,
                }}
                options={{
                    tabBarLabel: 'Discover',
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons
                            name={focused ? 'search' : 'search-outline'}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <BottomTab.Screen
                name="My Profile"
                component={SettingsScreen}
                initialParams={{
                    userId,
                    myChallenges,
                    setMyChallenges,
                    allChallenges,
                    setAllChallenges,
                }}
                options={{
                    tabBarLabel: 'My Profile',
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

export default App;

const CustomTabBar = ({
    state,
    descriptors,
    navigation,
}: {
    state: any;
    descriptors: any;
    navigation: any;
}) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#FFFFFF',
                height: 78,
            }}>
            <Svg
                height="100%"
                width="100%"
                viewBox="0 0 412 70"
                style={{position: 'absolute', top: 0}}>
                <Path
                    d="M0 15 L 206 0 L 412 15 L 412 78 L 0 78 Z"
                    fill="#342D5F"
                    stroke="none"
                />
            </Svg>

            {state.routes.map((route: any, index: number) => {
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={index}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: 12,
                        }}>
                        {options.tabBarIcon &&
                            options.tabBarIcon({
                                color: isFocused ? '#ffffff' : '#a9a9a9',
                                size: 24,
                                focused: isFocused,
                            })}
                        <Text
                            style={{
                                color: isFocused ? '#ffffff' : '#a9a9a9',
                                fontSize: 12,
                            }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};
