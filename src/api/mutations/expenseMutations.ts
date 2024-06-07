import { gql, useMutation } from "@apollo/client";
import { CreateExpenseData, CreateExpenseInput } from "../interfaces";

export const CREATE_EXPENSE = gql`
  mutation Mutation($input: ExpenseInput!) {
    createExpense(input: $input) {
      amount
      description
      id
      name
      tags
    }
  }
`;

export const useCreateExpenseMutation = () =>
  useMutation<CreateExpenseData, CreateExpenseInput>(CREATE_EXPENSE);
