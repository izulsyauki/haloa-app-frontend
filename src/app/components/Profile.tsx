/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Spinner,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myIcons from "../assets/icons/myIcons";
import coverImg from "../assets/images/cover.png";
import { CustomBtnPrimary, CustomBtnSecondary } from "../components/CustomBtn";
import { useDeleteThread } from "../hooks/useDeleteThread";
import { useGetLoginUserProfile } from "../hooks/useGetLoginUserProfile";
import { useGetUserThreads } from "../hooks/useGetUserThreads";
import { useHandleEditProfile } from "../hooks/useHandleEditProfile";
import { useHandleLike } from "../hooks/useHandleLike";
import { Thread } from "../types/thread";
import { formatDate } from "../utils/fomatDate";

export function Profile() {
    const { userProfile } = useGetLoginUserProfile();
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const galleryButtonBg = useColorModeValue("white", "#2d3748");
    const [view, setView] = useState<"all" | "media">("all");
    const outlineColor = useColorModeValue("white", "#2d3748");
    const userThreads = useGetUserThreads();
    const navigate = useNavigate();
    const {
        handleToggleDelete,
        handleDelete,
        openDeleteId,
        deleteThreadMutation,
    } = useDeleteThread();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const {
        isOpen: isImageOpen,
        onOpen: onImageOpen,
        onClose: onImageClose,
    } = useDisclosure();
    const { mutateAsyncLike } = useHandleLike();

    // handle untuk edit profile
    const {
        isEditProfileOpen,
        handleEditProfileOpen,
        handleEditProfileClose,
        handleInputChange,
        handleSaveProfile,
    } = useHandleEditProfile();

    //filter user berdasarkan view
    const filteredThreads = userThreads.data?.filter((thread) => {
        if (view === "all") {
            return thread;
        } else if (view === "media") {
            return thread.media && thread.media.length > 0;
        }
        return false;
    });

    return (
        <Box w={"100%"}>
            <Box p={"0px 1rem"}>
                <Flex w={"100%"} justifyContent={"space-between"} mb={"10px"}>
                    <Text fontSize={"18px"} fontWeight={"bold"}>
                        My Profile
                    </Text>
                </Flex>
                <Flex flexDir={"column"} justifyContent={"flex-end"}>
                    <Box position={"relative"}>
                        <Image
                            src={userProfile?.profile?.banner ?? coverImg}
                            alt="Cover Image"
                            h={"120px"}
                            w={"100%"}
                            objectFit={"cover"}
                            borderRadius={"10px"}
                        />
                        <Avatar
                            name="Profile Avatar"
                            size={"lg"}
                            src={userProfile?.profile?.avatar ?? undefined}
                            position={"absolute"}
                            left={"25px"}
                            bottom={"-35px"}
                            outline={"3px solid"}
                            outlineColor={outlineColor}
                        />
                    </Box>
                    <CustomBtnSecondary
                        fontSize={"12px"}
                        fontWeight={"medium"}
                        p={"6px 12px"}
                        h={"fit-content"}
                        ms={"auto"}
                        label="Edit Profile"
                        marginY={"12px"}
                        onClick={handleEditProfileOpen}
                    />

                    {/* modal edit profile */}
                    <Modal
                        isOpen={isEditProfileOpen}
                        onClose={handleEditProfileClose}
                    >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader fontSize={"18px"} p={"10px 15px"}>
                                Edit Profile
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody
                                as={Flex}
                                flexDir={"column"}
                                pt={"0px"}
                                p={"0px 15px"}
                                gap={"10px"}
                                alignItems={"flex-start"}
                            >
                                <Box
                                    w={"100%"}
                                    position={"relative"}
                                    mb={"30px"}
                                >
                                    <Image
                                        src={
                                            userProfile?.profile?.banner ||
                                            coverImg
                                        }
                                        alt="Cover Image"
                                        h={"100px"}
                                        objectFit={"cover"}
                                        borderRadius={"10px"}
                                        w={"100%"}
                                    />
                                    <Avatar
                                        name="Profile Avatar"
                                        src={
                                            userProfile?.profile?.avatar ??
                                            undefined
                                        }
                                        position={"absolute"}
                                        left={"30px"}
                                        bottom={"-30px"}
                                        size={"lg"}
                                        outline={"3px solid"}
                                        outlineColor={outlineColor}
                                    />
                                    <Button
                                        position={"absolute"}
                                        left={"48px"}
                                        bottom={"-13px"}
                                        p={"0px"}
                                        m={"0px"}
                                        borderRadius={"100px"}
                                        w={"28px"}
                                        h={"28px"}
                                        minW={"28px"}
                                        bg={galleryButtonBg}
                                        _hover={{
                                            bg: galleryButtonBg,
                                        }}
                                    >
                                        <Image
                                            src={myIcons.GalleryAdd}
                                            w={"18px"}
                                            h={"18px"}
                                            m={"0px"}
                                            p={"0px"}
                                        />
                                    </Button>
                                </Box>
                                <VStack
                                    w={"100%"}
                                    alignItems={"flex-start"}
                                    gap={"5px"}
                                >
                                    <Text
                                        fontSize={"14px"}
                                        fontWeight={"medium"}
                                        textAlign={"start"}
                                    >
                                        Full Name
                                    </Text>
                                    <Input
                                        defaultValue={`${userProfile?.profile?.fullName}`}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "fullName",
                                                e.target.value
                                            )
                                        }
                                    />
                                </VStack>
                                <VStack
                                    w={"100%"}
                                    alignItems={"flex-start"}
                                    gap={"5px"}
                                >
                                    <Text
                                        fontSize={"14px"}
                                        fontWeight={"medium"}
                                        textAlign={"start"}
                                    >
                                        Username
                                    </Text>
                                    <Input
                                        defaultValue={userProfile?.username}
                                        onChange={(e) =>
                                            handleInputChange(
                                                "username",
                                                e.target.value
                                            )
                                        }
                                    />
                                </VStack>
                                <VStack
                                    w={"100%"}
                                    alignItems={"flex-start"}
                                    gap={"5px"}
                                >
                                    <Text
                                        fontSize={"14px"}
                                        fontWeight={"medium"}
                                        textAlign={"start"}
                                    >
                                        Bio
                                    </Text>
                                    <Textarea
                                        resize={"none"}
                                        defaultValue={
                                            userProfile?.profile?.bio ?? ""
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                "bio",
                                                e.target.value
                                            )
                                        }
                                    />
                                </VStack>
                            </ModalBody>

                            <ModalFooter
                                alignItems={"center"}
                                justifyContent={"flex-end"}
                                gap={"10px"}
                                w={"300px"}
                                alignSelf={"flex-end"}
                            >
                                <CustomBtnPrimary
                                    label="Save"
                                    m={"0px"}
                                    p={"10px 20px"}
                                    w={"fit-content"}
                                    h={"fit-content"}
                                    fontSize={"14px"}
                                    onClick={handleSaveProfile}
                                />
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
                <Stack spacing="1">
                    <Heading size="md">
                        ✨{userProfile?.profile?.fullName}✨
                    </Heading>
                    <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                        @{userProfile?.username}
                    </Text>
                    <Text fontSize={"14px"}>{userProfile?.profile?.bio}</Text>
                    <HStack spacing={2}>
                        <HStack spacing={1}>
                            <Text fontWeight={"bold"} fontSize={"14px"}>
                                {userProfile?._count?.following}
                            </Text>
                            <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                                Following
                            </Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Text fontWeight={"bold"} fontSize={"14px"}>
                                {userProfile?._count?.follower}
                            </Text>
                            <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                                Followers
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>
            <HStack w={"100%"} gap={"0px"}>
                <CustomBtnSecondary
                    label="All"
                    variant={"ghost"}
                    borderRadius={"none"}
                    w={"50%"}
                    borderBottom={"1px solid #3F3F3F"}
                    onClick={() => setView("all")}
                    position={"relative"}
                    _after={{
                        content: '""',
                        position: "absolute",
                        bottom: "0px",
                        left: "10px",
                        width: "94%",
                        height: view === "all" ? "3px" : "0",
                        backgroundColor:
                            view === "all" ? "blue.500" : "transparent",
                    }}
                />
                <CustomBtnSecondary
                    label="Media"
                    variant={"ghost"}
                    borderRadius={"none"}
                    w={"50%"}
                    borderBottom={"1px solid #3F3F3F"}
                    onClick={() => setView("media")}
                    position={"relative"}
                    _after={{
                        content: '""',
                        position: "absolute",
                        bottom: "0px",
                        left: "10px",
                        width: "94%",
                        height: view === "media" ? "3px" : "0",
                        backgroundColor:
                            view === "media" ? "blue.500" : "transparent",
                    }}
                />
            </HStack>

            {/* Content threads / feeds */}
            {userThreads.isLoading ? (
                <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    p={4}
                    w={"100%"}
                    h={"75%"}
                >
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        size="lg"
                    />
                </Box>
            ) : (
                filteredThreads?.map((thread: Thread) => (
                    <Box
                        key={thread.id}
                        w={"100%"}
                        h={"fit-content"}
                        borderRadius={"none"}
                        justifyContent={"flex-start"}
                        borderBottom={"1px solid #3F3F3F"}
                        p={"0px"}
                        m={"0px"}
                    >
                        <Flex padding="1rem" gap={"15px"}>
                            <Link
                                to={`/detail/${thread.id}`}
                                key={thread.id}
                                style={{ cursor: "pointer" }}
                            >
                                <Avatar
                                    name="Other Profile Avatar"
                                    src={
                                        thread.user.profile.avatar || undefined
                                    }
                                    size={"sm"}
                                />
                            </Link>
                            <VStack
                                w={"100%"}
                                spacing={1}
                                alignItems={"start"}
                                fontWeight={"normal"}
                            >
                                <HStack spacing={1} pb={"3px"} w={"100%"}>
                                    <Link
                                        to={`/detail/${thread.id}`}
                                        key={thread.id}
                                        style={{
                                            cursor: "pointer",
                                            width: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            gap: "5px",
                                        }}
                                    >
                                        <Heading size={"sm"} fontSize={"14px"}>
                                            {thread.user.profile.fullName ??
                                                "Nama pengguna"}
                                        </Heading>
                                        <Text
                                            color={fontColor}
                                            fontSize={"14px"}
                                        >
                                            @{thread.user.username}
                                        </Text>
                                        <Text
                                            color={fontColor}
                                            fontSize={"14px"}
                                            mt={"-2px"}
                                        >
                                            {" "}
                                            •{" "}
                                        </Text>
                                        <Text
                                            color={fontColor}
                                            fontSize={"14px"}
                                        >
                                            {formatDate(thread.createdAt)}
                                        </Text>
                                    </Link>
                                    <Spacer />

                                    {/* toggle delete thread */}
                                    {thread.user.id === userProfile?.id && (
                                        <Flex
                                            flexDirection={"column"}
                                            gap={1}
                                            position={"relative"}
                                        >
                                            <Box
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            >
                                                <myIcons.HiDotsHorizontal
                                                    fontSize={"18px"}
                                                    cursor={"pointer"}
                                                    onClick={(e) =>
                                                        handleToggleDelete(
                                                            e,
                                                            thread.id
                                                        )
                                                    }
                                                />
                                            </Box>
                                            {openDeleteId === thread.id && (
                                                <Box
                                                    position="absolute"
                                                    top={4}
                                                    right={1}
                                                    zIndex={10}
                                                >
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(
                                                                thread.id
                                                            );
                                                        }}
                                                        isLoading={
                                                            deleteThreadMutation.isPending
                                                        }
                                                        size="sm"
                                                        colorScheme="red"
                                                        variant="ghost"
                                                        borderRadius={"none"}
                                                        fontWeight={"normal"}
                                                    >
                                                        Delete
                                                    </Button>
                                                </Box>
                                            )}
                                        </Flex>
                                    )}
                                </HStack>

                                <Link
                                    to={`/detail/${thread.id}`}
                                    key={thread.id}
                                    style={{
                                        cursor: "pointer",
                                        width: "100%",
                                    }}
                                >
                                    <Text
                                        fontSize={"13px"}
                                        p={"5px 0px"}
                                        fontWeight={"normal"}
                                    >
                                        {thread.content}
                                    </Text>
                                </Link>

                                {/* Preview post images */}
                                {thread.media.length > 0 && (
                                    <Flex
                                        flexWrap="wrap"
                                        gap={1}
                                        sx={{
                                            "& > div": {
                                                flex: `1 1 ${
                                                    thread.media.length === 1
                                                        ? "100%"
                                                        : thread.media
                                                              .length === 2
                                                        ? "45%"
                                                        : thread.media.length >=
                                                          3
                                                        ? "30%"
                                                        : "auto"
                                                }`,
                                            },
                                        }}
                                    >
                                        {thread.media.map((media, index) => (
                                            <Box
                                                key={index}
                                                position="relative"
                                                _hover={{
                                                    "&::before": {
                                                        content: '""',
                                                        position: "absolute",
                                                        top: 0,
                                                        left: 0,
                                                        right: 0,
                                                        bottom: 0,
                                                        bg: "blackAlpha.600",
                                                        zIndex: 1,
                                                        borderRadius: "md",
                                                    },
                                                    ".view-text": {
                                                        opacity: 1,
                                                    },
                                                }}
                                                cursor="pointer"
                                                onClick={() => {
                                                    setSelectedImage(media.url);
                                                    onImageOpen();
                                                }}
                                            >
                                                <Image
                                                    src={media.url}
                                                    alt={`User post image ${
                                                        index + 1
                                                    }`}
                                                    w="100%"
                                                    h="200px"
                                                    objectFit="cover"
                                                />
                                                <Text
                                                    className="view-text"
                                                    position="absolute"
                                                    top="50%"
                                                    left="50%"
                                                    transform="translate(-50%, -50%)"
                                                    color="white"
                                                    fontSize="lg"
                                                    fontWeight="bold"
                                                    opacity={0}
                                                    zIndex={2}
                                                    transition="opacity 0.2s"
                                                >
                                                    View
                                                </Text>
                                            </Box>
                                        ))}
                                    </Flex>
                                )}

                                <HStack
                                    spacing={1}
                                    marginY={"5px"}
                                    color={fontColor}
                                    fontSize={"13px"}
                                >
                                    <HStack spacing={1}>
                                        <Button
                                            variant={"ghost"}
                                            padding={"5px 10px"}
                                            margin={"0px"}
                                            h={"fit-content"}
                                            onClick={() =>
                                                mutateAsyncLike.mutate(
                                                    thread.id
                                                )
                                            }
                                            fontWeight={"normal"}
                                            fontSize={"14px"}
                                            color={fontColor}
                                            gap={"5px"}
                                        >
                                            {thread.isLiked ? (
                                                <myIcons.HiHeart
                                                    fontSize={"22px"}
                                                    color={"#f87171"}
                                                />
                                            ) : (
                                                <myIcons.HiOutlineHeart
                                                    fontSize={"22px"}
                                                    color={fontColor}
                                                />
                                            )}
                                            <Text>{thread._count.like}</Text>
                                        </Button>
                                    </HStack>

                                    <HStack spacing={1}>
                                        <Button
                                            variant={"ghost"}
                                            padding={"5px 10px"}
                                            margin={"0px"}
                                            h={"fit-content"}
                                            onClick={() =>
                                                navigate(`/detail/${thread.id}`)
                                            }
                                            fontWeight={"normal"}
                                            fontSize={"14px"}
                                            color={fontColor}
                                            gap={"5px"}
                                        >
                                            <myIcons.HiOutlineAnnotation
                                                fontSize={"22px"}
                                            />
                                            <Text>{thread._count.replies}</Text>
                                            <Text>Replies</Text>
                                        </Button>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Flex>
                    </Box>
                ))
            )}

            {/* Modal image preview */}
            <Modal isOpen={isImageOpen} onClose={onImageClose} size="xl">
                <ModalOverlay />
                <ModalContent bg="transparent" boxShadow="none">
                    <ModalCloseButton color="white" />
                    <ModalBody p={0}>
                        {selectedImage && (
                            <Image
                                src={selectedImage}
                                alt="Preview"
                                w="100%"
                                objectFit="contain"
                            />
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>

            {/* <Stack>
                {filteredPost.map((post, index) => (
                    <Box
                        key={index}
                        w={"100%"}
                        h={"fit-content"}
                        borderRadius={"none"}
                        justifyContent={"flex-start"}
                        borderBottom={"1px solid #3F3F3F"}
                        p={"0px"}
                        m={"0px"}
                    >
                        <Flex padding="1rem" gap={"15px"}>
                            <Avatar
                                name="Profile Avatar"
                                src={userProfile?.profile?.avatar ?? undefined}
                                size={"sm"}
                            />
                            <VStack
                                w={"100%"}
                                spacing={1}
                                alignItems={"start"}
                                fontWeight={"normal"}
                            >
                                <HStack spacing={1} pb={"3px"}>
                                    <Heading size={"sm"} fontSize={"14px"}>
                                        {userProfile?.profile?.fullName}
                                    </Heading>
                                    <Text color={fontColor} fontSize={"14px"}>
                                        @{userProfile?.username}
                                    </Text>
                                    <Text
                                        color={fontColor}
                                        fontSize={"14px"}
                                        mt={"-2px"}
                                    >
                                        {" "}
                                        •{" "}
                                    </Text>
                                    <Text color={fontColor} fontSize={"14px"}>
                                        4h
                                    </Text>
                                </HStack>
                                <Text
                                    fontSize={"13px"}
                                    p={"5px 0px"}
                                    fontWeight={"normal"}
                                >
                                    {post.post}
                                </Text>
                                {post.imageUrl && (
                                    <Image
                                        src={post.imageUrl}
                                        alt="User post image"
                                        borderRadius={"md"}
                                        boxSize={"full"}
                                    />
                                )}
                                <HStack
                                    spacing={5}
                                    marginY={"5px"}
                                    color={fontColor}
                                    fontSize={"14px"}
                                >
                                    <HStack spacing={1}>
                                        <myIcons.HiOutlineHeart
                                            fontSize={"22px"}
                                            color={fontColor}
                                        />
                                        <Text>
                                            {Math.floor(Math.random() * 900) +
                                                100}
                                        </Text>
                                    </HStack>
                                    <HStack spacing={1}>
                                        <myIcons.HiOutlineAnnotation
                                            fontSize={"22px"}
                                        />
                                        <Text>
                                            {Math.floor(Math.random() * 90) +
                                                10}
                                        </Text>
                                        <Text>Replies</Text>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Flex>
                    </Box>
                ))}
            </Stack> */}
        </Box>
    );
}
