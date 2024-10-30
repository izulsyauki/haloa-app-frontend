export interface UserProfile {
    username: string;
    user: User;
    profile: Profile;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    profile: Profile;
    createdAt: string;
    updatedAt: string;
    isFollowed: boolean; // Pastikan ini selalu ada
    follower?: Follow[];
    following?: Follow[];
    _count?: {
        follower: number;
        following: number;
    };
}

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

