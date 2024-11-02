/* eslint-disable @typescript-eslint/no-unused-vars */
import { CloseIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    IconButton,
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
    Text,
    Textarea,
    useColorModeValue,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import myIcons from "../assets/icons/myIcons";
import { CustomBtnPrimary } from "../components/CustomBtn";
import { useCreateThread } from "../hooks/useCreateThread";
import { useGetLoginUserProfile } from "../hooks/useGetLoginUserProfile";
import { useGetThreadsFeeds } from "../hooks/useGetThreadsFeeds";
import { Thread } from "../types/thread";
import { formatDate } from "../utils/fomatDate";
import { useHandleLike } from "../hooks/useHandleLike";

export function Home() {
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const { threads, isLoadingThreads } = useGetThreadsFeeds();
    const { userProfile } = useGetLoginUserProfile();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const {
        isOpen: isImageOpen,
        onOpen: onImageOpen,
        onClose: onImageClose,
    } = useDisclosure();
    const {
        isOpen,
        onOpen,
        onClose,
        form,
        previewUrls,
        setPreviewUrls,
        selectedFiles,
        setSelectedFiles,
        fileInputRef,
        handleOpenFileExplorer,
        onSubmit,
        createThreadMutation,
        handleFileSelect,
    } = useCreateThread();
    const [repliesCounts, setRepliesCounts] = useState<Record<number, number>>(
        {}
    );
    const { mutateAsyncLike } = useHandleLike();

    // // Generate random replies count sekali saja saat komponen mount
    // useEffect(() => {
    //     const counts: Record<number, number> = {};
    //     threads?.forEach((thread) => {
    //         counts[thread.id] = Math.floor(Math.random() * 90) + 10;
    //     });
    //     setRepliesCounts(counts);
    // }, [threads]); // Hanya dijalankan ketika threads berubah


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
                        src={userProfile?.profile?.avatar || ""}
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

                {/* Modal post thread */}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent padding={"10px 10px"}>
                        <form
                            onSubmit={(e) => {
                                console.log("form submitted");
                                onSubmit(e);
                            }}
                        >
                            <ModalHeader></ModalHeader>
                            <ModalCloseButton />
                            <ModalBody padding={"0px 10px"}>
                                <Flex gap={3}>
                                    <Avatar
                                        name="Profile Avatar"
                                        src={userProfile?.profile?.avatar || ""}
                                        size={"sm"}
                                    />
                                    <Textarea
                                        placeholder="What is happening?!"
                                        size="sm"
                                        resize="none"
                                        variant={"unstyled"}
                                        {...form.register("content")}
                                    />
                                </Flex>

                                {/* Preview post images */}
                                {previewUrls.length > 0 && (
                                    <Flex gap={1} flexWrap="wrap" pb={3}>
                                        {previewUrls.map((url, index) => (
                                            <Box
                                                key={index}
                                                position="relative"
                                            >
                                                <Image
                                                    src={url}
                                                    alt={`Preview ${index}`}
                                                    maxH={"100px"}
                                                />
                                                <IconButton
                                                    aria-label="Remove image"
                                                    icon={<CloseIcon />}
                                                    size={"xs"}
                                                    position={"absolute"}
                                                    top={1}
                                                    right={1}
                                                    colorScheme="gray"
                                                    onClick={() => {
                                                        setPreviewUrls((prev) =>
                                                            prev.filter(
                                                                (_, i) =>
                                                                    i !== index
                                                            )
                                                        );
                                                        setSelectedFiles(
                                                            (prev) =>
                                                                prev.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                )
                                                        );
                                                    }}
                                                />
                                            </Box>
                                        ))}
                                    </Flex>
                                )}
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
                                        disabled={selectedFiles.length >= 4}
                                        onClick={handleOpenFileExplorer}
                                    >
                                        <Input
                                            type="file"
                                            hidden
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileSelect}
                                            ref={fileInputRef}
                                        />
                                        <Image src={myIcons.GalleryAdd} />
                                    </Button>
                                    <CustomBtnPrimary
                                        type="submit"
                                        label={
                                            createThreadMutation.isPending
                                                ? "Posting..."
                                                : "Post"
                                        }
                                        w={"fit-content"}
                                        p={"6px 15px"}
                                        fontSize={"14px"}
                                        h={"fit-content"}
                                        mt={"0px"}
                                        mr={"10px"}
                                        isLoading={
                                            createThreadMutation.isPending
                                        }
                                    />
                                </Flex>
                            </ModalFooter>
                        </form>
                    </ModalContent>
                </Modal>

                {/* Content threads / feeds */}
                {isLoadingThreads ? (
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
                    threads?.map((thread: Thread) => (
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
                                            thread.user.profile.avatar ||
                                            undefined
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
                                            <Heading
                                                size={"sm"}
                                                fontSize={"14px"}
                                            >
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
                                                        thread.media.length ===
                                                        1
                                                            ? "100%"
                                                            : thread.media
                                                                  .length === 2
                                                            ? "45%"
                                                            : thread.media
                                                                  .length >= 3
                                                            ? "30%"
                                                            : "auto"
                                                    }`,
                                                },
                                            }}
                                        >
                                            {thread.media.map(
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
                                                <Text>
                                                    {thread._count.like}
                                                </Text>
                                            </Button>
                                        </HStack>

                                        <Link
                                            to={`/details/${thread.id}`}
                                            key={thread.id}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <HStack spacing={1}>
                                                <Button
                                                    variant={"ghost"}
                                                    padding={"5px 10px"}
                                                    margin={"0px"}
                                                    h={"fit-content"}
                                                    onClick={() =>
                                                        console.log(
                                                            "ini adalah button reply"
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
                                                        {/* {repliesCounts[
                                                            thread.id
                                                        ] || 0}{" "}
                                                        Gunakan nilai dari state */}
                                                        20
                                                    </Text>
                                                    <Text>Replies</Text>
                                                </Button>
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
            </Box>
        </>
    );
}
