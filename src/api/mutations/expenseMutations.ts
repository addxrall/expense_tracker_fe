import { gql, useMutation } from "@apollo/client";
import {
  CreateExpenseData,
  CreateExpenseInput,
  DeleteExpenseMutation,
  UpdateExpenseInput,
  UpdateExpenseMutation,
} from "../interfaces";

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

export const DELETE_EXPENSE = gql`
  mutation DeleteExpense($deleteExpenseId: String!) {
    deleteExpense(id: $deleteExpenseId) {
      message
      expense {
        name
      }
    }
  }
`;

export const UPDATE_EXPENSE = gql`
  mutation Mutation($input: UpdateExpenseInput!, $expenseId: String!) {
    updateExpense(input: $input, expenseId: $expenseId) {
      name
    }
  }
`;

export const useCreateExpenseMutation = () =>
  useMutation<CreateExpenseData, CreateExpenseInput>(CREATE_EXPENSE);

export const useDeleteExpenseMutation = () =>
  useMutation<DeleteExpenseMutation>(DELETE_EXPENSE);

export const useUpdateExpenseMutation = () =>
  useMutation<UpdateExpenseMutation, UpdateExpenseInput>(UPDATE_EXPENSE);
