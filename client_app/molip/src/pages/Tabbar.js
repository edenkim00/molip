import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'; // 아이콘 라이브러리
// import Home from './main/A';
// import Settings from './main/B';
const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'ios-information-circle'
                            : 'ios-information-circle-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'ios-list-box' : 'ios-list';
                    }
                    // 다른 탭에 대한 아이콘도 설정할 수 있습니다.
                    return (
                        <Ionicons name={iconName} size={size} color={color} />
                    );
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
            }}>
            {/* <Tab.Screen name="Home" component={Home} /> */}
            {/* <Tab.Screen name="Settings" component={Settings} /> */}
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        // <NavigationContainer>
        <MyTabs />
        // </NavigationContainer>
    );
}
