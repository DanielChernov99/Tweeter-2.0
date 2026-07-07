import { useState } from "react";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  Alert,
} from "@mantine/core";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await login(email.trim(), password);

    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    navigate("/");
  }

  return (
    <Container size="xs" py="xl">
      <Paper withBorder shadow="sm" radius="md" p="lg">
        <form onSubmit={handleLogin}>
          <Stack gap="md">
            <div>
              <Title order={2}>Login</Title>
              <Text c="dimmed" size="sm">
                Login to see and create tweets
              </Text>
            </div>

            {error && (
              <Alert color="red" title="Login failed">
                {error}
              </Alert>
            )}

            <TextInput
              label="Email"
              placeholder="user@example.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />

            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <Button type="submit" loading={isLoading}>
              Login
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}