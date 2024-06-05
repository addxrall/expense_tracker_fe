import { Text, Button, Flex, Container, Title } from "@mantine/core";
import { useGetCurrentUser } from "../../api/queries";
import { useDisclosure } from "@mantine/hooks";
import RemoveAccountModal from "./RemoveAccountModal";

const Account = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useGetCurrentUser();
  const userId = data?.currentUser.userId;

  return (
    <>
      <Container pt={50} fluid>
        <Title order={3}>User Account Settings</Title>
        <Flex
          pt={20}
          gap="md"
          justify="space-between"
          align="center"
          direction="row"
          wrap="wrap"
        >
          <Text size="md">Delete user account</Text>
          <Button color="red" onClick={open}>
            Delete Account
          </Button>
        </Flex>
      </Container>
      {userId && (
        <RemoveAccountModal opened={opened} close={close} userId={userId} />
      )}
    </>
  );
};

export default Account;
