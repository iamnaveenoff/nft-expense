export interface Expense {
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Date;
  userId: string;
}
