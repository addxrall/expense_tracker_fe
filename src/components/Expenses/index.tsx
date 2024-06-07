import {
  Alert,
  Container,
  Divider,
  Grid,
  Group,
  Text,
  Title,
  Button,
} from "@mantine/core";
import { IconPencilPlus } from "@tabler/icons-react";
import ExpenseCard from "./ExpenseCard";
import { useGetCurrentUser, useGetExpensesByUserId } from "../../api/queries";
import { ID, UserExpense } from "../../api/interfaces";
import { IconInfoCircle } from "@tabler/icons-react";
import AddExpenseModal from "./AddExpenseModal";
import { useDisclosure } from "@mantine/hooks";

const Expenses = () => {
  const { userId } = useGetCurrentUser();
  const { data, refetch } = useGetExpensesByUserId(userId as ID);
  const userExpenses = data?.getExpensesByUserId;
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Container fluid>
        <Title order={1}>Your Expenses</Title>
        <Group justify="space-between">
          <Text pt={5} pl={5} c="dimmed">
            Quick overview of your expenses
          </Text>
          <Button leftSection={<IconPencilPlus size={15} />} onClick={open}>
            Add Expense
          </Button>
        </Group>
        <Divider my={10} />
        {!userExpenses && (
          <Alert
            variant="light"
            color="teal.5"
            title="No Expenses to Display"
            icon={<IconInfoCircle />}
          >
            You currently don't have any expenses. Create some expenses and they
            will appear here.
          </Alert>
        )}

        <Grid gutter={30}>
          {userExpenses &&
            userExpenses.map((item: UserExpense) => {
              return (
                <Grid.Col span={4} key={item.id}>
                  <ExpenseCard {...item} />
                </Grid.Col>
              );
            })}
        </Grid>
      </Container>
      <AddExpenseModal opened={opened} close={close} refetch={refetch} />
    </>
  );
};

export default Expenses;
