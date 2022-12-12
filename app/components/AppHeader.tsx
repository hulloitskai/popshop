import type { FC } from "react";
import { Header, Image } from "@mantine/core";

import Menu from "./AppMenu";
import logoPath from "~/assets/images/logo.png";

import type { Maybe } from "~/queries";
import type { AppViewerFragment } from "~/queries";

export type AppHeaderProps = {
  readonly viewer: Maybe<AppViewerFragment>;
};

const AppHeader: FC<AppHeaderProps> = ({ viewer }) => (
  <Header
    height={42}
    p={6}
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <Button
      component={Link}
      href="/"
      variant="subtle"
      leftIcon={<Image src={logoPath} width={20} height={20} />}
      compact
      p={4}
      h="unset"
      styles={({ colors, fontSizes }) => ({
        root: {
          fontSize: fontSizes.md,
          fontWeight: 700,
          "&:hover": {
            backgroundColor: colors.gray[1],
          },
        },
        leftIcon: {
          marginRight: 4,
        },
      })}
    >
      Popshop
    </Button>
    <Menu {...{ viewer }} />
  </Header>
);

export default AppHeader;
