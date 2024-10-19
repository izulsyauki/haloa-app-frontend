import {
    Avatar,
    Box,
    Flex,
    Heading,
    HStack,
    Image,
    Stack,
    Text
} from "@chakra-ui/react";
import coverImg from "../assets/images/cover.png";
import { CustomBtnSecondary } from "../components/CustomBtn";
import { useAuthStore } from "../store/auth";

export function ProfileRoutes() {
  const { user: loggedInUser } = useAuthStore();

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
            <Image src={coverImg} alt="Cocer Image" h={"120px"} w={"100%"} />
            <Avatar
              name="Profile Avatar"
              src={loggedInUser?.profile?.profilePicture}
              position={"absolute"}
              left={"20px"}
              bottom={"-30px"}
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
          <Heading size="md">✨{loggedInUser?.profile?.fullName}✨</Heading>
          <Text fontSize={"14px"} color={"whiteAlpha.500"}>
            @{loggedInUser?.username}
          </Text>
          <Text fontSize={"14px"}>{loggedInUser?.profile.bio}</Text>
          <HStack spacing={2}>
            <HStack spacing={1}>
            <Text fontWeight={"bold"} fontSize={"14px"}>{loggedInUser?.following}</Text>
            <Text fontSize={"14px"} color={"whiteAlpha.500"}>Following</Text>
            </HStack>
            <HStack spacing={1}>
            <Text fontWeight={"bold"} fontSize={"14px"}>{loggedInUser?.followers}</Text>
            <Text fontSize={"14px"} color={"whiteAlpha.500"}>Followers</Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
      <HStack w={"100%"} gap={"0px"}>
        <CustomBtnSecondary label="All" variant={"ghost"} borderRadius={"none"} w={"50%"} borderBottom={"1px solid #3F3F3F"}/>
        <CustomBtnSecondary label="Media" variant={"ghost"} borderRadius={"none"} w={"50%"} borderBottom={"1px solid #3F3F3F"}/>
      </HStack>
    </Box>
  );
}
