import { Button, ButtonProps } from "@chakra-ui/react";

interface CustomBtnProps extends ButtonProps {
  label: string;
}

export function CustomBtnPrimary({ label, ...props }: CustomBtnProps ) {
  return (
    <Button
    marginTop={"3"}
    type="submit"
    bg="blue.500"
    color="white"
    _hover={{bg : "blue.600"}}
    _active={{bg: "blue.700"}}
    width="full"
    borderRadius={"100px"}
    fontSize={"16px"}
    {...props}
  >
    {label}
  </Button>
  );
}
