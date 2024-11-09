/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Spacer,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import myIcons from "../assets/icons/myIcons";
import coverImg from "../assets/images/cover.png";
import { useHandleLike } from "../hooks/threads/useHandleLike";
import { useGetUserDetail } from "../hooks/user/useGetUserDetail";
import { Thread } from "../types/thread";
import { formatDate } from "../utils/fomatDate";
import { CustomBtnSecondary } from "./CustomBtn";
import { useGetOtherUserThreads } from "../hooks/threads/useGetOtherUserThreads";

export function DetailProfile() {
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const [view, setView] = useState<"all" | "media">("all");
    const outlineColor = useColorModeValue("white", "#2d3748");
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const {
        isOpen: isImageOpen,
        onOpen: onImageOpen,
        onClose: onImageClose,
    } = useDisclosure();
    const { mutateAsyncLike } = useHandleLike();
    const { id } = useParams();
    const { data: userDetail, isLoading } = useGetUserDetail(Number(id));
    const { otherUserThreadQuery } = useGetOtherUserThreads(Number(id));

    console.log("Current userDetail data:", userDetail);

    const filteredOtherUserThreads = otherUserThreadQuery?.filter((thread: Thread) => {
        if (view === "all") {
            return true;
        } else if (view === "media") {
            return thread.media && thread.media.length > 0;
        }
        return false;
    })

    if (isLoading) {
        return (
            <Box
                w="100%"
                h="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    size="lg"
                />
            </Box>
        );
    }

    if (!userDetail) {
        return (
            <Box
                w="100%"
                h="100vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Text>User not found</Text>
            </Box>
        );
    }

    return (
        <Box w={"100%"}>
            <Box p={"0px 1rem"}>
                {/* Profile Header */}
                <Flex w={"100%"} justifyContent={"flex-start"} alignItems={"center"} mb={"10px"}>
                    <Button
                        variant={"ghost"}
                        p={"0px"}
                        m={"0px"}
                        ml={"-10px"}
                        borderRadius={"0px"}
                        onClick={() => navigate(-1)}
                    >
                        <myIcons.HiArrowLeft fontSize={"20px"} />
                    </Button>
                    <Text fontSize={"18px"} fontWeight={"bold"}>
                        User Profile
                    </Text>
                </Flex>
                <Flex flexDir={"column"} justifyContent={"flex-end"}>
                    <Box position={"relative"}>
                        <Image
                            src={userDetail?.profile?.banner || coverImg}
                            alt="Cover Image"
                            h={"120px"}
                            w={"100%"}
                            objectFit={"cover"}
                            borderRadius={"10px"}
                        />
                        <Avatar
                            name="Profile Avatar"
                            size={"lg"}
                            src={userDetail?.profile?.avatar || undefined}
                            position={"absolute"}
                            left={"25px"}
                            bottom={"-35px"}
                            outline={"3px solid"}
                            outlineColor={outlineColor}
                        />
                    </Box>
                </Flex>

                {/* Profile Info */}
                <Stack spacing="1" mt={"50px"}>
                    <Heading size="md">
                        ✨{userDetail?.profile?.fullName}✨
                    </Heading>
                    <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                        @{userDetail?.username}
                    </Text>
                    <Text fontSize={"14px"}>{userDetail?.profile?.bio}</Text>
                    <HStack spacing={2}>
                        <HStack spacing={1}>
                            <Text fontWeight={"bold"} fontSize={"14px"}>
                                {userDetail?._count?.follower}
                            </Text>
                            <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                                Following
                            </Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Text fontWeight={"bold"} fontSize={"14px"}>
                                {userDetail?._count?.following}
                            </Text>
                            <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                                Followers
                            </Text>
                        </HStack>
                    </HStack>
                </Stack>
            </Box>

            {/* View Selector */}
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
            {filteredOtherUserThreads?.map((thread: Thread) => (
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
                                src={thread?.user?.profile?.avatar || undefined}
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
                                        {thread?.user?.profile?.fullName ??
                                            "Nama pengguna"}
                                    </Heading>
                                    <Text color={fontColor} fontSize={"14px"}>
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
                                    <Text color={fontColor} fontSize={"14px"}>
                                        {formatDate(thread.createdAt)}
                                    </Text>
                                </Link>
                                <Spacer />
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
                                                    : thread.media.length === 2
                                                    ? "45%"
                                                    : thread.media.length >= 3
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
                                        onClick={() => {
                                            console.log(
                                                "Like button clicked for thread:",
                                                thread.id
                                            );
                                            mutateAsyncLike.mutate(thread.id);
                                        }}
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
            ))}

            {/* Modal image preview */}
            <Modal isOpen={isImageOpen} onClose={onImageClose} size="xl">
                <ModalOverlay />
                <ModalContent bg="transparent" boxShadow="none">
                    <ModalCloseButton
                        size={"sm"}
                        colorScheme="whiteAlpha"
                        backgroundColor="blackAlpha.600"
                        color="white"
                        _hover={{
                            backgroundColor: "blackAlpha.700",
                        }}
                    />
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
        </Box>
    );
}
