import { useState } from "react";
import { Container, Stack, Title, TextInput, Button, Group, Text } from "@mantine/core";

export default function UserPage({ userName, changeName }) {
  const [input, setInput] = useState(userName);
  const [error, setError] = useState("");

  function handleSave() {
    const success = changeName(input);

    if (!success) {
      setError("Username cannot be empty or contain numbers");
      return;
    }

    setError("");
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <Title>Profile</Title>

        <Text>
          Current username: {userName}
        </Text>

        <TextInput
          label="User Name"
          value={input}
          error={error}
          onChange={(event) => setInput(event.target.value)}
        />

        <Group justify="flex-end">
          <Button onClick={handleSave}>
            Save
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}