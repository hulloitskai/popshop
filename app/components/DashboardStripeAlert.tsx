import type { FC } from "react";
import type { BoxProps } from "@mantine/core";

import AlertIcon from "~icons/heroicons/exclamation-triangle-20-solid";
import LinkIcon from "~icons/heroicons/link-20-solid";

import {
  AccountOnboardToStripeDocument,
  DashboardStripeAlertAccountFragment,
} from "~/queries";

export type DashboardStripeAlertProps = BoxProps & {
  readonly account: DashboardStripeAlertAccountFragment;
};

const DashboardStripeAlert: FC<DashboardStripeAlertProps> = ({
  account: { isStripeConnected },
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
  if (isStripeConnected) {
    return null;
  }
  return (
    <Alert variant="outline" color="red" icon={<AlertIcon />} {...otherProps}>
      <Stack align="start" spacing={8}>
        Your Stripe account needs to be connected before you can receive orders.
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
      </Stack>
    </Alert>
  );
};

export default DashboardStripeAlert;
