import type { FC } from "react";
import { CardProps, Text } from "@mantine/core";

import EmptyIcon from "~icons/heroicons/inbox-20-solid";

export type EmptyProps = Omit<CardProps, "children"> & {
  readonly itemLabel: string;
};

const Empty: FC<EmptyProps> = ({ itemLabel, ...otherProps }) => (
  <Card withBorder py="lg" {...otherProps}>
    <Stack align="center" spacing={0}>
      <Box sx={({ colors }) => ({ color: colors.gray[6], lineHeight: 1.1 })}>
        <EmptyIcon />
      </Box>
      <Text size="sm" color="dimmed">
        No {itemLabel} to show
      </Text>
    </Stack>
  </Card>
);

export default Empty;
