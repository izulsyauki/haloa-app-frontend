import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CustomBtnProps extends ButtonProps {
  icon: ReactNode;
  label: string;
}

export function CustomBtnSideBar({ icon, label, ...props }: CustomBtnProps ) {
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
      borderRadius={"6px"}
      {...props}
    >
        {icon} {label}
    </Button>
  );
}
