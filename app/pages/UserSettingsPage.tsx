import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import type { DeepRequired } from "~/helpers/utils";

import UserSettingsPageProfileForm from "~/components/UserSettingsPageProfileForm";
import UserSettingsPageEmailForm from "~/components/UserSettingsPageEmailForm";
import UserSettingsPagePasswordForm from "~/components/UserSettingsPagePasswordForm";

import type { UserSettingsPageQuery } from "~/queries";

export type UserSettingsPageProps = {
  readonly data: DeepRequired<UserSettingsPageQuery, ["viewer"]>;
};

const UserSettingsPage: PageComponent<UserSettingsPageProps> = ({
  data: { viewer },
}) => (
  <Stack w={440}>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Center>
          <Title order={2} size="h4">
            Profile Information
          </Title>
        </Center>
        <UserSettingsPageProfileForm {...{ viewer }} />
      </Stack>
    </Card>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title order={2} size="h4">
            Email Address
          </Title>
          <Text mt={-4} size="sm" color="dimmed">
            Change your account email address.
          </Text>
        </Stack>
        <UserSettingsPageEmailForm {...{ viewer }} />
      </Stack>
    </Card>
    <Card radius="md" withBorder>
      <Stack spacing="xs">
        <Stack align="center" spacing={0}>
          <Title order={2} size="h4">
            Password
          </Title>
          <Text mt={-4} size="sm" color="dimmed">
            Change your login password.
          </Text>
        </Stack>
        <UserSettingsPagePasswordForm />
      </Stack>
    </Card>
  </Stack>
);

UserSettingsPage.layout = layoutWithData<UserSettingsPageProps>(
  (page, { viewer }) => (
    <AppLayout {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default UserSettingsPage;
