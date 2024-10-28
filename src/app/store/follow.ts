import { create } from "zustand";

interface FollowState {
    followingIds: number[];
    addFollowing: (id: number) => void;
    removeFollowingId: (id: number) => void;
    setFollowingIds: (ids: number[]) => void;
}

export const useFollowStore = create<FollowState>((set) => ({
    followingIds: [],
    addFollowing: (id) =>
        set((state) => ({ followingIds: [...state.followingIds, id] })),
    removeFollowingId: (id) =>
        set((state) => ({
            followingIds: state.followingIds.filter(
                (followingId) => followingId !== id
            ),
        })),
    setFollowingIds: (ids) => set({ followingIds: ids }),
}));
