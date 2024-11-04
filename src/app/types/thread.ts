import { Profile, User } from "./user";

export interface Thread {
    id: number;
    content: string;
    user: User;
    profile: Profile;
    createdAt: string;
    media: ThreadMedia[];
    _count: {
        like: number;
        replies: number;
    };
    isLiked: boolean;
    replies: Thread[];
}

export interface ThreadMedia {
    id: number;
    url: string;
    threadId: number;
}

export interface CreateThreadRequest {
    content: string;
    media?: File[];
}

export interface ThreadDetail extends Thread {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    _count: {
        replies: number;
        like: number;
    };
    replies: ThreadDetail[];
}
