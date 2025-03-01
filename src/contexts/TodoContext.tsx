'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '@/types/todo';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  removeTodo: (id: string) => void;
}

// Type for the stored todo data (where date is stored as string)
type StoredTodo = Omit<Todo, 'createdAt'> & {
  createdAt: string;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage on mount
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos) as StoredTodo[];
      // Convert string dates back to Date objects
      const todosWithDates = parsedTodos.map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
      setTodos(todosWithDates);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
} 