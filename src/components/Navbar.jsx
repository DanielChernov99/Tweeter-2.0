import { NavLink, useNavigate } from "react-router";
import { Paper, Group, Text, Button } from "@mantine/core";
import classes from "../styles/NavBar.module.css";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <Paper shadow="xs" radius={0} p="md" withBorder>
      <Group justify="space-between">
        <Text fw={700} size="lg">
          Tweeter
        </Text>

        <Group gap="xs">
          {isAuthenticated && (
            <>
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
                to="/UserPage"
                variant="subtle"
                className={classes.link}
              >
                Profile
              </Button>

              <Button variant="light" color="red" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}

          {!isAuthenticated && (
            <Button
              component={NavLink}
              to="/login"
              variant="subtle"
              className={classes.link}
            >
              Login
            </Button>
          )}
        </Group>
      </Group>
    </Paper>
  );
}