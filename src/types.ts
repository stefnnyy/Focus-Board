export type ColumnType = 'Now' | 'Soon' | 'Later';

export interface Task {
  id: string;
  title: string;
  createdAt: number;
  column: ColumnType;
}
