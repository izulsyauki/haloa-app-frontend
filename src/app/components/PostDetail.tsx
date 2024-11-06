import {
    Avatar,
    Box,
    Button,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    Input,
    InputGroup,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Spacer,
    Spinner,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getThreadDetail } from "../api/thread";
import myIcons from "../assets/icons/myIcons";
import { useCreateReply } from "../hooks/threads/useCreateReply";
import { useGetLoginUserProfile } from "../hooks/auth/useGetLoginUserProfile";
import { useHandleLike } from "../hooks/threads/useHandleLike";
import { formatDate } from "../utils/fomatDate";
import { CustomBtnPrimary } from "./CustomBtn";
import { CloseIcon } from "@chakra-ui/icons";
import { useDeleteThread } from "../hooks/threads/useDeleteThread";

export function PostDetail() {
    const { postId } = useParams();
    const { userProfile } = useGetLoginUserProfile();
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    // const [content, setContent] = useState("");
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef("");
    const { mutateAsyncLike } = useHandleLike();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const {
        handleToggleDelete,
        handleDelete,
        openDeleteId,
        deleteThreadMutation,
    } = useDeleteThread();
    const {
        isOpen: isImageOpen,
        onOpen: onImageOpen,
        onClose: onImageClose,
    } = useDisclosure();

    const threadDetailQuery = useQuery({
        queryKey: ["thread", postId || ""],
        queryFn: () => getThreadDetail(Number(postId)),
        staleTime: 0, // Set ke 0 agar selalu refetch
        refetchOnMount: true, // Refetch saat komponen dimount
    });

    useEffect(() => {
        // Refetch data saat postId berubah
        if (postId) {
            threadDetailQuery.refetch();
        }
    }, [postId, threadDetailQuery]);

    const { mutate: createReply, isPending: isCreateReplyPending } =
        useCreateReply({
            onSuccess: () => {
                if (inputRef.current) {
                    inputRef.current.value = "";
                    contentRef.current = "";
                }
                threadDetailQuery.refetch();
            },
        });

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        const newFiles = Array.from(files);

        // Cek total files yang akan ditambahkan
        if (selectedFiles.length + newFiles.length > 4) {
            alert("You can only upload up to 4 files");
            return;
        }

        // Update selected files
        setSelectedFiles((prev) => [...prev, ...newFiles]);

        // Generate preview URLs untuk file baru
        newFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setPreviewUrls((prev) => [
                        ...prev,
                        reader.result as string,
                    ]);
                }
            };
            reader.readAsDataURL(file);
        });

        // Reset input file
        if (event.target) {
            event.target.value = "";
        }
    };

    const handleReply = () => {
        const content = contentRef.current;
        if (!content.trim()) return;

        const formData = new FormData();
        formData.append("content", content);

        // Append semua file yang dipilih
        selectedFiles.forEach((file) => {
            formData.append("media", file);
        });

        createReply({
            formData,
            threadId: Number(postId),
        });

        // Clear input dan preview setelah submit
        if (inputRef.current) {
            inputRef.current.value = "";
            contentRef.current = "";
        }
        clearImage();
    };

    const clearImage = (index?: number) => {
        if (typeof index === "number") {
            // Hapus file dan preview spesifik
            setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
            setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
        } else {
            // Hapus semua
            setSelectedFiles([]);
            setPreviewUrls([]);
        }
    };

    if (threadDetailQuery.isLoading) {
        return (
            <Box w={"100%"} h={"100%"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Spinner />
            </Box>
        );
    }

    if (!threadDetailQuery.data) {
        return (
            <Text alignSelf={"center"} justifySelf={"center"} w={"100%"} h={"100%"}>
                Post not found
            </Text>
        );
    }

    if (deleteThreadMutation.isSuccess) {
        navigate(-1);
    }

    return (
        <>
            <Box w={"100%"} h={"100%"}>
                <HStack p={"0px 1rem"} spacing={1}>
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
                    <Heading size={"md"}>Status</Heading>
                </HStack>

                <Box
                    w={"100%"}
                    h={"fit-content"}
                    borderRadius={"none"}
                    justifyContent={"flex-start"}
                    borderBottom={"1px solid #3F3F3F"}
                    p={"0px"}
                    m={"0px"}
                >
                    <Flex padding="1rem" flexDir={"column"} gap={"10px"}>
                        <HStack spacing={3}>
                            <Avatar
                                name={
                                    threadDetailQuery.data.user.profile
                                        .fullName || ""
                                }
                                src={
                                    threadDetailQuery.data.user.profile
                                        .avatar || ""
                                }
                                size={"sm"}
                            />
                            <VStack spacing={-1} alignItems={"flex-start"}>
                                <Heading size={"sm"} fontSize={"14px"}>
                                    {threadDetailQuery.data.user.profile
                                        .fullName || ""}
                                </Heading>
                                <Text color={fontColor} fontSize={"14px"}>
                                    @
                                    {threadDetailQuery.data.user.username || ""}
                                </Text>
                            </VStack>

                            <Spacer />
                            {threadDetailQuery.data.user.id === userProfile?.id && (
                                <Flex
                                    flexDirection={"column"}
                                    gap={1}
                                    position={"relative"}
                                >
                                    <Box onClick={(e) => e.stopPropagation()}>
                                        <myIcons.HiDotsHorizontal
                                            fontSize={"18px"}
                                            cursor={"pointer"}
                                            onClick={(e) =>
                                                handleToggleDelete(
                                                    e,
                                                    threadDetailQuery.data.id
                                                )
                                            }
                                        />
                                    </Box>
                                    {openDeleteId ===
                                        threadDetailQuery.data.id && (
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
                                                        threadDetailQuery.data
                                                            .id
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
                        <VStack
                            w={"100%"}
                            spacing={1}
                            alignItems={"start"}
                            fontWeight={"normal"}
                        >
                            <Text
                                fontSize={"13px"}
                                p={"5px 0px"}
                                fontWeight={"normal"}
                            >
                                {threadDetailQuery.data.content}
                            </Text>
                            {threadDetailQuery.data.media &&
                                threadDetailQuery.data.media.length > 0 && (
                                    <Flex
                                        flexWrap="wrap"
                                        gap={1}
                                        sx={{
                                            "& > div": {
                                                flex: `1 1 ${
                                                    threadDetailQuery.data.media
                                                        .length === 1
                                                        ? "100%"
                                                        : threadDetailQuery.data
                                                              .media.length ===
                                                          2
                                                        ? "45%"
                                                        : threadDetailQuery.data
                                                              .media.length >= 3
                                                        ? "30%"
                                                        : "auto"
                                                }`,
                                            },
                                        }}
                                    >
                                        {threadDetailQuery.data.media.map(
                                            (media, index) => (
                                                <Box
                                                    key={index}
                                                    position="relative"
                                                    _hover={{
                                                        "&::before": {
                                                            content: '""',
                                                            position:
                                                                "absolute",
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
                                                        setSelectedImage(
                                                            media.url
                                                        );
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
                                            )
                                        )}
                                    </Flex>
                                )}
                            <HStack
                                spacing={2}
                                marginY={"5px"}
                                color={fontColor}
                                fontSize={"13px"}
                            >
                                <Text>
                                    {formatDate(
                                        threadDetailQuery.data.createdAt
                                    )}
                                </Text>
                            </HStack>
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
                                                threadDetailQuery.data.id
                                            )
                                        }
                                        fontWeight={"normal"}
                                        fontSize={"14px"}
                                        color={fontColor}
                                        gap={"5px"}
                                    >
                                        {threadDetailQuery.data.isLiked ? (
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
                                        <Text>
                                            {threadDetailQuery.data._count.like}
                                        </Text>
                                    </Button>
                                </HStack>
                                <HStack spacing={1}>
                                    <Button
                                        variant={"ghost"}
                                        padding={"5px 10px"}
                                        margin={"0px"}
                                        h={"fit-content"}
                                        fontWeight={"normal"}
                                        fontSize={"14px"}
                                        color={fontColor}
                                        gap={"5px"}
                                    >
                                        <myIcons.HiOutlineAnnotation
                                            fontSize={"22px"}
                                        />
                                        <Text>
                                            {
                                                threadDetailQuery.data._count
                                                    .replies
                                            }
                                        </Text>
                                        <Text>Replies</Text>
                                    </Button>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Flex>
                </Box>

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

                <Box
                    w={"100%"}
                    borderBottom={"1px solid #3F3F3F"}
                    p={"0px"}
                    m={"0px"}
                    padding={"1rem"}
                >
                    <InputGroup
                        gap={"15px"}
                        alignItems={"center"}
                        flexDir={"row"}
                    >
                        <Avatar
                            name="Other Profile Avatar"
                            src={userProfile?.profile.avatar || ""}
                            size={"sm"}
                        />
                        <Input
                            ref={inputRef}
                            type="text"
                            placeholder="Type your reply!"
                            variant={"unstyled"}
                            onChange={(e) =>
                                (contentRef.current = e.target.value)
                            }
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleReply();
                                }
                            }}
                        />
                        <HStack spacing={1} mr={"15px"}>
                            <Input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileSelect}
                                hidden
                            />
                            <Button
                                variant={"ghost"}
                                padding={"10px"}
                                borderRadius={"0px"}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Image src={myIcons.GalleryAdd} />
                            </Button>
                            <CustomBtnPrimary
                                label={
                                    isCreateReplyPending
                                        ? "Replying..."
                                        : "Reply"
                                }
                                onClick={handleReply}
                                w={"fit-content"}
                                p={"6px 15px"}
                                fontSize={"14px"}
                                h={"fit-content"}
                                m={"0px"}
                                isLoading={isCreateReplyPending}
                            />
                        </HStack>
                    </InputGroup>

                    {/* Preview Image sebelum upload*/}
                    {previewUrls && previewUrls.length > 0 && (
                        <Box
                            position={"relative"}
                            maxW="380px"
                            mt={2}
                            ml={"3rem"}
                        >
                            <Flex gap={2} flexWrap="wrap" w={"100%"}>
                                {previewUrls.map((url, index) => (
                                    <Box
                                        key={index}
                                        position="relative"
                                        maxW={"100%"}
                                    >
                                        <Image
                                            src={url}
                                            alt={`Preview ${index + 1}`}
                                            maxH="100px"
                                        />
                                        <IconButton
                                            icon={<CloseIcon />}
                                            size="xs"
                                            colorScheme="whiteAlpha"
                                            backgroundColor="blackAlpha.600"
                                            color="white"
                                            _hover={{
                                                backgroundColor:
                                                    "blackAlpha.700",
                                            }}
                                            aria-label="Remove image"
                                            position="absolute"
                                            top={1}
                                            right={1}
                                            onClick={() => clearImage(index)}
                                            zIndex={1}
                                        />
                                    </Box>
                                ))}
                            </Flex>
                        </Box>
                    )}
                </Box>

                <Box>
                    {threadDetailQuery.data.replies.length > 0 ? (
                        threadDetailQuery.data.replies.map((reply) => (
                            <Box
                                key={reply.id}
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
                                        to={`/detail/${reply.id}`}
                                        key={reply.id}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Avatar
                                            name={
                                                reply.user.profile.fullName ||
                                                ""
                                            }
                                            src={
                                                reply.user.profile.avatar || ""
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
                                            to={`/detail/${reply.id}`}
                                            key={reply.id}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <HStack spacing={1} pb={"3px"}>
                                                <Heading
                                                    size={"sm"}
                                                    fontSize={"14px"}
                                                >
                                                    {reply.user.profile
                                                        .fullName || ""}
                                                </Heading>
                                                <Text
                                                    color={fontColor}
                                                    fontSize={"14px"}
                                                >
                                                    @{reply.user.username || ""}
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
                                                    {formatDate(
                                                        reply.createdAt
                                                    )}
                                                </Text>
                                            </HStack>
                                        </Link>
                                        <Text
                                            fontSize={"13px"}
                                            p={"5px 0px"}
                                            fontWeight={"normal"}
                                        >
                                            {reply.content}
                                        </Text>

                                        {/* Reply media, jika ada */}
                                        {reply.media &&
                                            reply.media.length > 0 && (
                                                <Box>
                                                    <Flex
                                                        flexWrap="wrap"
                                                        gap={1}
                                                        sx={{
                                                            "& > div": {
                                                                flex: `1 1 ${
                                                                    reply.media
                                                                        .length ===
                                                                    1
                                                                        ? "100%"
                                                                        : reply
                                                                              .media
                                                                              .length ===
                                                                          2
                                                                        ? "45%"
                                                                        : reply
                                                                              .media
                                                                              .length >=
                                                                          3
                                                                        ? "30%"
                                                                        : "auto"
                                                                }`,
                                                            },
                                                        }}
                                                    >
                                                        {reply.media.map(
                                                            (media, index) => (
                                                                <Box
                                                                    key={index}
                                                                    position="relative"
                                                                    _hover={{
                                                                        "&::before":
                                                                            {
                                                                                content:
                                                                                    '""',
                                                                                position:
                                                                                    "absolute",
                                                                                top: 0,
                                                                                left: 0,
                                                                                right: 0,
                                                                                bottom: 0,
                                                                                bg: "blackAlpha.600",
                                                                                zIndex: 1,
                                                                            },
                                                                        ".view-text":
                                                                            {
                                                                                opacity: 1,
                                                                            },
                                                                    }}
                                                                    cursor="pointer"
                                                                    onClick={() => {
                                                                        setSelectedImage(
                                                                            media.url
                                                                        );
                                                                        onImageOpen();
                                                                    }}
                                                                >
                                                                    <Image
                                                                        src={
                                                                            media.url
                                                                        }
                                                                        alt={`User post image ${
                                                                            index +
                                                                            1
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
                                                                        opacity={
                                                                            0
                                                                        }
                                                                        zIndex={
                                                                            2
                                                                        }
                                                                        transition="opacity 0.2s"
                                                                    >
                                                                        View
                                                                    </Text>
                                                                </Box>
                                                            )
                                                        )}
                                                    </Flex>
                                                </Box>
                                            )}

                                        <HStack
                                            spacing={1}
                                            marginY={"5px"}
                                            color={fontColor}
                                            fontSize={"13px"}
                                            marginRight={"auto"}
                                        >
                                            <HStack spacing={1}>
                                                <Button
                                                    variant={"ghost"}
                                                    padding={"5px 10px"}
                                                    margin={"0px"}
                                                    h={"fit-content"}
                                                    onClick={() =>
                                                        mutateAsyncLike.mutate(
                                                            reply.id
                                                        )
                                                    }
                                                    fontWeight={"normal"}
                                                    fontSize={"14px"}
                                                    color={fontColor}
                                                    gap={"5px"}
                                                >
                                                    {!reply.isLiked ? (
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
                                                        {reply._count.like}
                                                    </Text>
                                                </Button>
                                            </HStack>
                                            <HStack spacing={1}>
                                                <Button
                                                    variant={"ghost"}
                                                    padding={"5px 10px"}
                                                    margin={"0px"}
                                                    h={"fit-content"}
                                                    onClick={() =>
                                                        navigate(
                                                            `/detail/${reply.id}`
                                                        )
                                                    }
                                                    fontWeight={"normal"}
                                                    fontSize={"14px"}
                                                    color={fontColor}
                                                    gap={"5px"}
                                                >
                                                    <myIcons.HiOutlineAnnotation
                                                        fontSize={"22px"}
                                                    />
                                                    <Text>
                                                        {reply._count.replies}
                                                    </Text>
                                                    <Text>Replies</Text>
                                                </Button>
                                            </HStack>
                                        </HStack>
                                    </VStack>
                                </Flex>
                            </Box>
                        ))
                    ) : (
                        <Text align={"center"} justifySelf={"center"} w={"100%"} h={"100%"}>No replies yet.</Text>
                        )}
                    </Box>
            </Box>
        </>
    );
}
