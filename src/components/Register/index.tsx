import {
  Paper,
  TextInput,
  PasswordInput,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "./register.module.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { useAuth } from "../../utils/AuthContext/AuthContext";
import { RegisterInput } from "../../api/interfaces";

export function Register() {
  const navigate = useNavigate();
  const { register, error, loading } = useAuth();

  const form = useForm<RegisterInput>({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length >= 6 ? null : "Password must be at least 6 characters",
    },
  });
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Text
          component="h1"
          fz={50}
          fw={900}
          variant="gradient"
          gradient={{ from: "teal", to: "cyan" }}
          inherit
          ta="center"
        >
          Expense Guardian
        </Text>
        <Title order={2} ta="center" mt="md" mb={50}>
          Register Account
        </Title>
        <form
          onSubmit={form.onSubmit((values: RegisterInput) => register(values))}
        >
          <TextInput
            label="Email address"
            placeholder="your@email.com"
            size="md"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Username"
            placeholder="Your username"
            size="md"
            mt="md"
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            {...form.getInputProps("password")}
          />
          <Button
            fullWidth
            mt={50}
            size="md"
            gradient={{ from: "teal", to: "cyan" }}
            type="submit"
            loading={loading}
          >
            Register
          </Button>
          {error && (
            <Text c="red" mt="md" ta="center">
              {error.message}
            </Text>
          )}
        </form>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Anchor<"a"> href="#" fw={700} onClick={() => navigate("/login")}>
            Login
          </Anchor>
        </Text>
      </Paper>
    </div>
  );
}
