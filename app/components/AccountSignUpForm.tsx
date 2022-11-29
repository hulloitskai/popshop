import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type AccountSignUpFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type AccountSignUpFormProps = {};

const AccountSignUpForm: FC<AccountSignUpFormProps> = () => {
  const router = useRouter();
  const { getInputProps, onSubmit, setFieldValue, setErrors } =
    useForm<AccountSignUpFormValues>({
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
          errorBag: "AccountSignUpForm",
          onError: errors => {
            console.log("WHYYYY33333");
            console.log({ errors });
            setFieldValue("password", "");
            setFieldValue("passwordConfirmation", "");
            setErrors(errors);
            showAlert({ message: "We couldn't register your account!" });
          },
          onFinish: () => {
            console.log("WHYYYY");
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

export default AccountSignUpForm;
