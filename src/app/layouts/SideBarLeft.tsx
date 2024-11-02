import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
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
    Textarea,
    VStack,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../public/assets/logo/logo.svg";
import myIcons from "../assets/icons/myIcons";
import { CustomBtnPrimary, CustomBtnSideBar } from "../components/CustomBtn";
import { useAuthStore } from "../store/auth";
import { CloseIcon } from "@chakra-ui/icons";
import { useCreateThread } from "../hooks/useCreateThread";
import { useGetLoginUserProfile } from "../hooks/useGetLoginUserProfile";

interface LeftBarMenu {
    solidIcon: ReactNode;
    outlineIcon: ReactNode;
    path: string;
    name: string;
}

const leftBarMenu: LeftBarMenu[] = [
    {
        solidIcon: <myIcons.HiHome fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineHome fontSize={"22px"} />,
        path: "/",
        name: "Home",
    },
    {
        solidIcon: <myIcons.HiSearchCircle fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineSearchCircle fontSize={"22px"} />,
        path: "/search",
        name: "Search",
    },
    {
        solidIcon: <myIcons.HiHeart fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineHeart fontSize={"22px"} />,
        path: "/follows",
        name: "Follows",
    },
    {
        solidIcon: <myIcons.HiUserCircle fontSize={"22px"} />,
        outlineIcon: <myIcons.HiOutlineUserCircle fontSize={"22px"} />,
        path: "/profile",
        name: "Profile",
    },
];

export function SideBarLeft() {
    const location = useLocation();
    const navigate = useNavigate();
    const { userProfile } = useGetLoginUserProfile();
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
    const logout = useAuthStore((state) => state.logout);

    return (
        <Box
            w={"21vw"}
            h={"100vh"}
            p={"1rem"}
            position={"fixed"}
            zIndex={999}
            overflowY={"auto"}
            display={"flex"}
            flexDir={"column"}
            gap={"15px"}
        >
            <Image src={Logo} h={"32px"} alignSelf={"start"} p={"0px 18px"} />
            <VStack gap={0}>
                {leftBarMenu.map((menu, index) => (
                    <CustomBtnSideBar
                        key={index}
                        solidIcon={menu.solidIcon}
                        outlineIcon={menu.outlineIcon}
                        label={menu.name}
                        isActive={location.pathname === menu.path}
                        onClick={() => {
                            navigate(menu.path);
                        }}
                    />
                ))}

                <CustomBtnPrimary label="Create Post" onClick={onOpen} />

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
                            <ModalCloseButton onClick={() => {
                                    setPreviewUrls([]);
                                    setSelectedFiles([]);
                                }}
                            />
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
                                                    variant={"solid"}
                                                    colorScheme="whiteAlpha"
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
            </VStack>
            <CustomBtnSideBar
                onClick={() => {
                    logout();
                    navigate("/sign-in");
                }}
                mt={"auto"}
                outlineIcon={
                    <Box transform="scaleX(-1)">
                        <myIcons.HiOutlineLogout fontSize={"22px"} />
                    </Box>
                }
                label="Logout"
            />
        </Box>
    );
}
