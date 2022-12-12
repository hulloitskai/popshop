import type { PageComponent } from "~/helpers/inertia";
import { Text } from "@mantine/core";
import type { DeepRequired } from "~/helpers/utils";

import ProfileForm from "~/components/AccountEditPageProfileForm";
import EmailForm from "~/components/AccountEditPageEmailForm";
import PasswordForm from "~/components/AccountEditPagePasswordForm";

import type { AccountEditPageQuery } from "~/queries";

export type AccountEditPageProps = {
  readonly data: DeepRequired<AccountEditPageQuery, ["viewer"]>;
};

const AccountEditPage: PageComponent<AccountEditPageProps> = ({
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
        <ProfileForm {...{ viewer }} />
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
        <EmailForm {...{ viewer }} />
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
        <PasswordForm />
      </Stack>
    </Card>
  </Stack>
);

AccountEditPage.layout = layoutWithData<AccountEditPageProps>(
  (page, { viewer }) => (
    <AppLayout {...{ viewer }}>
      <Center h="100%">{page}</Center>
    </AppLayout>
  ),
);

export default AccountEditPage;
