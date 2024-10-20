import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomBtnProps extends ButtonProps {
  solidIcon?: ReactNode;
  outlineIcon?: ReactNode;
  label: string;
  isActive?: boolean;
}

export function CustomBtnPrimary({ label, ...props }: CustomBtnProps) {
  return (
    <Button
      marginTop={"3"}
      type="submit"
      bg="blue.500"
      color="white"
      _hover={{ bg: "blue.600" }}
      _active={{ bg: "blue.700" }}
      width="full"
      borderRadius={"full"}
      fontSize={"16px"}
      {...props}
    >
      {label}
    </Button>
  );
}

export function CustomBtnSecondary({ label, ...props }: CustomBtnProps) {
  return (
    <Button
      colorScheme="white"
      variant={"outline"}
      w={"fit-content"}
      padding={"8px 16px"}
      borderRadius={"full"}
      fontSize={"14px"}
      {...props}
    >
      {label}
    </Button>
  );
}

export function CustomBtnSideBar({ solidIcon, outlineIcon, isActive, label, ...props }: CustomBtnProps) {
  return (
    <Button
      w={"100%"}
      h={"fit-content"}
      gap={"10px"}
      p={"12px 18px"}
      fontWeight={"medium"}
      justifyContent={"flex-start"}
      bg={"0px"}
      fontSize={"14px"}
      variant={"ghost"}
      borderRadius={"0px"}
      {...props}
    >
      {isActive ? solidIcon : outlineIcon} {label}
    </Button>
  );
}
