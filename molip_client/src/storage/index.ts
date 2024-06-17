import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from 'src/constants';

interface Auth {
    userId: string;
    jwtToken: string;
}

export default class Storage {
    static async get(key: string): Promise<any> {
        try {
            return await AsyncStorage.getItem(key);
        } catch (err) {
            console.log(err);
            return null;
        }
    }

    static async set(key: string, value: any) {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (err) {
            console.log(err);
        }
    }

    static async remove(key: string) {
        await AsyncStorage.removeItem(key);
    }
}
