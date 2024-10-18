import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";
interface ChakraAlertProps {
    status: "error" | "loading" | "info" | "success" | "warning";
    title: string;
    desc: string;
}


export function ChakraAlert( { status , title, desc, ...props}: ChakraAlertProps ) {
  return (
      <Alert
        status={status}
        position="absolute"
        top="1rem"
        alignSelf="center"
        width={"600px"}
        justifyContent={"center"}
        {...props}
      >
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{desc}</AlertDescription>
      </Alert>
  );
}
