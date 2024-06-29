import {Challenge} from '@pages/Challenge';

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function shuffleChallengeList(list: Challenge[]): Challenge[] {
    return list.sort(() => Math.random() - 0.5);
}
