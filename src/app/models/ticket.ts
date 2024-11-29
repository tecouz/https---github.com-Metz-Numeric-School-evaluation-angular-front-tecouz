export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: 'open' | 'closed' | 'in_progress';
  assignee: string;
  created_at: Date;
  updated_at: Date;
}
