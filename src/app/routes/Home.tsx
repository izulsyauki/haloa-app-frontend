import { Button, Stack } from "@chakra-ui/react";

export function Home() {
  return (
    <>
      <Stack direction="row" spacing={4} align="center">
        <Button>
          Button
        </Button>
        <Button>
          Button
        </Button>
        <Button colorScheme="teal" variant="ghost">
          Button
        </Button>
        <Button colorScheme="teal" variant="link">
          Button
        </Button>
      </Stack>
    </>
  );
}