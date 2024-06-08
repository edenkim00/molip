import {jest} from '@jest/globals';
jest.mock('react-native-gesture-handler', () => {
    return {
        GestureHandlerRootView: 'GestureHandlerRootView',
    };
});
