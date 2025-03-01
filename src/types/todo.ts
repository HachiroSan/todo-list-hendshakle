export type TodoType = 
  | "education"
  | "recreational"
  | "social"
  | "diy"
  | "charity"
  | "cooking"
  | "relaxation"
  | "music"
  | "busywork";

export interface Todo {
  id: string;
  activity: string;
  price: number;
  type: TodoType;
  bookingRequired: boolean;
  accessibility: number;
  createdAt: Date;
} 