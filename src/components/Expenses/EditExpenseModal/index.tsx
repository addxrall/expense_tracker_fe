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
import {
  CreateExpense,
  GetExpensesByUserIdData,
  ID,
  UserExpense,
} from "../../../api/interfaces";
import { OperationVariables, ApolloQueryResult } from "@apollo/client";
import { useCallback } from "react";
import { notifications } from "@mantine/notifications";
import { useUpdateExpenseMutation } from "../../../api/mutations";

interface LogoutModalProps {
  opened: boolean;
  close: () => void;
  expenseId: ID;
  name: string;
  description: string;
  amount: number;
  tags: string[];
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<GetExpensesByUserIdData>>;
}

const EditExpenseModal = ({
  opened,
  close,
  amount,
  description,
  name,
  tags,
  expenseId,
  refetch,
}: LogoutModalProps) => {
  const { userId } = useGetCurrentUser();
  const [updateExpense] = useUpdateExpenseMutation();

  const form = useForm<CreateExpense>({
    mode: "uncontrolled",
    initialValues: {
      amount: amount,
      description: description,
      name: name,
      tags: tags,
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

  const handleExpenseEdit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      form.onSubmit(async (values: any) => {
        try {
          const { data } = await updateExpense({
            variables: {
              input: values,
              expenseId: expenseId,
            },
          });
          refetch();
          close();
          notifications.show({
            title: data?.updateExpense.name,
            message: "Updated Successfully",
            autoClose: 4000,
            withCloseButton: true,
            withBorder: true,
            color: "teal",
            radius: "sm",
          });
        } catch (err: any) {
          notifications.show({
            title: "Error",
            message: `${err}`,
            autoClose: 5000,
            withCloseButton: true,
            withBorder: true,
            color: "red",
            radius: "sm",
          });
        }
      })();
    },
    [form]
  );

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Edit ${name}`}
      centered
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 3,
      }}
    >
      <form onSubmit={handleExpenseEdit}>
        <TextInput
          mt="md"
          label="Name"
          placeholder="Name of your expense"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />
        <NumberInput
          mt="md"
          label="Amount"
          placeholder="0"
          key={form.key("amount")}
          {...form.getInputProps("amount")}
        />
        <TextInput
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
          <Button type="submit">Edit</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditExpenseModal;
