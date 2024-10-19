/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Logo from "../../../public/assets/logo/logo.svg";
import myIcons from "../assets/icons/myIcons";
import coverImg from "../assets/images/cover.png";
import {
  CustomBtnPrimary,
  CustomBtnSecondary,
  CustomBtnSideBar,
} from "../components/CustomBtn";
import { ToggleColorMode } from "../components/ToggleColorMode";
import fakeUsers from "../datas/user.json";
import { useAuthStore } from "../store/auth";
import { User } from "../types/user";

export function HaloaLayout() {
  const { user: loggedInUser } = useAuthStore();
  const [suggestedUser, setSuggestedUser] = useState<User[]>(fakeUsers);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleFollowClick = (user: User) => {
    if (!user.isFollowed) {
      const followedUser = suggestedUser.map((u) =>
        u.username === user.username ? { ...u, isFollowed: true } : u
      );
      setSuggestedUser(followedUser);
    } else {
      setSelectedUser(user);
      onOpen();
    }
  };

  const handleUnfollow = () => {
    if (selectedUser) {
      const unfollowedUser = suggestedUser.map((u) =>
        u.username === selectedUser.username ? { ...u, isFollowed: false } : u
      );
      setSuggestedUser(unfollowedUser);
      onClose();
    }
  };

  return (
    <Flex>
      <Box
        w={"21vw"}
        h={"100vh"}
        p={"1rem"}
        display={"flex"}
        flexDir={"column"}
        gap={"15px"}
      >
        <Image src={Logo} h={"32px"} alignSelf={"start"} p={"0px 18px"} />
        <VStack gap={0}>
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineHome fontSize={"22px"} />}
            label="Home"
          />
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineSearchCircle fontSize={"22px"} />}
            label="Search"
          />
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineHeart fontSize={"22px"} />}
            label="Follows"
          />
          <CustomBtnSideBar
            icon={<myIcons.HiOutlineUserCircle fontSize={"22px"} />}
            label="Profile"
          />
          <CustomBtnPrimary label="Create Post" />
        </VStack>
        <CustomBtnSideBar
          mt={"auto"}
          icon={
            <Box transform="scaleX(-1)">
              <myIcons.HiOutlineLogout fontSize={"22px"} />
            </Box>
          }
          label="Logout"
        />
      </Box>

      <Box
        w={"51vw"}
        maxHeight={"100vh"}
        borderLeft={"1px solid #3F3F3F"}
        borderRight={"1px solid #3F3F3F"}
        p={"1rem"}
      >
        <Outlet />
      </Box>

      <Stack w={"28vw"} h={"fit-content"} p={"1rem"} spacing={3}>
        <Card maxW="sm">
          <CardBody>
            <Flex w={"100%"} justifyContent={"space-between"} mb={"10px"}>
              <Text fontSize={"18px"} fontWeight={"bold"}>
                My Profile
              </Text>
              <ToggleColorMode />
            </Flex>
            <Flex flexDir={"column"} justifyContent={"flex-end"}>
              <Box position={"relative"}>
                <Image src={coverImg} alt="Cocer Image" h={"80px"} />
                <Avatar
                  name="Profile Avatar"
                  src={loggedInUser.profile.profilePicture}
                  position={"absolute"}
                  left={"20px"}
                  bottom={"-23px"}
                  outline={"3px solid #2d3748"}
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
              />
            </Flex>
            <Stack spacing="1">
              <Heading size="md">✨{loggedInUser.profile.fullName}✨</Heading>
              <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                @{loggedInUser.username}
              </Text>
              <Text fontSize={"14px"}>{loggedInUser.profile.bio}</Text>
            </Stack>
          </CardBody>
        </Card>
        <Card maxW="sm">
          <CardBody>
            <Flex w={"100%"} justifyContent={"space-between"} mb={"10px"}>
              <Text fontSize={"18px"} fontWeight={"bold"}>
                Suggested for you
              </Text>
            </Flex>
            <Stack spacing="2">
              {suggestedUser
                .filter((user) => user.username !== loggedInUser.username)
                .slice(0, 3)
                .map((user) => (
                  <Flex gap={"15px"} fontSize={"14px"} alignItems={"center"}>
                    <Avatar
                      src={user.profile.profilePicture}
                      h={"36px"}
                      w={"36 px"}
                    />
                    <Box flex={5} gap={"10px"}>
                      <Text fontSize={"12px"} fontWeight={"medium"}>
                        {user.profile.fullName}
                      </Text>
                      <Text color={"whiteAlpha.500"} fontSize={"12px"}>
                        @{user.username}
                      </Text>
                    </Box>
                    <CustomBtnSecondary
                      p={"6px 12px"}
                      h={"fit-content"}
                      fontSize={"12px"}
                      fontWeight={"medium"}
                      onClick={() => {
                        handleFollowClick(user);
                      }}
                      label={user.isFollowed ? "Following" : "Follow"}
                    />
                  </Flex>
                ))}
            </Stack>
          </CardBody>
        </Card>
        // Modal unfollow user
        {selectedUser ? (
          <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Unfollow @{selectedUser.username}?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text>
                    Are you sure want to unfollow{" "}
                    {selectedUser.profile.fullName}?
                  </Text>
                </ModalBody>

                <ModalFooter alignItems={"center"} justifyContent={"flex-end"} gap={"10px"} w={"300px"} alignSelf={"flex-end"}>
                  <CustomBtnSecondary
                    label="Unfollow"
                    onClick={handleUnfollow}
                    m={"0px"}
                  />
                  <CustomBtnPrimary label="Close" m={"0px"} p={"5px 20px"} w={"fit-content"} onClick={onClose}/>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        ) : null}
      </Stack>
    </Flex>
  );
}
