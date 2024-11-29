export interface Ticket {
  id: number;
  title: string;
  description: string;
  assignee: string;
  created_at: Date;
  closed_at: Date | null;
}
