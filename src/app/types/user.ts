import { Thread } from "./thread";

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
    threads: Thread[];
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
    id: number;
    followerId: number;
    followingId: number;
    follower?: {
        id: number;
        username: string;
        profile: {
            fullName: string;
            bio: string;
            avatar: string;
        };
    };
    following?: {
        id: number;
        username: string;
        profile: {
            fullName: string;
            bio: string;
            avatar: string;
        };
    };
}

export interface FollowUser {
    id: number;
    username: string;
    profile?: {
        fullName: string;
        bio: string;
        avatar: string;
    };
    isFollowed: boolean;
}
