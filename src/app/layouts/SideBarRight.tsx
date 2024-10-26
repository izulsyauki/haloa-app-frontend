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
import { useState } from "react";
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

export function SideBarRight() {
    const location = useLocation();
    const { user: loggedInUser } = useAuthStore();
    const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
    const outlineColor = useColorModeValue("white", "#2d3748");
    const [suggestedUser, setSuggestedUser] = useState<User[]>(fakeUsers);
    const { isOpen, onClose, selectedUser, handleFollowClick, handleUnfollow } =
        useHandleFollowUser();
    const galleryButtonBg = useColorModeValue("white", "#2d3748");

    const { isEditProfileOpen, fullName, username, bio, handleEditProfileOpen, handleEditProfileClose, handleInputChange, handleSaveProfile } = useHandleEditProfile();

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
                                    src={coverImg}
                                    alt="Cocer Image"
                                    h={"80px"}
                                />
                                <Avatar
                                    name="Profile Avatar"
                                    src={loggedInUser?.profile?.profilePicture}
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
                                            <Image src={coverImg} alt="Cover" />
                                            <Avatar
                                                name="Profile Avatar"
                                                src={
                                                    loggedInUser?.profile
                                                        ?.profilePicture
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
                                                defaultValue={`${fullName}`}
                                                onChange={(e) => handleInputChange('fullName', e.target.value)}
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
                                                defaultValue={username}
                                                onChange={(e) => handleInputChange('username', e.target.value)}
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
                                                defaultValue={bio}
                                                onChange={(e) => handleInputChange('bio', e.target.value)}
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
                                ✨{loggedInUser?.profile?.fullName}✨
                            </Heading>
                            <Text fontSize={"14px"} color={fontColor}>
                                @{loggedInUser?.username}
                            </Text>
                            <Text fontSize={"14px"}>
                                {loggedInUser?.profile.bio}
                            </Text>
                        </Stack>
                        <HStack spacing={2}>
                            <HStack spacing={1}>
                                <Text fontWeight={"bold"} fontSize={"14px"}>
                                    {loggedInUser?.following}
                                </Text>
                                <Text fontSize={"14px"} color={fontColor}>
                                    Following
                                </Text>
                            </HStack>
                            <HStack spacing={1}>
                                <Text fontWeight={"bold"} fontSize={"14px"}>
                                    {loggedInUser?.followers}
                                </Text>
                                <Text fontSize={"14px"} color={fontColor}>
                                    Followers
                                </Text>
                            </HStack>
                        </HStack>
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
                        {suggestedUser
                            .filter(
                                (user) =>
                                    user.username !== loggedInUser?.username
                            )
                            .slice(0, 3)
                            .map((user) => (
                                <Flex
                                    gap={"15px"}
                                    fontSize={"14px"}
                                    alignItems={"center"}
                                >
                                    <Avatar
                                        src={user.profile.profilePicture}
                                        h={"36px"}
                                        w={"36 px"}
                                    />
                                    <Box flex={5} gap={"10px"}>
                                        <Text
                                            fontSize={"12px"}
                                            fontWeight={"medium"}
                                        >
                                            {user.profile.fullName}
                                        </Text>
                                        <Text
                                            color={fontColor}
                                            fontSize={"12px"}
                                        >
                                            @{user.username}
                                        </Text>
                                    </Box>
                                    <CustomBtnSecondary
                                        p={"6px 12px"}
                                        h={"fit-content"}
                                        fontSize={"12px"}
                                        fontWeight={"medium"}
                                        onClick={() => {
                                            handleFollowClick(
                                                user,
                                                suggestedUser,
                                                setSuggestedUser
                                            );
                                        }}
                                        label={
                                            user.isFollowed
                                                ? "Following"
                                                : "Follow"
                                        }
                                    />
                                </Flex>
                            ))}
                    </Stack>
                </CardBody>
            </Card>
            // Modal unfollow user
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
                                    onClick={() =>
                                        handleUnfollow(
                                            suggestedUser,
                                            setSuggestedUser
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
