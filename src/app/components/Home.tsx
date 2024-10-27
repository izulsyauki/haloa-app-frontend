import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    Textarea,
    useDisclosure,
    VStack,
    useColorModeValue,
} from "@chakra-ui/react";
import myIcons from "../assets/icons/myIcons";
import { CustomBtnPrimary } from "../components/CustomBtn";
import { useAuthStore } from "../store/auth";
// import fakeUsers from "../datas/user.json";
import { User } from "../types/user";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../libs/axios";

// Definisikan interface untuk thread
interface Thread {
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

export function Home() {
    const { user: loggedInUser } = useAuthStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
    const [threads, setThreads] = useState<Thread[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchThreads();
    }, []);

    const fetchThreads = async () => {
        try {
            setIsLoading(true);
            const response = await API.get<Thread[]>("/threads");
            setThreads(response.data);
        } catch (error) {
            console.error("Error fetching threads:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLike = async (threadId: number) => {
        const response = await API.post(`/like/${threadId}`);
        return response.data;
    };

    // const handleLike = (userId: number) => {
    //     setLikedPosts((prevLikedPosts) => ({
    //         ...prevLikedPosts,
    //         [userId]: !prevLikedPosts[userId],
    //     }));
    // };

    return (
        <>
            <Box w={"100%"} h={"100%"}>
                <Heading p={"0px 1rem"} size={"md"}>
                    Home
                </Heading>
                <Button
                    variant={"ghost"}
                    borderRadius={"none"}
                    w={"100%"}
                    h={"70px"}
                    p={"1rem"}
                    borderBottom={"1px solid #3F3F3F"}
                    justifyContent={"flex-start"}
                    gap={"15px"}
                    onClick={onOpen}
                >
                    <Avatar
                        name="Profile Avatar"
                        src={loggedInUser?.profile?.profilePicture}
                        size={"sm"}
                    />
                    <Text
                        color={fontColor}
                        fontWeight={"normal"}
                        fontSize={"18px"}
                    >
                        What is happening?!
                    </Text>
                    <Spacer />
                    <Image src={myIcons.GalleryAdd} />
                    <CustomBtnPrimary
                        label="Post"
                        margin={"0px"}
                        w={"fit-content"}
                        p={"6px 15px"}
                        fontSize={"14px"}
                        h={"fit-content"}
                    />
                </Button>

                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent padding={"10px 10px"}>
                        <ModalHeader></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody padding={"0px 10px"}>
                            <Flex gap={3}>
                                <Avatar
                                    name="Profile Avatar"
                                    src={loggedInUser?.profile?.profilePicture}
                                    size={"sm"}
                                />
                                <Textarea
                                    placeholder="What is happening?!"
                                    size="sm"
                                    resize="none"
                                    variant={"unstyled"}
                                />
                            </Flex>
                        </ModalBody>
                        <Divider />
                        <ModalFooter padding={"10px 0px"}>
                            <Flex
                                justifyContent={"space-between"}
                                w={"100%"}
                                alignItems={"center"}
                            >
                                <Button
                                    variant={"ghost"}
                                    padding={"10px"}
                                    borderRadius={"0px"}
                                >
                                    <Image src={myIcons.GalleryAdd} />
                                </Button>
                                <CustomBtnPrimary
                                    label="Post"
                                    w={"fit-content"}
                                    p={"6px 15px"}
                                    fontSize={"14px"}
                                    h={"fit-content"}
                                    mt={"0px"}
                                    mr={"10px"}
                                />
                            </Flex>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {isLoading ? (
                    <Box p={4}>Loading...</Box>
                ) : (
                    threads.map((thread: Thread) => (
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
                                <Link to={`/post/${thread.id}`} key={thread.id}>
                                    <Avatar
                                        name="Other Profile Avatar"
                                        src={thread.user.profile.profilePicture}
                                        size={"sm"}
                                    />
                                </Link>
                                <VStack
                                    w={"100%"}
                                    spacing={1}
                                    alignItems={"start"}
                                    fontWeight={"normal"}
                                >
                                    <Link to={`/post/${thread.id}`} key={thread.id}>
                                        <HStack spacing={1} pb={"3px"}>
                                            <Heading
                                                size={"sm"}
                                                fontSize={"14px"}
                                            >
                                                {thread.user.profile.fullName}
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
                                                {new Date(thread.created_at).toLocaleTimeString()}
                                            </Text>
                                        </HStack>
                                        <Text
                                            fontSize={"13px"}
                                            p={"5px 0px"}
                                            fontWeight={"normal"}
                                        >
                                            {thread.content}
                                        </Text>
                                        {thread.media.length > 0 && (
                                            <Flex flexWrap="wrap" gap={1}>
                                                {thread.media.map((media, index) => (
                                                    <Image
                                                        key={index}
                                                        src={media.url}
                                                        alt={`User post image ${index + 1}`}
                                                        borderRadius="md"
                                                        maxWidth="100%"
                                                        height="auto"
                                                    />
                                                ))}
                                            </Flex>
                                        )}
                                    </Link>
                                    <HStack
                                        spacing={5}
                                        marginY={"5px"}
                                        color={fontColor}
                                        fontSize={"13px"}
                                    >
                                        <HStack spacing={1}>
                                            <Button
                                                variant={"ghost"}
                                                padding={"5px 5px"}
                                                margin={"0px"}
                                                h={"fit-content"}
                                                onClick={() =>
                                                    handleLike(thread.user.id)
                                                }
                                                fontWeight={"normal"}
                                                fontSize={"14px"}
                                                color={fontColor}
                                                gap={"5px"}
                                            >
                                                {!likedPosts[thread.user.id] ? (
                                                    <myIcons.HiOutlineHeart
                                                        fontSize={"22px"}
                                                        color={fontColor}
                                                    />
                                                ) : (
                                                    <myIcons.HiHeart
                                                        fontSize={"22px"}
                                                        color={"#f87171"}
                                                    />
                                                )}
                                                <Text>
                                                    {thread._count.like}
                                                </Text>
                                            </Button>
                                        </HStack>
                                        <HStack spacing={1}>
                                            <myIcons.HiOutlineAnnotation
                                                fontSize={"22px"}
                                            />
                                            <Text>
                                                {Math.floor(
                                                    Math.random() * 90
                                                ) + 10}
                                            </Text>
                                            <Text>Replies</Text>
                                        </HStack>
                                    </HStack>
                                </VStack>
                            </Flex>
                        </Box>
                    ))
                )}
            </Box>
        </>
    );
}
