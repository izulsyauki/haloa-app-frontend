import { User } from "./user";

export interface Thread {
    id: number;
    content: string;
    user: User;
    createdAt: string;
    media: ThreadMedia[];
    _count: {
        like: number;
        replies: number;
    };
    isLiked: boolean;
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