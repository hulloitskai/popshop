import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type UserSettingsPagePasswordFormValues = {
  readonly password: string;
  readonly passwordConfirmation: string;
  readonly currentPassword: string;
};

export type UserSettingsPagePasswordFormProps = {};

const UserSettingsPagePasswordForm: FC<
  UserSettingsPagePasswordFormProps
> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues: UserSettingsPagePasswordFormValues = useMemo(
    () => ({
      password: "",
      passwordConfirmation: "",
      currentPassword: "",
    }),
    [],
  );
  const { getInputProps, onSubmit, reset, setErrors } =
    useForm<UserSettingsPagePasswordFormValues>({ initialValues });
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
            errorBag: UserSettingsPagePasswordForm.name,
            preserveScroll: true,
            onBefore: () => setLoading(true),
            onSuccess: () => {
              reset();
              showNotice({ message: "Password changed successfully" });
            },
            onError: errors => {
              reset();
              setErrors(errors);
              showAlert({ message: "Failed to change password" });
            },
            onFinish: () => setLoading(false),
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
        <Button type="submit" {...{ loading }}>
          Change Password
        </Button>
      </Stack>
    </form>
  );
};

export default UserSettingsPagePasswordForm;
