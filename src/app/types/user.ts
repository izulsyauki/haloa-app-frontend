export interface User {
    id: number
    email: string;
    username: string;
    password: string;
    profile: Profile;
    dummyStatus: string;
    followers: number;
    following: number;
    isFollowed: boolean;
}

export interface Profile {
    fullName: string;
    address: string;
    profilePicture: string;
    bio: string;
}