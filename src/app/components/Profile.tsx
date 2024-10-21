import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import myIcons from "../assets/icons/myIcons";
import coverImg from "../assets/images/cover.png";
import { CustomBtnSecondary } from "../components/CustomBtn";
import { useAuthStore } from "../store/auth";

interface dummyPost {
  post: string;
  imageUrl?: string;
}

const dummyPost: dummyPost[] = [
  {
    post: "Hari ini super capek, tapi happy banget! Long drive ke tempat yang nggak pernah dikunjungin sebelumnya. Adventure time!",
  },
  {
    post: "Kadang hidup tuh nggak harus ribet, nikmatin aja apa yang ada. Udah syukur aja!",
  },
  {
    post: "Siapa yang bisa relate? Punya list film banyak, tapi pas mau nonton malah scroll TikTok mulu 😂",
  },
  {
    post: "Traveling itu bukan soal tempatnya aja, tapi soal pengalaman dan orang-orang yang kamu temui di jalan.",
    imageUrl:
      "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    post: "Curhat dikit: Kadang hidup tuh lucu, yang kita rencanain belum tentu sesuai. Tapi, mungkin itu cara semesta ngajarin kita bersyukur.",
  },
  {
    post: "Perjalanan ke puncak bareng teman-teman emang nggak ada tandingannya. Terasa banget persahabatannya!",
    imageUrl:
      "https://images.pexels.com/photos/906531/pexels-photo-906531.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    post: "Gila sih, sunset di pantai tadi sore keren banget! Fix healing ke sini lagi kapan-kapan.",
    imageUrl:
      "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    post: "Lagi pengen aja nge-gas ke gunung, fresh banget sih hawa dinginnya!",
    imageUrl:
      "https://images.pexels.com/photos/572897/pexels-photo-572897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    post: "Sudah lama gw nggak ngoding lagi, first time ngoding lagi ges!",
    imageUrl:
      "https://images.pexels.com/photos/169573/pexels-photo-169573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    post: "Hidup itu kayak jalanan, kadang lurus, kadang belok-belok. Yang penting jangan lupa nikmatin pemandangan.",
  },
  {
    post: "Nggak perlu jauh-jauh ke luar negeri, explore alam di negeri sendiri aja udah cukup buat healing.",
  },
  {
    post: "Baru aja baca buku tentang mindfulness. Ternyata kadang kita lupa nikmatin hal-hal kecil dalam hidup.",
  },
  {
    post: "Kalo udah di alam bebas gini, baru deh ngerasa kecil banget sebagai manusia.",
  },
  {
    post: "Random thought: Kenapa ya langit di pagi hari tuh rasanya selalu lebih tenang?",
  },
  {
    post: "Jalan-jalan ke hutan emang beda sih, ketenangan dan suara alam bener-bener bikin pikiran fresh.",
    imageUrl:
      "https://images.pexels.com/photos/38136/pexels-photo-38136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    post: "Banyak yang bilang, ‘Jangan sering-sering overthinking.’ Tapi gimana ya, kadang pikiran tuh nggak bisa di-stop gitu aja 😂",
  },
];

export function Profile() {
  const { user: loggedInUser } = useAuthStore();
  const fontColor = useColorModeValue("blackAlpha.700", "whiteAlpha.500");
  const [view, setView] = useState<"all" | "media">("all");
  const outlineColor = useColorModeValue("white", "#2d3748");

  //filter user berdasarkan view
  const filteredPost = dummyPost.filter((post) => {
    if (view === "all") {
      return post.post;
    } else if (view === "media") {
      return post.imageUrl;
    }
  });

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
              <Text fontWeight={"bold"} fontSize={"14px"}>
                {loggedInUser?.following}
              </Text>
              <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                Following
              </Text>
            </HStack>
            <HStack spacing={1}>
              <Text fontWeight={"bold"} fontSize={"14px"}>
                {loggedInUser?.followers}
              </Text>
              <Text fontSize={"14px"} color={"whiteAlpha.500"}>
                Followers
              </Text>
            </HStack>
          </HStack>
        </Stack>
      </Box>
      <HStack w={"100%"} gap={"0px"}>
        <CustomBtnSecondary
          label="All"
          variant={"ghost"}
          borderRadius={"none"}
          w={"50%"}
          borderBottom={"1px solid #3F3F3F"}
          onClick={() => setView("all")}
          position={"relative"}
          _after={{
            content: '""',
            position: "absolute",
            bottom: "0px",
            left: "10px",
            width: "94%",
            height: view === "all" ? "3px" : "0",
            backgroundColor: view === "all" ? "blue.500" : "transparent",
          }}
        />
        <CustomBtnSecondary
          label="Media"
          variant={"ghost"}
          borderRadius={"none"}
          w={"50%"}
          borderBottom={"1px solid #3F3F3F"}
          onClick={() => setView("media")}
          position={"relative"}
          _after={{
            content: '""',
            position: "absolute",
            bottom: "0px",
            left: "10px",
            width: "94%",
            height: view === "media" ? "3px" : "0",
            backgroundColor: view === "media" ? "blue.500" : "transparent",
          }}
        />
      </HStack>
      <Stack>
        {filteredPost.map((post, index) => (
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
                src={loggedInUser?.profile.profilePicture}
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
                    {loggedInUser?.profile.fullName}
                  </Heading>
                  <Text color={fontColor} fontSize={"14px"}>
                    @{loggedInUser?.username}
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
                  {post.post}
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
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
