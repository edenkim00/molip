import {createContext, useContext} from 'react';
import {Challenge} from '@pages/Challenge';
import ApiManager from '@api';
import {shuffleChallengeList} from './utils';

export const MyDataContext = createContext<MyData>({
    userId: undefined,
    setUserId: () => {},
    myChallenges: [],
    setMyChallenges: () => {},
    allChallenges: [],
    setAllChallenges: () => {},
    userProfile: undefined,
    setUserProfile: () => {},
});

export interface UserProfile {
    id: string;
    profile_image_url?: string;
}
export interface MyData {
    userId?: string;
    setUserId: (userId?: string) => void;
    myChallenges: Challenge[];
    setMyChallenges: (challenges: Challenge[]) => void;
    allChallenges: Challenge[];
    setAllChallenges: (challenges: Challenge[]) => void;
    userProfile?: UserProfile;
    setUserProfile: (userProfile: UserProfile | undefined) => void;
}

export type FetchChallengeCommand =
    | 'AllChallenges'
    | 'MyChallenges'
    | undefined;

export async function fetchChallengeData(
    uid: string,
    command: FetchChallengeCommand = undefined,
): Promise<{
    allChallengesFetched: Challenge[] | undefined;
    myChallengesFetched: Challenge[] | undefined;
}> {
    const res: {
        allChallengesFetched: Challenge[] | undefined;
        myChallengesFetched: Challenge[] | undefined;
    } = {
        allChallengesFetched: undefined,
        myChallengesFetched: undefined,
    };

    if (!command || command === 'AllChallenges') {
        const allChallengesFetched = await ApiManager.selectChallenges();
        res.allChallengesFetched = shuffleChallengeList(allChallengesFetched);
    }
    if (!command || command === 'MyChallenges') {
        const myChallengesFetched = await ApiManager.selectUserChallenges(uid);
        res.myChallengesFetched = shuffleChallengeList(myChallengesFetched);
    }
    return res;
}

export async function fetchUserProfile(): Promise<{
    id: string;
    profile_image_url?: string;
}> {
    return await ApiManager.getUserProfile();
}
