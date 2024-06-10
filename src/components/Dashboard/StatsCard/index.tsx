import { Card, NumberFormatter, Progress, Text } from "@mantine/core";

type Props = {
  title: string;
  amount: number;
};

const StatsCard = ({ amount, title }: Props) => {
  return (
    <Card
      withBorder
      radius="sm"
      padding="sm"
      bg="var(--mantine-color-dark-6)"
      w={400}
    >
      <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
        {title}
      </Text>
      <Text fz="50" fw={500}>
        $
        <NumberFormatter
          thousandSeparator="."
          decimalSeparator=","
          value={amount}
        />
      </Text>
    </Card>
  );
};

export default StatsCard;
