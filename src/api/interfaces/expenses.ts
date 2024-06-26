import { ID } from "./auth";
export interface UserExpense {
  id: ID;
  name: string;
  description: string;
  amount: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetExpensesByUserIdData {
  getExpensesByUserId: UserExpense[];
}

export interface CreateExpense {
  userId: ID | undefined;
  name: string;
  description: string;
  amount: number;
  tags: string[];
}

export interface CreateExpenseData {
  createExpense: CreateExpense;
}

export interface CreateExpenseInput {
  input: CreateExpense;
}

export interface DeleteExpenseMutation {
  deleteExpense: {
    message: string;
    expense: UserExpense;
  };
}

export interface UpdateExpenseInput {
  input: CreateExpense;
  expenseId: ID;
}

export interface UpdateExpenseMutation {
  updateExpense: {
    name: string;
  };
}
