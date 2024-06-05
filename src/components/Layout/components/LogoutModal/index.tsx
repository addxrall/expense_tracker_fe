import { Button, Group, Modal } from "@mantine/core";
import { useAuth } from "../../../../utils/AuthContext/AuthContext";
import { notifications } from "@mantine/notifications";

interface LogoutModalProps {
  opened: boolean;
  close: () => void;
}

const LogoutModal = ({ opened, close }: LogoutModalProps) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    notifications.show({
      message: "Logout Successfull",
      autoClose: 2000,
      withCloseButton: false,
      withBorder: true,
      color: "teal",
      radius: "sm",
    });
    logout();
    close();
  };
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Logout"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      Are you sure you want to logout?
      <Group justify="end" mt={20}>
        <Button variant="default" onClick={close}>
          Cancel
        </Button>
        <Button
          variant="outline"
          color="red"
          onClick={() => {
            handleLogout();
          }}
        >
          Logout
        </Button>
      </Group>
    </Modal>
  );
};

export default LogoutModal;
