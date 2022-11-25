import type { FC } from "react";
import { Footer, Image, Text } from "@mantine/core";

import lovePath from "~/assets/images/love.png";

const AppFooter: FC = () => {
  return (
    <Footer
      height={32}
      px={8}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Center w="100%">
        <Group spacing={0}>
          <Text size="xs" weight={500} color="dark.3">
            Made with
          </Text>
          <Image src={lovePath} width={24} height={24} />
        </Group>
      </Center>
    </Footer>
  );
};

export default AppFooter;
