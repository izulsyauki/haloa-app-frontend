export interface Profile {
    id: number;
    fullName: string | null;
    avatar: string | null;
    banner: string | null;
    bio: string | null;
    userId: number;
}

export interface Follow {
    follower?: {
        id: number;
        username: string;
        profile: Profile;
    };
    following?: {
        id: number;
        username: string;
        profile: Profile;
    };
    followerId: number;
    followingId: number;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    profile: Profile;
    createdAt: string;
    updatedAt: string;
    isFollowed: boolean;
    follower?: Follow[];    // User yang mengikuti
    following?: Follow[];   // User yang diikuti
    _count?: {
        follower: number;
        following: number;
    };
}
