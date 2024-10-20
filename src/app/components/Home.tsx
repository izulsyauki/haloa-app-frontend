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
  useColorModeValue
} from "@chakra-ui/react";
import myIcons from "../assets/icons/myIcons";
import { CustomBtnPrimary } from "../components/CustomBtn";
import { useAuthStore } from "../store/auth";
import fakeUsers from "../datas/user.json";
import { User } from "../types/user";

export function Home() {
  const { user: loggedInUser } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const fontColor = useColorModeValue ("blackAlpha.700", "whiteAlpha.500")

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
            <ModalCloseButton
              borderRadius={"full"}
              size={"sm"}
              border={"1px solid"}
              width={"20px"}
              height={"20px"}
            />
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
                <Button variant={"ghost"} padding={"10px"} borderRadius={"0px"}>
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

        {fakeUsers
          .filter((user) => user.username !== loggedInUser?.username)
          .slice(0, 7)
          .map((user: User) => (
            <Button
              variant={"ghost"}
              w={"100%"}
              h={"fit-content"}
              borderRadius={"none"}
              justifyContent={"flex-start"}
              borderBottom={"1px solid #3F3F3F"}
              p={"0px"}
              m={"0px"}
            >
              <Flex
                padding="1rem"
                gap={"15px"}
              >
                <Avatar
                  name="Other Profile Avatar"
                  src={user.profile.profilePicture}
                  size={"sm"}
                />
                <VStack w={"100%"} spacing={1} alignItems={"start"} fontWeight={"normal"}>
                  <HStack spacing={1} pb={"3px"}>
                    <Heading size={"sm"} fontSize={"14px"}>
                      {user.profile.fullName}
                    </Heading>
                    <Text color={fontColor} fontSize={"14px"}>
                      @{user.username}
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
                  <Text fontSize={"13px"} p={"5px 0px"} fontWeight={"normal"}>{user.dummyStatus}</Text>
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
                      <Text>{Math.floor(Math.random() * 900) + 100}</Text>
                    </HStack>
                    <HStack spacing={1}>
                      <myIcons.HiOutlineAnnotation fontSize={"22px"} />
                      <Text>{Math.floor(Math.random() * 90) + 10}</Text>
                      <Text>Replies</Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Flex>
            </Button>
          ))}
      </Box>
    </>
  );
}
