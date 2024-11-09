/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    Flex,
    Heading,
    HStack,
    Image,
    Input,
    InputGroup,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    Textarea,
    useColorModeValue,
    VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import myIcons from "../assets/icons/myIcons";
import coverImg from "../assets/images/cover.png";
import { CustomBtnPrimary, CustomBtnSecondary } from "../components/CustomBtn";
import { ToggleColorMode } from "../components/ToggleColorMode";
import { useGetLoginUserProfile } from "../hooks/auth/useGetLoginUserProfile";
import { useHandleFollowUser } from "../hooks/follows/useHandleFollowUser";
import { useHandleEditProfile } from "../hooks/user/useHandleEditProfile";
import { useSuggestedUsers } from "../hooks/user/useSuggestedUsers";
import { Follow, FollowUser } from "../types/user";
import { useGetFollows } from "../hooks/follows/useGetFollows";

interface FollowsProps {
    followers: Follow[];
    following: Follow[];
    isLoading: boolean;
}

export function SideBarRight() {
    const location = useLocation();
    const [ error ] = useState<string | null>(null);
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const outlineColor = useColorModeValue("white", "#2d3748");
    const galleryButtonBg = useColorModeValue("white", "#2d3748");
    const { userProfile, isLoadingProfile } = useGetLoginUserProfile();
    const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

    // handle untuk edit profile
    const {
        isEditProfileOpen,
        avatarPreview,
        bannerPreview,
        isUpdatingProfile,
        handleEditProfileOpen,
        handleEditProfileClose,
        handleFileChange,
        register,
        errors,
        onSubmit,
    } = useHandleEditProfile();
    const {
        suggestedUsers,
        isLoading: isSuggestedLoading,
        refetchData,
    } = useSuggestedUsers(3);
    const {
        isOpen,
        onClose,
        selectedUser,
        handleFollowClick,
        handleUnfollow,
    } = useHandleFollowUser();

    return (
        <Stack
            ml={"72vw"}
            w={"28vw"}
            h={"fit-content"}
            p={"1rem"}
            spacing={3}
            position={"fixed"}
            zIndex={999}
            overflowY={"auto"}
        >
            {!(location.pathname === "/profile") && (
                <Card maxW="sm">
                    <CardBody>
                        <Flex
                            w={"100%"}
                            justifyContent={"space-between"}
                            mb={"10px"}
                        >
                            <Text fontSize={"18px"} fontWeight={"bold"}>
                                My Profile
                            </Text>
                            <ToggleColorMode />
                        </Flex>
                        <Flex flexDir={"column"} justifyContent={"flex-end"}>
                            <Box position={"relative"}>
                                <Image
                                    src={
                                        userProfile?.profile?.banner || coverImg
                                    }
                                    alt="Cover Image"
                                    h={"80px"}
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
                                    left={"20px"}
                                    bottom={"-23px"}
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

                            {/* Modal edit profile */}
                            <Modal
                                isOpen={isEditProfileOpen}
                                onClose={handleEditProfileClose}
                            >
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader
                                        fontSize={"18px"}
                                        p={"10px 15px"}
                                    >
                                        Edit Profile
                                    </ModalHeader>
                                    <ModalCloseButton />
                                    <form onSubmit={onSubmit}>
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
                                                <InputGroup
                                                    position={"relative"}
                                                >
                                                    <Image
                                                        src={
                                                            bannerPreview ||
                                                            userProfile?.profile
                                                                ?.banner ||
                                                            coverImg
                                                        }
                                                        alt="Cover Image"
                                                        h={"100px"}
                                                        objectFit={"cover"}
                                                        borderRadius={"10px"}
                                                        w={"100%"}
                                                    />
                                                    <Button
                                                        position={"absolute"}
                                                        left={"50%"}
                                                        bottom={"50%"}
                                                        transform={
                                                            "translate(-50%, 50%)"
                                                        }
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
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    "banner-upload"
                                                                )
                                                                ?.click()
                                                        }
                                                    >
                                                        <Image
                                                            src={
                                                                myIcons.GalleryAdd
                                                            }
                                                            w={"18px"}
                                                            h={"18px"}
                                                            m={"0px"}
                                                            p={"0px"}
                                                        />
                                                    </Button>
                                                    <Input
                                                        id="banner-upload"
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => {
                                                            if (
                                                                e.target
                                                                    .files?.[0]
                                                            ) {
                                                                handleFileChange(
                                                                    "banner",
                                                                    e.target
                                                                        .files?.[0]
                                                                );
                                                            }
                                                        }}
                                                        display="none"
                                                    />
                                                </InputGroup>

                                                <Avatar
                                                    name="Profile Avatar"
                                                    src={
                                                        avatarPreview ||
                                                        userProfile?.profile
                                                            ?.avatar ||
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
                                                    onClick={() =>
                                                        document
                                                            .getElementById(
                                                                "avatar-upload"
                                                            )
                                                            ?.click()
                                                    }
                                                >
                                                    <Image
                                                        src={myIcons.GalleryAdd}
                                                        w={"18px"}
                                                        h={"18px"}
                                                        m={"0px"}
                                                        p={"0px"}
                                                    />
                                                </Button>
                                                <Input
                                                    id="avatar-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        if (
                                                            e.target.files?.[0]
                                                        ) {
                                                            handleFileChange(
                                                                "avatar",
                                                                e.target
                                                                    .files?.[0]
                                                            );
                                                        }
                                                    }}
                                                    display="none"
                                                />
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
                                                    {...register("fullName")}
                                                />
                                                {errors.fullName && (
                                                    <Text
                                                        color="red.500"
                                                        fontSize="xs"
                                                    >
                                                        {
                                                            errors.fullName
                                                                .message
                                                        }
                                                    </Text>
                                                )}
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
                                                    {...register("username")}
                                                />
                                                {errors.username && (
                                                    <Text
                                                        color="red.500"
                                                        fontSize="xs"
                                                    >
                                                        {
                                                            errors.username
                                                                .message
                                                        }
                                                    </Text>
                                                )}
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
                                                    {...register("bio")}
                                                />
                                                {errors.bio && (
                                                    <Text
                                                        color="red.500"
                                                        fontSize="xs"
                                                    >
                                                        {errors.bio.message}
                                                    </Text>
                                                )}
                                            </VStack>
                                        </ModalBody>

                                        <ModalFooter
                                            alignItems={"center"}
                                            justifyContent={"flex-end"}
                                            gap={"10px"}
                                            w={"100%"}
                                        >
                                            <CustomBtnPrimary
                                                label={
                                                    isUpdatingProfile
                                                        ? "Updating..."
                                                        : "Save"
                                                }
                                                type="submit"
                                                m={"0px"}
                                                p={"10px 20px"}
                                                w={"fit-content"}
                                                h={"fit-content"}
                                                fontSize={"14px"}
                                                isLoading={isUpdatingProfile}
                                            />
                                        </ModalFooter>
                                    </form>
                                </ModalContent>
                            </Modal>
                        </Flex>
                        {isLoadingProfile ? (
                            <Text>Loading profile...</Text>
                        ) : error ? (
                            <Text color="red.500">{error}</Text>
                        ) : userProfile ? (
                            <>
                                <Heading size="md">
                                    ✨{userProfile?.profile?.fullName}✨
                                </Heading>
                                <Text fontSize={"14px"} color={fontColor}>
                                    @{userProfile?.username}
                                </Text>
                                <Text fontSize={"14px"}>
                                    {userProfile?.profile?.bio}
                                </Text>
                                <HStack spacing={3}>
                                    <HStack spacing={1}>
                                        <Text
                                            fontWeight={"bold"}
                                            fontSize={"14px"}
                                        >
                                            {userProfile?._count?.follower}
                                        </Text>
                                        <Text
                                            fontSize={"14px"}
                                            color={fontColor}
                                        >
                                            Following
                                        </Text>
                                    </HStack>
                                    <HStack spacing={1}>
                                        <Text
                                            fontWeight={"bold"}
                                            fontSize={"14px"}
                                        >
                                            {userProfile?._count?.following}
                                        </Text>
                                        <Text
                                            fontSize={"14px"}
                                            color={fontColor}
                                        >
                                            Followers
                                        </Text>
                                    </HStack>
                                </HStack>
                            </>
                        ) : (
                            <Text>Profil tidak tersedia</Text>
                        )}
                    </CardBody>
                </Card>
            )}
            <Card maxW="sm">
                <CardBody>
                    <Flex
                        w={"100%"}
                        justifyContent={"space-between"}
                        mb={"10px"}
                    >
                        <Text fontSize={"18px"} fontWeight={"bold"}>
                            Suggested for you
                        </Text>
                        {location.pathname === "/profile" && (
                            <ToggleColorMode />
                        )}
                    </Flex>
                    <Stack spacing="2">
                        {suggestedUsers?.map((user) => (
                            <Flex
                                key={user.id}
                                gap={"15px"}
                                fontSize={"14px"}
                                alignItems={"center"}
                                opacity={user.isFollowed ? "0.5" : "1"}
                                transition="all 0.5s ease"
                            >
                                <Avatar
                                    src={user.profile.avatar || undefined}
                                    h={"36px"}
                                    w={"36px"}
                                />
                                <Box flex={5} gap={"10px"}>
                                    <Text
                                        fontSize={"12px"}
                                        fontWeight={"medium"}
                                    >
                                        {user.profile.fullName ??
                                            "Nama pengguna"}
                                    </Text>
                                    <Text color={fontColor} fontSize={"12px"}>
                                        @{user.username ?? "Username belum ada"}
                                    </Text>
                                </Box>
                                <CustomBtnSecondary
                                    p={"6px 12px"}
                                    h={"fit-content"}
                                    fontSize={"12px"}
                                    fontWeight={"medium"}
                                    isLoading={loadingUserId === user.id}
                                    onClick={async () => {
                                        setLoadingUserId(user.id);
                                        try {
                                            await handleFollowClick(
                                                user as FollowUser
                                            );
                                            refetchData();
                                        } finally {
                                            setLoadingUserId(null);
                                        }
                                    }}
                                    label={
                                        user.isFollowed ? "Following" : "Follow"
                                    }
                                />
                            </Flex>
                        ))}
                    </Stack>
                </CardBody>
            </Card>

            {/* Modal konfirmasi unfollow user */}
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
                                    {selectedUser?.profile?.fullName}
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
                                    onClick={() => handleUnfollow()}
                                    m={"0px"}
                                    w={"fit-content"}
                                    h={"fit-content"}
                                    fontSize={"14px"}
                                />
                                <CustomBtnPrimary
                                    label="Close"
                                    m={"0px"}
                                    p={"10px 20px"}
                                    onClick={onClose}
                                    w={"fit-content"}
                                    h={"fit-content"}
                                    fontSize={"14px"}
                                />
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            )}
            <Card maxW="sm">
                <CardBody p={"10px 20px"}>
                    <HStack fontSize={"12px"} spacing={1}>
                        <Text>Developed by</Text>
                        <Text fontWeight={"bold"}>Izulsyauki Imani</Text>
                        <Text fontSize={"8px"} mt={"-2px"}>
                            {" "}
                            •{" "}
                        </Text>
                        <HStack spacing={1} fontSize={"14px"}>
                            <Link
                                href="https://github.com/izulsyauki"
                                isExternal
                            >
                                <myIcons.FaGithub />
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/izulsyaukiimani"
                                isExternal
                            >
                                <myIcons.FaLinkedin />
                            </Link>
                            <Link
                                href="https://www.facebook.com/izulsyauki"
                                isExternal
                            >
                                <myIcons.FaFacebook />
                            </Link>
                            <Link
                                href="https://www.instagram.com/izulsyauki"
                                isExternal
                            >
                                <myIcons.FaInstagram />
                            </Link>
                        </HStack>
                    </HStack>
                    <HStack fontSize={"10px"} spacing={1}>
                        <Text>Powered by </Text>
                        <Link href="https://dumbways.id/" isExternal>
                            <Image
                                src={myIcons.LogoDw}
                                w={"18px"}
                                mt={"-3px"}
                            />
                        </Link>
                        <Text> DumbWays Indonesia </Text>
                        <Text fontSize={"8px"} mt={"-2px"}>
                            {" "}
                            •{" "}
                        </Text>
                        <Text>#1 Coding Bootcamp</Text>
                    </HStack>
                </CardBody>
            </Card>
        </Stack>
    );
}
