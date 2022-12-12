import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type AccountEditPagePasswordFormValues = {
  readonly password: string;
  readonly passwordConfirmation: string;
  readonly currentPassword: string;
};

export type AccountEditPagePasswordFormProps = {};

const AccountEditPagePasswordForm: FC<
  AccountEditPagePasswordFormProps
> = () => {
  const router = useRouter();
  const initialValues: AccountEditPagePasswordFormValues = useMemo(
    () => ({
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
    }),
    [],
  );
  const { getInputProps, onSubmit, reset, setErrors } =
    useForm<AccountEditPagePasswordFormValues>({ initialValues });
  return (
    <form
      onSubmit={onSubmit(
        ({ password, passwordConfirmation, currentPassword }) => {
          const data = {
            user: {
              password,
              password_confirmation: passwordConfirmation,
              current_password: currentPassword,
            },
          };
          router.put("/account", data, {
            errorBag: AccountEditPagePasswordForm.name,
            preserveScroll: true,
            onSuccess: () => {
              reset();
              showNotice({ message: "Password changed successfully." });
            },
            onError: errors => {
              reset();
              setErrors(errors);
              showAlert({ message: "Failed to change password." });
            },
          });
        },
      )}
    >
      <Stack spacing="xs">
        <PasswordInput
          label="New Password"
          placeholder="new-password"
          required
          {...getInputProps("password")}
        />
        <PasswordInput
          label="New Password (confirm)"
          placeholder="new-password"
          required
          {...getInputProps("passwordConfirmation")}
        />
        <PasswordInput
          label="Current Password"
          placeholder="password"
          required
          {...getInputProps("currentPassword")}
        />
        <Button type="submit">Change Password</Button>
      </Stack>
    </form>
  );
};

export default AccountEditPagePasswordForm;
