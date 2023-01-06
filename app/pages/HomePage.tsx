import type { FC } from "react";
import type { PageComponent } from "~/helpers/inertia";
import { Image, Text } from "@mantine/core";

import type { AppViewerFragment, HomePageQuery } from "~/queries";

import LoginIcon from "~icons/heroicons/arrow-right-on-rectangle-20-solid";
import RegisterIcon from "~icons/heroicons/identification-20-solid";
import DashboardIcon from "~icons/heroicons/rectangle-stack-20-solid";

import logoPath from "~/assets/images/logo.png";

const HomeCardMaxWidth = 440;

export type HomePageProps = {
  readonly data: HomePageQuery;
};

const HomePage: PageComponent<HomePageProps> = ({ data: { viewer } }) => (
  <Stack spacing="xl" align="center">
    <MediaQuery largerThan="xs" styles={{ height: 36 }}>
      <Space h="sm" />
    </MediaQuery>
    <Stack spacing="sm" align="center">
      <Image src={logoPath} width={100} height={100} />
      <Stack spacing={4} align="center">
        <Title size={32}>Welcome to Popshop!</Title>
        <Text color="dark.3" sx={{ alignSelf: "center" }}>
          Popshop is a really simple online store.
        </Text>
      </Stack>
    </Stack>
    {viewer ? <ReturningUserCard {...{ viewer }} /> : <NewUserCard />}
  </Stack>
);

HomePage.layout = buildLayout<HomePageProps>((page, { data: { viewer } }) => (
  <AppLayout withContainer {...{ viewer }}>
    {page}
  </AppLayout>
));

export default HomePage;

const NewUserCard: FC = () => {
  const buttonWidth = 140;
  return (
    <Card withBorder w="100%" maw={HomeCardMaxWidth}>
      <Stack spacing="xs" align="center">
        <Stack spacing={0} align="center">
          <Text color="gray.7" weight={600}>
            It&apos;s nice to have you here!
          </Text>
          <Text size="sm" color="dimmed">
            Please create an account or sign in to continue.
          </Text>
        </Stack>
        <Group spacing="xs" position="center" w="100%">
          <Button
            component={Link}
            href="/user/register"
            leftIcon={<RegisterIcon />}
            w={buttonWidth}
          >
            Sign Up
          </Button>
          <Text size="sm" color="dimmed" weight={600}>
            or
          </Text>
          <Button
            component={Link}
            href="/user/login"
            variant="outline"
            leftIcon={<LoginIcon />}
            w={buttonWidth}
          >
            Sign In
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

type ReturningUserCardProps = {
  readonly viewer: AppViewerFragment;
};

const ReturningUserCard: FC<ReturningUserCardProps> = ({ viewer }) => {
  const buttonWidth = 160;
  return (
    <Card withBorder w="100%" maw={HomeCardMaxWidth}>
      <Stack spacing="xs" align="center">
        <Stack spacing={0} align="center">
          <Text color="gray.7" weight={600}>
            You&apos;re back, {viewer.name}!
          </Text>
          <Text size="sm" color="dimmed">
            Visit the dashboard to manage your products and orders.
          </Text>
        </Stack>
        <Button
          component={Link}
          href="/dashboard"
          leftIcon={<DashboardIcon />}
          w={buttonWidth}
        >
          Dashboard
        </Button>
      </Stack>
    </Card>
  );
};
