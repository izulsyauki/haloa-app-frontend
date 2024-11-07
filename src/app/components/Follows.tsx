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
import { useState } from "react";
import { CustomBtnPrimary, CustomBtnSecondary } from "../components/CustomBtn";
import { useGetFollows } from "../hooks/follows/useGetFollows";
import { useHandleFollowUser } from "../hooks/follows/useHandleFollowUser";
import { useFollowStore } from '../store/follow';
import { Follow, FollowUser } from "../types/user";

interface FollowsProps {
    followers: Follow[];
    following: Follow[];
    isLoading: boolean;
}

export function Follows() {
    const [view, setView] = useState<"followers" | "following">("followers");
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const { isOpen, onClose, selectedUser, handleFollowClick, handleUnfollow } =
        useHandleFollowUser();
    const { followers = [], following = [] } = useGetFollows() as unknown as FollowsProps;
    const followingIds = useFollowStore((state) => state.followingIds);

    const followersWithStatus = followers.map((follow) => {
        return {
            id: follow.follower?.id || 0,
            username: follow.follower?.username || '',
            profile: follow.follower?.profile,
            isFollowed: followingIds.includes(follow.follower?.id || 0)
        };
    }).filter(user => user.id !== 0) as FollowUser[];

    const followingWithStatus = following.map((follow) => ({
        id: follow.following?.id || 0,
        username: follow.following?.username || '',
        profile: follow.following?.profile,
        isFollowed: true
    })).filter(user => user.id !== 0) as FollowUser[];

    const filteredUsers = view === "followers" ? followersWithStatus : followingWithStatus;

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
                                src={user.profile?.avatar || ""}
                                h={"36px"}
                                w={"36px"}
                            />
                            <Box flex={5} gap={"10px"}>
                                <Text fontWeight={"medium"}>
                                    {user.profile?.fullName}
                                </Text>
                                <Text color={fontColor}>
                                    @{user.username}
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
                            {user.profile?.bio || ""}
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
                                    onClick={handleUnfollow}
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
