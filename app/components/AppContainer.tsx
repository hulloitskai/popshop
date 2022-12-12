import type { FC } from "react";

import Providers from "./AppProviders";
import Progress from "./AppProgress";

import type { ProviderProps } from "~/helpers/inertia";

export type AppContainerProps = ProviderProps;

const AppContainer: FC<AppContainerProps> = ({ page, children }) => (
  <Providers {...{ page }}>
    {children}
    <Progress />
  </Providers>
);

export default AppContainer;
