import {createContext} from 'react';
import {Challenge} from '@pages/Challenge';

export const MyDataContext = createContext<MyData>({
    userId: undefined,
    setUserId: () => {},
    myChallenges: [],
    setMyChallenges: () => {},
    allChallenges: [],
    setAllChallenges: () => {},
});

export interface MyData {
    userId?: string;
    setUserId: (userId: string) => void;
    myChallenges: Challenge[];
    setMyChallenges: (challenges: Challenge[]) => void;
    allChallenges: Challenge[];
    setAllChallenges: (challenges: Challenge[]) => void;
}
