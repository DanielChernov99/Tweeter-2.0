import { Container, Stack, Notification, Loader } from "@mantine/core";
import TweetsContainer from "../components/TweetsContainer";
import NewTweetBox from "../components/NewTweetBox";
import { CheckCircleIcon, XCircleIcon } from "@phosphor-icons/react";
import { useTweets } from "../context/TweetsContext";

export default function HomePage() {
    const { isFetchingTweets, notification, clearNotification } = useTweets();

    function renderNotification() {
        if (!notification) {
            return null;
        }

        if (notification.type === "loading") {
        return (
            <Notification
            loading
            withCloseButton={false}
            color="teal"
            radius="lg"
            title={notification.title}
            >
            {notification.message}
            </Notification>
        );
        }

        if (notification.type === "success") {
        return (
            <Notification
            icon={<CheckCircleIcon size={24} weight="fill" />}
            color="teal"
            title={notification.title}
            onClose={clearNotification}
            >
            {notification.message}
            </Notification>
        );
        }

        if (notification.type === "error") {
        return (
            <Notification
            icon={<XCircleIcon size={24} weight="fill" />}
            color="red"
            title={notification.title}
            onClose={clearNotification}
            >
            {notification.message}
            </Notification>
        );
        }

        return null;
    }

  return (
    <Container size="sm" py="xl">
      <Stack gap="md">
        <NewTweetBox />

        {renderNotification()}

        {isFetchingTweets ? <Loader /> : <TweetsContainer />}
      </Stack>
    </Container>
  );
}