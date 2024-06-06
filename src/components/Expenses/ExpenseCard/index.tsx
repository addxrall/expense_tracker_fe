import { Card, Text, Group, Badge } from "@mantine/core";

interface ExpenseCardProps {
  id: string;
  name: string;
  description: string;
  amount: number;
  tags: string[];
}

export default function ExpenseCard(Props: ExpenseCardProps) {
  const { name, amount, description, tags } = Props;
  const expenseTags = tags.map((badge) => (
    <Badge variant="light" key={badge}>
      {badge}
    </Badge>
  ));

  return (
    <Card withBorder padding="lg">
      <Group justify="space-between">
        <Text fz="lg" fw={700}>
          {name}
        </Text>
        <Group gap={5}>
          <Text fz="xs" c="dimmed">
            Expense amount
          </Text>
          <Badge>{amount}</Badge>
        </Group>
      </Group>
      <Text mt="sm" mb="md">
        {description}
      </Text>
      <Card.Section p="md">
        <Group gap={7} mt={5}>
          {expenseTags}
        </Group>
      </Card.Section>
    </Card>
  );
}
