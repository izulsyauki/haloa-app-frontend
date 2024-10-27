export interface User {
        id: number;
        email: string;
        username: string;
        password: string;
        profile: {
            profile: any;
            username: string;
            avatar: string | null;
            banner: string | null;
            bio: string | null;
            fullName: string | null;
            id: number;
            userId: number;
        };
        createdAt: string;
        updatedAt: string;
}
