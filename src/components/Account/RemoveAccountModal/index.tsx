import { Button, Modal, Group, Alert, Text } from "@mantine/core";
import { useRemoveUserAccount } from "../../../api/mutations";
import { ID } from "../../../api/interfaces";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../../../utils/AuthContext/AuthContext";

interface RemoveAccountModalProps {
  opened: boolean;
  close: () => void;
  userId: ID;
}

const RemoveAccountModal = ({
  opened,
  close,
  userId,
}: RemoveAccountModalProps) => {
  const [removeUserAccountMutation] = useRemoveUserAccount();
  const { logout } = useAuth();

  const handleDeleteAccount = async () => {
    try {
      const { data } = await removeUserAccountMutation({
        variables: {
          userId: userId,
        },
      });
      notifications.show({
        message: data?.removeUserAccount.message,
        autoClose: 5000,
        withCloseButton: true,
        withBorder: true,
        color: "teal",
        radius: "sm",
      });
      logout();
      close();
    } catch (error) {
      console.error("Error deleting user account:", error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Remove User Account"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <Alert title="This action is irreversible." color="red">
        This operation will permanently remove your user account.
      </Alert>
      <Text ta="center" pt={10}>
        Do you want to continue?
      </Text>
      <Group justify="end" mt={20}>
        <Button variant="default" onClick={close}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDeleteAccount}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default RemoveAccountModal;
