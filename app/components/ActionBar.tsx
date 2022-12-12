import type { FC } from "react";
import { CardProps, MantineProvider } from "@mantine/core";

export type ActionBarProps = CardProps;

const ActionBar: FC<ActionBarProps> = ({ children, ...otherProps }) => (
  <MantineProvider
    theme={{
      components: {
        Button: {
          defaultProps: {
            variant: "default",
            compact: true,
            pl: 6,
          },
          styles: {
            leftIcon: {
              width: 14,
              height: 14,
              marginRight: 5,
            },
          },
        },
      },
    }}
    inherit
  >
    <Card withBorder p={4} bg="gray.1" {...otherProps}>
      <Group spacing={8}>{children}</Group>
    </Card>
  </MantineProvider>
);

export default ActionBar;
