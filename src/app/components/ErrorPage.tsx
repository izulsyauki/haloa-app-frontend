import { Container, Flex, Image, Text, VStack } from "@chakra-ui/react";
import Logo from "../../../public/assets/logo/logo.svg";

export function ErrorPage(){
    return (
        <Container h="100vh" maxW="100vw" p={0}>
            <Flex 
                w="100%" 
                h="100%" 
                justifyContent="center" 
                alignItems="center" 
                gap="5px"
                flexDirection="column"
            >
                <VStack spacing={1} alignItems="start">
                <Image 
                    src={Logo} 
                    h="42px" 
                />
                <Text fontSize="16px" fontWeight="normal">
                    Oops! Sorry were not available right now, please try again later.
                    </Text>
                </VStack>
            </Flex>
        </Container>
    );
}