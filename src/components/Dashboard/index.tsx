import { Text, Container, Divider, Group, Title, Flex } from "@mantine/core";
import StatsCard from "./StatsCard";
import { useGetCurrentUser, useGetExpensesByUserId } from "../../api/queries";

const Dashboard = () => {
  const { userId } = useGetCurrentUser();
  const { data } = useGetExpensesByUserId(userId as number);

  const totalAmountOfExpenses = data?.getExpensesByUserId?.reduce(
    (total, expense) => {
      return total + expense.amount;
    },
    0
  );

  return (
    <Container fluid>
      <Title order={1}>Dashboard</Title>
      <Group justify="space-between">
        <Text pt={5} pl={5} c="dimmed">
          Your statistics
        </Text>
      </Group>
      <Divider my={10} />
      <Flex w="100%" justify="start" align="center">
        {totalAmountOfExpenses && (
          <StatsCard title="Total Expenses" amount={totalAmountOfExpenses} />
        )}
      </Flex>
    </Container>
  );
};

export default Dashboard;
