import {
    Avatar,
    Box,
    Flex,
    Heading,
    Input,
    InputGroup,
    InputLeftElement,
    Text
} from "@chakra-ui/react";
import myIcons from "../assets/icons/myIcons";
import { useSearchUser } from "../hooks/useSearchUser";
import { CustomBtnSecondary } from "./CustomBtn";

export function SearchUser() {
  const { register, watch, users } = useSearchUser();

  return (
    <>
      <InputGroup variant={"filled"}>
        <InputLeftElement pointerEvents="none">
          <myIcons.HiOutlineSearchCircle fontSize={"24px"} />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search your friends"
          borderRadius={"full"}
          {...register("search")}
        />
      </InputGroup>
      {!watch("search") ? (
        <Flex
          w={"100%"}
          h={"500px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box textAlign={"center"} w={"400px"}>
            <Heading size={"md"}>
              Write and search something
            </Heading>
            <Text>
              Try searching for something else or check the spelling of what you
              typed.
            </Text>
          </Box>
        </Flex>
      ) : (
        <>
          {!users.length ? (
            <Flex
              w={"100%"}
              h={"500px"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Box textAlign={"center"} w={"400px"}>
                <Heading size={"md"}>
                  No results for "{watch("search")}"
                </Heading >
                <Text>
                  Try searching for something else or check the spelling of what
                  you typed.
                </Text>
              </Box>
            </Flex>
          ) : (
            <>
              {users.map((user) => (
                <Flex mt={"20px"} flexDir={"column"} w={"100%"}>
                  <Flex gap={"20px"} fontSize={"14px"}>
                    <Avatar src={user.profile.profilePicture} />
                    <Box flex={5} gap={"20px"}>
                      <Text>{user.profile.fullName}</Text>
                      <Text color={"whiteAlpha.500"}>@{user.username}</Text>
                    </Box>
                    <CustomBtnSecondary label="Follow"/>
                  </Flex>
                  <Box fontSize={"14px"} ms={"67px"}>
                    <Text>{user.profile.bio}</Text>
                  </Box>
                </Flex>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
