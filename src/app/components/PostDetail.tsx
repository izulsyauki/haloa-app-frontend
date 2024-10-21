import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import myIcons from "../assets/icons/myIcons";
import { repliesData } from "../datas/repliesData";
import User from "../datas/user.json";
import { useAuthStore } from "../store/auth";
import { CustomBtnPrimary } from "./CustomBtn";

const findPostById = (postId: string | undefined) =>
  User.find((user) => user.id === Number(postId));

export function PostDetail() {
  const { postId } = useParams();
  const post = findPostById(postId);
  const postReplies = repliesData[Number(postId)] || [];
  const { user: loggedInUser } = useAuthStore();
  const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
  const replyInputRef = useRef<HTMLInputElement>(null);
  const [replies, setReplies] = useState(postReplies);
  const navigate = useNavigate();

  const handleReply = () => {
    const newReply = replyInputRef.current?.value;
    if (newReply && loggedInUser) {
      const replyData = {
        username: loggedInUser?.username,
        fullName: loggedInUser?.profile?.fullName,
        profilePicture: loggedInUser.profile.profilePicture,
        bio: loggedInUser.profile.bio,
        reply: newReply,
      };
      setReplies((prevReplies) => [replyData, ...prevReplies]);

      if (replyInputRef.current) {
        replyInputRef.current.value = "";
      }
    }
  };

  if (!post) {
    return <Text>Post not found</Text>;
  }

  return (
    <>
      <Box w={"100%"} h={"100%"}>
        <HStack p={"0px 1rem"} spacing={-1}>
          <Button
            variant={"ghost"}
            p={"0px"}
            m={"0px"}
            ml={"-10px"}
            borderRadius={"0px"}
            onClick={() => navigate("/")}
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
                name="Other Profile Avatar"
                src={post.profile.profilePicture}
                size={"sm"}
              />
              <VStack spacing={-1} alignItems={"flex-start"}>
                <Heading size={"sm"} fontSize={"14px"}>
                  {post.profile.fullName}
                </Heading>
                <Text color={fontColor} fontSize={"14px"}>
                  @{post.username}
                </Text>
              </VStack>
            </HStack>
            <VStack
              w={"100%"}
              spacing={1}
              alignItems={"start"}
              fontWeight={"normal"}
            >
              <Text fontSize={"13px"} p={"5px 0px"} fontWeight={"normal"}>
                {post.dummyStatus}
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
                spacing={2}
                marginY={"5px"}
                color={fontColor}
                fontSize={"13px"}
              >
                <Text>11:32 PM</Text>
                <Text>•</Text>
                <Text>August 16, 2024</Text>
              </HStack>
              <HStack
                spacing={5}
                marginY={"5px"}
                color={fontColor}
                fontSize={"13px"}
              >
                <HStack spacing={1}>
                  <myIcons.HiOutlineHeart fontSize={"22px"} color={fontColor} />
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
        </Box>

        <InputGroup
          padding={"1rem"}
          gap={"15px"}
          alignItems={"center"}
          borderBottom={"1px solid #3F3F3F"}
        >
          <Avatar
            name="Other Profile Avatar"
            src={post.profile.profilePicture}
            size={"sm"}
          />
          <Input
            ref={replyInputRef}
            type="text"
            placeholder="Type your reply!"
            variant={"unstyled"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleReply();
              }
            }}
          />
          <HStack spacing={1} mr={"15px"}>
            <Button variant={"ghost"} padding={"10px"} borderRadius={"0px"}>
              <Image src={myIcons.GalleryAdd} />
            </Button>
            <CustomBtnPrimary
              label="Reply"
              onClick={handleReply}
              w={"fit-content"}
              p={"6px 15px"}
              fontSize={"14px"}
              h={"fit-content"}
              m={"0px"}
            />
          </HStack>
        </InputGroup>

        <Box>
          {replies.length > 0 ? (
            replies.map((replyData, index) => (
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
                    name="Other Profile Avatar"
                    src={replyData.profilePicture}
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
                        {replyData.fullName}
                      </Heading>
                      <Text color={fontColor} fontSize={"14px"}>
                        @{replyData.username}
                      </Text>
                      <Text color={fontColor} fontSize={"14px"} mt={"-2px"}>
                        {" "}
                        •{" "}
                      </Text>
                      <Text color={fontColor} fontSize={"14px"}>
                        4h
                      </Text>
                    </HStack>
                    <Text fontSize={"13px"} p={"5px 0px"} fontWeight={"normal"}>
                      {replyData.reply}
                    </Text>
                    <HStack
                      spacing={5}
                      marginY={"5px"}
                      color={fontColor}
                      fontSize={"13px"}
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
              </Box>
            ))
          ) : (
            <Text>No replies yet.</Text>
          )}
        </Box>
      </Box>
    </>
  );
}
