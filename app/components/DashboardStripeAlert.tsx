import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import AlertIcon from "~icons/heroicons/exclamation-triangle-20-solid";
import LinkIcon from "~icons/heroicons/link-20-solid";
import ExternalLinkIcon from "~icons/heroicons/arrow-top-right-on-square-20-solid";

import {
  AccountOnboardToStripeDocument,
  DashboardStripeAlertAccountFragment,
} from "~/queries";

export type DashboardStripeAlertProps = BoxProps & {
  readonly account: DashboardStripeAlertAccountFragment;
};

const DashboardStripeAlert: FC<DashboardStripeAlertProps> = ({
  account: { isStripeConnected, stripeDashboardUrl },
  ...otherProps
}) => {
  const onError = useApolloErrorCallback(
    "Failed to create Stripe onboarding link",
  );
  const [runMutation, { loading }] = useMutation(
    AccountOnboardToStripeDocument,
    {
      onCompleted: ({ payload: { url } }) => {
        window.location.href = url;
      },
      onError,
    },
  );
  return (
    <Alert
      variant="outline"
      color={isStripeConnected ? "indigo" : "red"}
      icon={isStripeConnected ? undefined : <AlertIcon />}
      {...otherProps}
    >
      <Stack spacing={8}>
        {isStripeConnected ? (
          <>Your Stripe account is connected, and ready to receive orders.</>
        ) : (
          <>
            Your Stripe account needs to be connected before you can receive
            orders.
          </>
        )}
        {isStripeConnected ? (
          <Button
            component="a"
            href={stripeDashboardUrl!}
            target="_blank"
            rel="noopener noreferrer nofollow"
            variant="outline"
            leftIcon={<ExternalLinkIcon />}
          >
            Open Stripe Dashboard
          </Button>
        ) : (
          <Button
            variant="outline"
            leftIcon={<LinkIcon />}
            onClick={() => {
              runMutation({
                variables: {
                  input: {},
                },
              });
            }}
            {...{ loading }}
          >
            Connect Stripe Account
          </Button>
        )}
      </Stack>
    </Alert>
  );
};

export default DashboardStripeAlert;
