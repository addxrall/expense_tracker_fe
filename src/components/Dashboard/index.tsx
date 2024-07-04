import { Text, Container, Divider, Group, Title, Flex } from "@mantine/core";
import StatsCard from "./StatsCard";
import { useGetCurrentUser, useGetExpensesByUserId } from "../../api/queries";
import { AreaChart } from "@mantine/charts";
import moment from "moment";
import { UserExpense } from "../../api/interfaces";

interface ChartExpense {
  date: string;
  [key: string]: string | number;
}

const Dashboard = () => {
  const { userId } = useGetCurrentUser();
  const { data } = useGetExpensesByUserId(userId as number);
  const userExpenses = data?.getExpensesByUserId;

  if (!userExpenses) return null;

  const totalAmountOfExpenses = userExpenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  const transformedExpense = (expenses: UserExpense[]): ChartExpense[] => {
    const res: { [key: string]: { [key: string]: number } } = {};

    expenses.forEach(({ amount, createdAt }: UserExpense) => {
      const fdate = moment(createdAt).format("MM.DD.YY");

      if (!res[fdate]) {
        res[fdate] = { Expense: 0 };
      }

      res[fdate]["Expense"] += amount;
    });

    return Object.keys(res).map((date) => ({
      date,
      ...res[date],
    }));
  };

  const expensesChart = transformedExpense(userExpenses);

  return (
    <Container fluid>
      <Title order={1}>Dashboard</Title>
      <Group justify="space-between">
        <Text pt={5} pl={5} c="dimmed">
          Your statistics
        </Text>
      </Group>
      <Divider my={10} />
      <AreaChart
        p="xl"
        h={300}
        series={[{ name: "Expense", color: "teal.6" }]}
        data={expensesChart}
        dataKey="date"
      />
      <Flex w="100%" justify="start" align="center">
        {totalAmountOfExpenses && (
          <StatsCard title="Total Expenses" amount={totalAmountOfExpenses} />
        )}
      </Flex>
    </Container>
  );
};

export default Dashboard;
