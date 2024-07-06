export interface Challenge {
    id: number;
    name: string;
    description?: string;
    private: boolean;
    password?: string;
    creator_id: string;
    status: string;
    image_url?: string;
    joined_users_count: number;
}

export interface ChallengeRecrod {
    challengeId: number;
    start: number;
    end?: number;
}
