import { NavLink } from "react-router";
import { Paper, Group, Text, Button } from "@mantine/core";
import classes from "../styles/NavBar.module.css";

export default function NavBar() {
  return (
    <Paper shadow="xs" radius={0} p="md" withBorder>
      <Group justify="space-between">
        <Text fw={700} size="lg">
          Tweeter
        </Text>

        <Group gap="xs">
          <Button
            component={NavLink}
            to="/"
            end
            variant="subtle"
            className={classes.link}
          >
            Home
          </Button>

          <Button
            component={NavLink}
            to="/user"
            variant="subtle"
            className={classes.link}
          >
            User
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}