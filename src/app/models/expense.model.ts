import { Timestamp } from 'firebase/firestore';
export interface Expense {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: Timestamp;
  userId: string;
}
