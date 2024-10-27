import { User } from "./user";

export interface Thread {
    id: number;
    content: string;
    user: User;
    created_at: string;
    media: {
        url: string;
    }[];
    _count: {
        like: number;
    };
    isLiked: boolean;
    // tambahkan properti lain sesuai dengan respons API Anda
}