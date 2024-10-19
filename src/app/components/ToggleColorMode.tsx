import { MoonIcon } from "@chakra-ui/icons";
import { Box, Icon, Stack, Switch, useColorMode } from "@chakra-ui/react";
import { HiSun } from "react-icons/hi";

export function ToggleColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      {/* <Button
        onClick={toggleColorMode}

        pos={"absolute"}
        
      >
        {colorMode === "dark" ? (
          <SunIcon color={"orange.400"} />
        ) : (
          <MoonIcon color={"blue.700"} />
        )}
      </Button> */}

      <Stack
        direction="row"
        alignItems={"center"}
        pos={"absolute"}
        top={1}
        right={1}
        m={"1rem"}
        zIndex={98}
      >
        <Box position={"relative"} display={"inline-block"} >
          <Switch
            isChecked={colorMode === "dark"}
            onChange={toggleColorMode}
            size={"md"}
            w={"100%"}
            h={"100%"}
            sx={{
              transition: "background-color 1s ease, transform 1s ease",
            }}
          />
          <Icon
            as={colorMode === "light" ? MoonIcon : HiSun }
            position={"absolute"}
            top={"57%"}
            left={colorMode === "dark" ? "3px" : "calc(100% - 13px)"}
            transform={"translateY(-50%)"}
            boxSize={"11px"}
            color={colorMode === "light" ? "blue.500" : "yellow.500"}
            zIndex={99}
            transition="left 0.3s ease"
          />
        </Box>
      </Stack>
    </>
  );
}
