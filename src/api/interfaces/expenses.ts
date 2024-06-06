export interface UserExpenses {
  id: string;
  name: string;
  description: string;
  amount: number;
  tags: string[];
}

export interface GetExpensesByUserIdData {
  getExpensesByUserId: UserExpenses[];
}
