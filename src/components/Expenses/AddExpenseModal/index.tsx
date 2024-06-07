import {
  Button,
  TagsInput,
  Group,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetCurrentUser } from "../../../api/queries";
import { useCallback, useEffect } from "react";
import { useCreateExpenseMutation } from "../../../api/mutations";
import {
  CreateExpense,
  GetExpensesByUserIdData,
} from "../../../api/interfaces";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import { notifications } from "@mantine/notifications";

interface LogoutModalProps {
  opened: boolean;
  close: () => void;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetExpensesByUserIdData>>;
}

const AddExpenseModal = ({ opened, close, refetch }: LogoutModalProps) => {
  const { userId } = useGetCurrentUser();
  const [createExpense] = useCreateExpenseMutation();

  const form = useForm<CreateExpense>({
    mode: "uncontrolled",
    initialValues: {
      amount: 0,
      description: "",
      name: "",
      tags: [],
      userId: userId,
    },

    validate: {
      name: (value) =>
        value.length < 3 ? "Name must have at least 3 letters" : null,
      description: (value) =>
        value.length < 3 ? "Description must have at least 3 letters" : null,
      amount: (value) => (value === 0 ? "Amount cannot be empty" : null),
    },
  });

  useEffect(() => {
    if (userId) {
      form.setFieldValue("userId", userId);
    }
  }, [userId]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      form.onSubmit(async (values: CreateExpense) => {
        try {
          await createExpense({
            variables: {
              input: values,
            },
          });
          refetch();
          form.reset();
          close();
          notifications.show({
            title: "Expense",
            message: "Created Successfully",
            autoClose: 4000,
            withCloseButton: true,
            withBorder: true,
            color: "teal",
            radius: "sm",
          });
        } catch (err: any) {
          throw new Error(err);
        }
      })();
    },
    [form]
  );

  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Add Expense"
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextInput
          withAsterisk
          mt="md"
          label="Name"
          placeholder="Name of your expense"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <NumberInput
          withAsterisk
          mt="md"
          label="Amount"
          placeholder="0"
          key={form.key("amount")}
          {...form.getInputProps("amount")}
        />
        <TextInput
          withAsterisk
          mt="md"
          label="Description"
          placeholder="description of your expense"
          key={form.key("description")}
          {...form.getInputProps("description")}
        />
        <TagsInput
          mt="md"
          label="Tags"
          placeholder="Tag"
          key={form.key("tags")}
          {...form.getInputProps("tags")}
        />

        <Group justify="flex-end" mt="lg">
          <Button type="submit">Add Expense</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddExpenseModal;
