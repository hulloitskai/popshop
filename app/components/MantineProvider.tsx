import type { FC, PropsWithChildren } from "react";
import { theme } from "~/helpers/mantine";

import { MantineProvider as Provider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

export type MantineProviderProps = PropsWithChildren;

const MantineProvider: FC<MantineProviderProps> = ({ children }) => (
  <Provider withNormalizeCSS withGlobalStyles withCSSVariables {...{ theme }}>
    <ModalsProvider>
      <NotificationsProvider position="top-center">
        {children}
      </NotificationsProvider>
    </ModalsProvider>
  </Provider>
);

export default MantineProvider;
