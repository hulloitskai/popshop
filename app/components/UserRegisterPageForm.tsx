import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

import PasswordWithStrengthCheckField from "./PasswordWithStrengthCheckField";

export type UserRegisterPageFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type UserRegisterPageFormProps = {};

const UserRegisterPageForm: FC<UserRegisterPageFormProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0.0);

  // == Form
  const { getInputProps, onSubmit, setFieldValue, setErrors } =
    useForm<UserRegisterPageFormValues>({
      initialValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
      },
      validate: {
        password: () => {
          if (passwordStrength < 1.0) {
            return "Too weak.";
          }
        },
        passwordConfirmation: (value, { password }) => {
          if (password != value) {
            return "Does not match password.";
          }
        },
      },
    });

  // == Markup
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
        router.post("/user", data, {
          errorBag: UserRegisterPageForm.name,
          onBefore: () => setLoading(true),
          onError: errors => {
            setFieldValue("password", "");
            setFieldValue("passwordConfirmation", "");
            setErrors(errors);
            showFormErrors("Could not complete registration");
          },
          onFinish: () => setLoading(false),
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
        <PasswordWithStrengthCheckField
          label="Password"
          placeholder="password"
          required
          onStrengthCheck={setPasswordStrength}
          {...getInputProps("password")}
        />
        <PasswordInput
          label="Password Confirmation"
          placeholder="password"
          required
          {...getInputProps("passwordConfirmation")}
        />
        <Button type="submit" {...{ loading }}>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default UserRegisterPageForm;
