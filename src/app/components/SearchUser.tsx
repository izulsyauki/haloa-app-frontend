import {
    Avatar,
    Box,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    Spinner,
} from "@chakra-ui/react";
import myIcons from "../assets/icons/myIcons";
import { useHandleFollowUser } from "../hooks/useHandleFollowUser";
import { useSearchUser } from "../hooks/useSearchUser";
import { CustomBtnPrimary, CustomBtnSecondary } from "./CustomBtn";

export function SearchUser() {
    const { register, watch, users, isLoading } = useSearchUser();
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const { isOpen, onClose, selectedUser, handleFollowClick, handleUnfollow } =
        useHandleFollowUser();

    return (
        <Box p={"0px 1rem"}>
            <InputGroup variant={"filled"}>
                <InputLeftElement pointerEvents="none">
                    <myIcons.HiOutlineSearchCircle fontSize={"24px"} />
                </InputLeftElement>
                <Input
                    type="text"
                    placeholder="Search your friends"
                    borderRadius={"full"}
                    {...register("search")}
                />
            </InputGroup>
            {!watch("search") ? (
                <Flex
                    w={"100%"}
                    h={"500px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Box textAlign={"center"} w={"400px"}>
                        <Heading size={"md"}>
                            Write and search something
                        </Heading>
                        <Text>
                            Try searching for something else or check the
                            spelling of what you typed.
                        </Text>
                    </Box>
                </Flex>
            ) : isLoading ? (
                <Flex
                    w={"100%"}
                    h={"500px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Spinner />
                </Flex>
            ) : (
                <>
                    {!users.length ? (
                        <Flex
                            w={"100%"}
                            h={"500px"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            <Box textAlign={"center"} w={"400px"}>
                                <Heading size={"md"}>
                                    No results for "{watch("search")}"
                                </Heading>
                                <Text>
                                    Try searching for something else or check
                                    the spelling of what you typed.
                                </Text>
                            </Box>
                        </Flex>
                    ) : (
                        <>
                            {users.map((user) => (
                                <Box key={user.id} padding={"10px 0px"}>
                                    <Flex
                                        gap={"15px"}
                                        fontSize={"12px"}
                                        alignItems={"center"}
                                    >
                                        <Avatar
                                            src={user.profile.avatar || undefined}
                                            h={"36px"}
                                            w={"36px"}
                                        />
                                        <Box flex={5} gap={"10px"}>
                                            <Text fontWeight={"medium"}>
                                                {user.profile.fullName}
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
                                            onClick={() => handleFollowClick(user, users, setUsers)}
                                            label={user.isFollowed ? "Following" : "Follow"}
                                        />
                                    </Flex>
                                    <Text fontSize={"12px"} ml={"52px"}>
                                        {user.profile.bio}
                                    </Text>
                                </Box>
                            ))}
                        </>
                    )}
                </>
            )}
            {selectedUser && (
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
                                {selectedUser.profile.fullName}?
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
                                onClick={() =>
                                    handleUnfollow(
                                        users,
                                        setUsers
                                    )
                                }
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
            )}
        </Box>
    );
}
