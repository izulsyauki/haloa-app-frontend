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
    Spinner,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myIcons from "../assets/icons/myIcons";
import coverImg from "../assets/images/cover.png";
import { CustomBtnPrimary, CustomBtnSecondary } from "../components/CustomBtn";
import { useAuthStore } from "../store/auth";
import { getFollowCounts } from "../api/follow";
import { useHandleEditProfile } from "../hooks/useHandleEditProfile";
import { useGetLoginUserProfile } from "../hooks/useGetLoginUserProfile";
import { useGetUserThreads } from "../hooks/useGetUserThreads";
import { Thread } from "../types/thread";
import { formatDate } from "../utils/fomatDate";
import API from "../libs/axios";

interface dummyPost {
    post: string;
    imageUrl?: string;
}

const dummyPost: dummyPost[] = [
    {
        post: "Hari ini super capek, tapi happy banget! Long drive ke tempat yang nggak pernah dikunjungin sebelumnya. Adventure time!",
    },
    {
        post: "Kadang hidup tuh nggak harus ribet, nikmatin aja apa yang ada. Udah syukur aja!",
    },
    {
        post: "Siapa yang bisa relate? Punya list film banyak, tapi pas mau nonton malah scroll TikTok mulu 😂",
    },
    {
        post: "Traveling itu bukan soal tempatnya aja, tapi soal pengalaman dan orang-orang yang kamu temui di jalan.",
        imageUrl:
            "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        post: "Curhat dikit: Kadang hidup tuh lucu, yang kita rencanain belum tentu sesuai. Tapi, mungkin itu cara semesta ngajarin kita bersyukur.",
    },
    {
        post: "Perjalanan ke puncak bareng teman-teman emang nggak ada tandingannya. Terasa banget persahabatannya!",
        imageUrl:
            "https://images.pexels.com/photos/906531/pexels-photo-906531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        post: "Gila sih, sunset di pantai tadi sore keren banget! Fix healing ke sini lagi kapan-kapan.",
        imageUrl:
            "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        post: "Lagi pengen aja nge-gas ke gunung, fresh banget sih hawa dinginnya!",
        imageUrl:
            "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        post: "Sudah lama gw nggak ngoding lagi, first time ngoding lagi ges!",
        imageUrl:
            "https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        post: "Hidup itu kayak jalanan, kadang lurus, kadang belok-belok. Yang penting jangan lupa nikmatin pemandangan.",
    },
    {
        post: "Nggak perlu jauh-jauh ke luar negeri, explore alam di negeri sendiri aja udah cukup buat healing.",
    },
    {
        post: "Baru aja baca buku tentang mindfulness. Ternyata kadang kita lupa nikmatin hal-hal kecil dalam hidup.",
    },
    {
        post: "Kalo udah di alam bebas gini, baru deh ngerasa kecil banget sebagai manusia.",
    },
    {
        post: "Random thought: Kenapa ya langit di pagi hari tuh rasanya selalu lebih tenang?",
    },
    {
        post: "Jalan-jalan ke hutan emang beda sih, ketenangan dan suara alam bener-bener bikin pikiran fresh.",
        imageUrl:
            "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        post: "Banyak yang bilang, ‘Jangan sering-sering overthinking.’ Tapi gimana ya, kadang pikiran tuh nggak bisa di-stop gitu aja 😂",
    },
];

export function Profile() {
    const { token } = useAuthStore();
    const [error, setError] = useState<string | null>(null);
    const { userProfile } = useGetLoginUserProfile();
    const [followCounts, setFollowCounts] = useState({
        followers: 0,
        following: 0,
    });
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const galleryButtonBg = useColorModeValue("white", "#2d3748");
    const [view, setView] = useState<"all" | "media">("all");
    const outlineColor = useColorModeValue("white", "#2d3748");
    const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>(
        {}
    );
    const userThreads = useGetUserThreads();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const {
        isOpen: isImageOpen,
        onOpen: onImageOpen,
        onClose: onImageClose,
    } = useDisclosure();

    // handle untuk edit profile
    const {
        isEditProfileOpen,
        handleEditProfileOpen,
        handleEditProfileClose,
        handleInputChange,
        handleSaveProfile,
    } = useHandleEditProfile();

    const handleLike = async (threadId: number) => {
        const response = await API.post(`/like/${threadId}`);
        return response.data;
    };

    //filter user berdasarkan view
    const filteredThreads = userThreads.data?.filter((thread) => {
        if (view === "all") {
            return thread;
        } else if (view === "media") {
            return thread.media && thread.media.length > 0;
        }
        return false;
    });

    // hook fetch follow counts
    useEffect(() => {
        const fetchFollowCounts = async () => {
            if (token) {
                try {
                    const counts = await getFollowCounts();
                    setFollowCounts(
                        counts as { followers: number; following: number }
                    );
                } catch (error) {
                    console.error("Error fetching follow counts:", error);
                    setError("Gagal mengambil data follow counts");
                }
            }
        };
        fetchFollowCounts();
    }, [token]);

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
                                {followCounts.following}
                            </Text>
                            <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                                Following
                            </Text>
                        </HStack>
                        <HStack spacing={1}>
                            <Text fontWeight={"bold"} fontSize={"14px"}>
                                {followCounts.followers}
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
                                to={`/details/${thread.id}`}
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
                                <Link
                                    to={`/details/${thread.id}`}
                                    key={thread.id}
                                    style={{ cursor: "pointer" }}
                                >
                                    <HStack spacing={1} pb={"3px"}>
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
                                    </HStack>
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
                                            <Text>{thread._count.like}</Text>
                                        </Button>
                                    </HStack>

                                    <Link
                                        to={`/details/${thread.id}`}
                                        key={thread.id}
                                        style={{ cursor: "pointer" }}
                                    >
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
                                    </Link>
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
