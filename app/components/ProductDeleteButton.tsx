import type { ComponentPropsWithoutRef, FC, MouseEvent } from "react";
import type { ButtonProps } from "@mantine/core";

import { ProductDeleteMutationDocument } from "~/queries";

export type ProductDeleteButtonProps = Omit<ButtonProps, "loading"> &
  ComponentPropsWithoutRef<"button"> & {
    readonly productId: string;
    readonly onDelete?: () => void;
  };

const ProductDeleteButton: FC<ProductDeleteButtonProps> = ({
  productId,
  onClick,
  onDelete,
  ...otherProps
}) => {
  const onError = useApolloErrorCallback("Failed to delete product");
  const [runMutation, { loading }] = useMutation(
    ProductDeleteMutationDocument,
    {
      onCompleted: () => {
        if (onDelete) {
          onDelete();
        }
      },
      onError,
    },
  );
  return (
    <Button
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        if (onClick) {
          onClick(event);
        }
        runMutation({
          variables: {
            input: {
              productId,
            },
          },
        });
      }}
      {...{ loading }}
      {...otherProps}
    />
  );
};

export default ProductDeleteButton;
