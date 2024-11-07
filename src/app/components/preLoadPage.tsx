import { Container, Flex, Image, Spinner } from "@chakra-ui/react";
import Logo from "../../../public/assets/logo/logo.svg";

export function PreLoadPage(){
    return (
        <Container h="100vh" maxW="100vw" p={0}>
            <Flex 
                w="100%" 
                h="100%" 
                justifyContent="center" 
                alignItems="center" 
                gap="5px"
            >
                <Image 
                    src={Logo} 
                    h="42px" 
                    mb={4} 
                />
                <Spinner 
                    size="sm" 
                    color="blue.500" 
                    thickness="3px"
                    mt={-10}
                />
            </Flex>
        </Container>
    );
}