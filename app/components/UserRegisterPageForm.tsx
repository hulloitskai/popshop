import type { FC } from "react";
import { PasswordInput } from "@mantine/core";

export type UserSignUpPageFormValues = {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly passwordConfirmation: string;
};

export type UserSignUpPageFormProps = {};

const UserSignUpPageForm: FC<UserSignUpPageFormProps> = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { getInputProps, onSubmit, setFieldValue, setErrors } =
    useForm<UserSignUpPageFormValues>({
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
        router.post("/user", data, {
          errorBag: UserSignUpPageForm.name,
          onBefore: () => setLoading(true),
          onError: errors => {
            setFieldValue("password", "");
            setFieldValue("passwordConfirmation", "");
            setErrors(errors);
            showAlert({ message: "Failed to register user." });
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
        <Button type="submit" {...{ loading }}>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default UserSignUpPageForm;
