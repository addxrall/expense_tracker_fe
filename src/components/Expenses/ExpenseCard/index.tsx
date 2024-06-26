import {
  Card,
  Text,
  Group,
  Badge,
  NumberFormatter,
  ActionIcon,
  Menu,
  rem,
} from "@mantine/core";
import { IconDotsVertical, IconPencil, IconTrash } from "@tabler/icons-react";
import { GetExpensesByUserIdData, ID } from "../../../api/interfaces";
import { useDeleteExpenseMutation } from "../../../api/mutations";
import { notifications } from "@mantine/notifications";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import moment from "moment";
import EditExpenseModal from "../EditExpenseModal";
import { useDisclosure } from "@mantine/hooks";

interface ExpenseCardProps {
  id: ID;
  name: string;
  description: string;
  amount: number;
  tags: string[];
  updatedAt: string;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetExpensesByUserIdData>>;
}

export default function ExpenseCard(Props: ExpenseCardProps) {
  const { id, name, amount, description, tags, updatedAt, refetch } = Props;
  const [deleteExpense] = useDeleteExpenseMutation();
  const [opened, { open, close }] = useDisclosure(false);

  const handleDeleteExpense = async (id: ID) => {
    try {
      const { data } = await deleteExpense({
        variables: {
          deleteExpenseId: id,
        },
      });
      notifications.show({
        title: data?.deleteExpense.expense.name,
        message: data?.deleteExpense.message,
        autoClose: 3000,
        withCloseButton: true,
        withBorder: true,
        color: "teal",
        radius: "sm",
      });
      refetch();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: `${error}`,
        autoClose: 5000,
        withCloseButton: true,
        withBorder: true,
        color: "red",
        radius: "sm",
      });
    }
  };

  const expenseTags = tags.map((badge) => (
    <Badge variant="light" key={badge}>
      {badge}
    </Badge>
  ));

  return (
    <>
      <Card withBorder padding="md" mih={210}>
        <Group justify="space-between">
          <Text fz="lg" fw={700}>
            {name}
          </Text>

          <Menu
            position="right-start"
            offset={6}
            withArrow
            arrowPosition="center"
          >
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDotsVertical />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={open}
                leftSection={
                  <IconPencil style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Edit this expense
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={
                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={() => handleDeleteExpense(id)}
              >
                Delete this expense
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>

        <Badge mt="md">
          $
          <NumberFormatter
            thousandSeparator="."
            decimalSeparator=","
            value={amount}
          />
        </Badge>

        <Text mt="sm" mb="md">
          {description}
        </Text>

        <Card.Section px="md">
          <Group gap={7}>{expenseTags}</Group>
        </Card.Section>

        <Card.Section p="md" pos="absolute" bottom={10} right={10}>
          <Text fz={14} c="dimmed">
            {moment(updatedAt).fromNow()}
          </Text>
        </Card.Section>
      </Card>

      <EditExpenseModal
        opened={opened}
        close={close}
        expenseId={id}
        {...Props}
      />
    </>
  );
}
