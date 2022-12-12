import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type AccountSignUpPageFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type AccountSignUpPageFormProps = {};

const AccountSignUpPageForm: FC<AccountSignUpPageFormProps> = () => {
  const router = useRouter();
  const { getInputProps, onSubmit, setFieldValue, setErrors } =
    useForm<AccountSignUpPageFormValues>({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
    });
  return (
    <form
      onSubmit={onSubmit(({ name, email, password, passwordConfirmation }) => {
        const data = {
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        };
        router.post("/account", data, {
          errorBag: AccountSignUpPageForm.name,
          onError: errors => {
            setFieldValue("password", "");
            setFieldValue("passwordConfirmation", "");
            setErrors(errors);
            showAlert({ message: "Failed to register account." });
          },
        });
      })}
    >
      <Stack spacing="xs">
        <TextInput
          label="Name"
          placeholder="Jon Snow"
          required
          {...getInputProps("name")}
        />
        <TextInput
          label="Email"
          placeholder="email@example.com"
          required
          {...getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="password"
          required
          {...getInputProps("password")}
        />
        <PasswordInput
          label="Password Confirmation"
          placeholder="password"
          required
          {...getInputProps("passwordConfirmation")}
        />
        <Button type="submit">Sign Up</Button>
      </Stack>
    </form>
  );
};

export default AccountSignUpPageForm;
