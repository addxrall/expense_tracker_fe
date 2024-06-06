import { Alert, Container, Divider, Grid, Text, Title } from "@mantine/core";
import ExpenseCard from "./ExpenseCard";
import { useGetCurrentUser, useGetExpensesByUserId } from "../../api/queries";
import { ID, UserExpenses } from "../../api/interfaces";
import { IconInfoCircle } from "@tabler/icons-react";

const Expenses = () => {
  const { userId } = useGetCurrentUser();
  const { data } = useGetExpensesByUserId(userId as ID);
  const userExpenses = data?.getExpensesByUserId;

  return (
    <Container fluid>
      <Title order={1}>Your Expenses</Title>
      <Text pt={5} pl={5} c="dimmed">
        Quick overview of your expenses
      </Text>
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
          userExpenses.map((item: UserExpenses) => {
            return (
              <Grid.Col span={4} key={item.id}>
                <ExpenseCard {...item} />
              </Grid.Col>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Expenses;
