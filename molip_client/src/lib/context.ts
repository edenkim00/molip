import {createContext, useContext} from 'react';
import {Challenge} from '@pages/Challenge';
import ApiManager from '@api';

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

export type FetchChallengeCommand =
    | 'AllChallenges'
    | 'MyChallenges'
    | undefined;

export async function fetchChallengeData(
    uid: string,
    command: FetchChallengeCommand = undefined,
) {
    const {setAllChallenges, setMyChallenges} = useContext(MyDataContext);
    if (!command || command === 'AllChallenges') {
        const allChallengesFetched = await ApiManager.selectChallenges();
        setAllChallenges(allChallengesFetched);
    }
    if (!command || command === 'MyChallenges') {
        const myChallengesFetched = await ApiManager.selectUserChallenges(uid);
        setMyChallenges(myChallengesFetched);
    }
}
