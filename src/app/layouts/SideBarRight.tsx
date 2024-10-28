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
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import myIcons from "../assets/icons/myIcons";
import coverImg from "../assets/images/cover.png";
import { CustomBtnPrimary, CustomBtnSecondary } from "../components/CustomBtn";
import { ToggleColorMode } from "../components/ToggleColorMode";
import fakeUsers from "../datas/user.json";
import { useHandleEditProfile } from "../hooks/useHandleEditProfile";
import { useHandleFollowUser } from "../hooks/useHandleFollowUser";
import { useAuthStore } from "../store/auth";
import { User } from "../types/user";
import { getProfile } from "../api/profile";
import { getFollowCounts } from "../api/follow";
import { getSuggestedUsers } from "../api/user";

export function SideBarRight() {
    const location = useLocation();
    const { token } = useAuthStore();
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const outlineColor = useColorModeValue("white", "#2d3748");
    const [suggestedUser, setSuggestedUser] = useState<User[]>([]);
    const {
        isOpen,
        onClose,
        selectedUser,
        handleFollowClick,
        handleUnfollow,
        isLoading: followLoading,
    } = useHandleFollowUser();
    const galleryButtonBg = useColorModeValue("white", "#2d3748");
    const [followCounts, setFollowCounts] = useState({
        followers: 0,
        following: 0,
    });

    // handle untuk edit profile
    const {
        isEditProfileOpen,
        handleEditProfileOpen,
        handleEditProfileClose,
        handleInputChange,
        handleSaveProfile,
    } = useHandleEditProfile();

    // fetch follow counts
    const fetchFollowCounts = useCallback(async () => {
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
    }, [token]);

    // fetch profile
    const fetchProfile = useCallback(async () => {
        if (token) {
            setIsLoading(true);
            setError(null);
            try {
                const profile = await getProfile();
                setUserProfile(profile as User);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Gagal mengambil data profil");
            } finally {
                setIsLoading(false);
            }
        }
    }, [token]);

    const fetchSuggestedUser = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const users = await getSuggestedUsers(3);
            // Filter user yang sudah di-follow
            const filteredUsers = (users as User[]).filter(user => !user.isFollowed);
            setSuggestedUser(filteredUsers);
            
            // Fetch ulang follow counts
            await fetchFollowCounts();
        } catch (error) {
            console.error("Error fetching suggested users:", error);
            setError("Gagal mengambil data pengguna yang direkomendasikan");
        } finally {
            setIsLoading(false);
        }
    }, [token, fetchFollowCounts]);

    // hook fetch
    useEffect(() => {
        fetchProfile();
        fetchFollowCounts();
        fetchSuggestedUser();
    }, [fetchFollowCounts, fetchProfile, fetchSuggestedUser]);

    // desructuring agar lebih mudah
    const getUserData = (userProfile: User | null) => {
        if (!userProfile) return null;
        const { profile } = userProfile;
        return {
            fullName: profile.profile.fullName,
            username: profile.username,
            bio: profile.profile.bio,
            avatar: profile.profile.avatar,
            banner: profile.profile.banner,
        };
    };
    const userData = getUserData(userProfile);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const counts = await getFollowCounts();
                console.log("Frontend received counts:", counts); // debugging
                setFollowCounts(counts as { followers: number; following: number });
            } catch (error) {
                console.error("Error fetching counts:", error);
            }
        };
        
        fetchCounts();
    }, []);

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
                                    src={userData?.banner || coverImg}
                                    alt="Cover Image"
                                    h={"80px"}
                                    objectFit={"cover"}
                                    borderRadius={"10px"}
                                    w={"100%"}
                                />
                                <Avatar
                                    name="Profile Avatar"
                                    src={userData?.avatar ?? undefined}
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
                                                    userData?.banner || coverImg
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
                                                    userData?.avatar ??
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
                                                defaultValue={`${userData?.fullName}`}
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
                                                defaultValue={
                                                    userData?.username
                                                }
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
                                                    userData?.bio ?? ""
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
                        {isLoading ? (
                            <Text>Loading profile...</Text>
                        ) : error ? (
                            <Text color="red.500">{error}</Text>
                        ) : userData ? (
                            <>
                                <Heading size="md">
                                    ✨{userData.fullName ?? "Nama pengguna"}✨
                                </Heading>
                                <Text fontSize={"14px"} color={fontColor}>
                                    @{userData.username ?? "Username belum ada"}
                                </Text>
                                <Text fontSize={"14px"}>
                                    {userData.bio ?? "Bio belum ada"}
                                </Text>
                                <HStack spacing={3}>
                                    <HStack spacing={1}>
                                        <Text
                                            fontWeight={"bold"}
                                            fontSize={"14px"}
                                        >
                                            {followCounts.following}
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
                                            {followCounts.followers}
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
                        {suggestedUser.map((user) => (
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
                                    <Text fontSize={"12px"} fontWeight={"medium"}>
                                        {user.profile.fullName ?? "Nama pengguna"}
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
                                    isLoading={followLoading} // Gunakan followLoading untuk loading state
                                    onClick={() => handleFollowClick(
                                        user, 
                                        suggestedUser, 
                                        setSuggestedUser,
                                        fetchSuggestedUser  // Pastikan ini dipassing
                                    )}
                                    label={user.isFollowed ? "Following" : "Follow"} // Pastikan kondisi ini benar
                                    bg={user.isFollowed ? "green.100" : undefined}
                                    color={user.isFollowed ? "green.500" : undefined}
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
                                    onClick={() => handleUnfollow(
                                        suggestedUser,
                                        setSuggestedUser,
                                        fetchSuggestedUser  // Pastikan ini dipassing
                                    )}
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
