import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Center,
} from "@mantine/core";
import classes from "./login.module.css";
import { useAuth } from "../../utils/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";

interface LoginData {
  email: string;
  password: string;
}

export function Login() {
  const navigate = useNavigate();
  const { login, error, loading } = useAuth();

  const form = useForm<LoginData>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Container size={420} my={40}>
      <Text
        component="h1"
        variant="gradient"
        gradient={{ from: "teal", to: "cyan" }}
        ta="center"
        fz={50}
        fw={900}
      >
        Expense Guardian
      </Text>
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome Back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="sm"
          component="button"
          onClick={() => navigate("/register")}
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form
          onSubmit={form.onSubmit(
            async (values: LoginData) => await login(values)
          )}
        >
          <TextInput
            label="Email"
            placeholder="your@email.com"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Button type="submit" fullWidth mt="xl" loading={loading}>
            Sign in
          </Button>
          {error && (
            <Text c="red" mt="md" ta="center">
              {error.message}
            </Text>
          )}
        </form>
      </Paper>
      <Center mt={20}>
        <Button variant="outline" onClick={() => navigate("/")}>
          Go to Homepage
        </Button>
      </Center>
    </Container>
  );
}
