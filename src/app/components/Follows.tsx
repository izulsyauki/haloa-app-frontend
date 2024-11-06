import {
    Avatar,
    Box,
    Flex,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getFollowers, getFollowing } from "../api/follow";
import { CustomBtnPrimary, CustomBtnSecondary } from "../components/CustomBtn";
import { useHandleFollowUser } from "../hooks/useHandleFollowUser";
import { useFollowStore } from '../store/follow';
import { User } from "../types/user";

export function Follows() {
    // const { user: loggedInUser } = useAuthStore();
    // const [suggestedUser, setSuggestedUser] = useState<User[]>(fakeUsers as User[]);
    const [view, setView] = useState<"followers" | "following">("followers");
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const { isOpen, onClose, selectedUser, handleFollowClick, handleUnfollow } =
        useHandleFollowUser();
    const [followers, setFollowers] = useState<User[]>([]);
    const [following, setFollowing] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const followingIds = useFollowStore((state) => state.followingIds);
    const setFollowingIds = useFollowStore((state) => state.setFollowingIds);

    useEffect(() => {
        const fetchFollowData = async () => {
            try {
                setIsLoading(true);
                const [followersData, followingData] = await Promise.all([
                    getFollowers(),
                    getFollowing()
                ]);
                
                // Update followingIds di store
                const followingIds = followingData.map((user: User) => user.id);
                setFollowingIds(followingIds);
                
                // Update data dengan status isFollowed yang benar
                const followersWithStatus = followersData.map((user: User) => ({
                    ...user,
                    isFollowed: followingIds.includes(user.id)
                }));
                
                const followingWithStatus = followingData.map((user: User) => ({
                    ...user,
                    isFollowed: true // Following selalu true
                }));

                setFollowers(followersWithStatus);
                setFollowing(followingWithStatus);
            } catch (error) {
                console.error("Error fetching follow data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFollowData();
    }, [setFollowingIds]);

    const filteredUsers = view === "followers" ? followers : following;

    return (
        <Box w={"100%"}>
            <Box p={"0px 1rem"} mb={"10px"}>
                <Text fontSize={"18px"} fontWeight={"bold"}>
                    Follows
                </Text>
            </Box>
            <HStack w={"100%"} gap={"0px"}>
                <CustomBtnSecondary
                    label="Followers"
                    variant={"ghost"}
                    borderRadius={"none"}
                    w={"50%"}
                    borderBottom={"1px solid #3F3F3F"}
                    onClick={() => setView("followers")}
                    position={"relative"}
                    _after={{
                        content: '""',
                        position: "absolute",
                        bottom: "0px",
                        left: "10px",
                        width: "94%",
                        height: view === "followers" ? "3px" : "0",
                        backgroundColor:
                            view === "followers" ? "blue.500" : "transparent",
                    }}
                />
                <CustomBtnSecondary
                    label="Following"
                    variant={"ghost"}
                    borderRadius={"none"}
                    w={"50%"}
                    borderBottom={"1px solid #3F3F3F"}
                    onClick={() => setView("following")}
                    position={"relative"}
                    _after={{
                        content: '""',
                        position: "absolute",
                        bottom: "0px",
                        left: "10px",
                        width: "94%",
                        height: view === "following" ? "3px" : "0",
                        backgroundColor:
                            view === "following" ? "blue.500" : "transparent",
                    }}
                />
            </HStack>
            <Stack spacing="3" p={"1rem"}>
                {filteredUsers.map((user) => (
                    <Box key={user.id}>
                        <Flex
                            gap={"15px"}
                            fontSize={"12px"}
                            alignItems={"center"}
                        >
                            <Avatar
                                src={view === "followers" ? user.follower?.profile.avatar : user.following?.profile.avatar || ""}
                                h={"36px"}
                                w={"36px"}
                            />
                            <Box flex={5} gap={"10px"}>
                                <Text fontWeight={"medium"}>
                                    {view === "followers"
                                        ? user.follower?.profile.fullName
                                        : user.following?.profile.fullName}
                                </Text>
                                <Text color={fontColor}>
                                    @{view === "followers" ? user.follower?.username : user.following?.username}
                                </Text>
                            </Box>
                            <CustomBtnSecondary
                                p={"6px 12px"}
                                h={"fit-content"}
                                fontSize={"12px"}
                                fontWeight={"medium"}
                                onClick={() => handleFollowClick(user)}
                                label={user.isFollowed ? "Following" : "Follow"}
                            />
                        </Flex>
                        <Text fontSize={"12px"} ml={"52px"}>
                            {view === "followers"
                                ? user.follower?.profile.bio
                                : user.following?.profile.bio || ""}
                        </Text>
                    </Box>
                ))}
            </Stack>

            {/* Modal unfollow */}
            {selectedUser && (
                <>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>
                                Unfollow @{selectedUser.username}?
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Text>
                                    Are you sure want to unfollow{" "}
                                    {selectedUser?.profile?.fullName || selectedUser?.username}?
                                </Text>
                            </ModalBody>

                            <ModalFooter
                                alignItems={"center"}
                                justifyContent={"flex-end"}
                                gap={"10px"}
                                w={"300px"}
                                alignSelf={"flex-end"}
                            >
                                <CustomBtnSecondary
                                    label="Unfollow"
                                    onClick={() => handleUnfollow(selectedUser.id)}
                                    m={"0px"}
                                    w={"fit-content"}
                                    h={"fit-content"}
                                    fontSize={"14px"}
                                />
                                <CustomBtnPrimary
                                    label="Close"
                                    m={"0px"}
                                    p={"10px 20px"}
                                    w={"fit-content"}
                                    h={"fit-content"}
                                    fontSize={"14px"}
                                    onClick={onClose}
                                />
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            )}
        </Box>
    );
}
