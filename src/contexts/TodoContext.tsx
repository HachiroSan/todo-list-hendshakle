'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '@/types/todo';

/**
 * Interface defining the shape of our todo context
 * Provides the necessary methods and state for managing todos
 */
interface TodoContextType {
  /** Array of all todo items */
  todos: Todo[];
  /** Function to add a new todo item */
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
  /** Function to remove a todo item by its ID */
  removeTodo: (id: string) => void;
}

// Create the context with undefined as initial value
const TodoContext = createContext<TodoContextType | undefined>(undefined);

/**
 * Provider component that wraps the app and provides todo functionality
 * Handles state management and persistence of todos
 */
export function TodoProvider({ children }: { children: React.ReactNode }) {
  // State to hold all todos
  const [todos, setTodos] = useState<Todo[]>([]);

  // Load todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      const parsedTodos = JSON.parse(storedTodos);
      // Convert string dates back to Date objects
      const todosWithDates = parsedTodos.map((todo: any) => ({
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

  /**
   * Adds a new todo to the list
   * Automatically generates an ID and timestamp
   */
  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt'>) => {
    const newTodo: Todo = {
      ...todoData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  /**
   * Removes a todo from the list by its ID
   * Filters out the todo with the matching ID
   */
  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

/**
 * Custom hook to use the todo context
 * Ensures the context is being used within a provider
 * @throws {Error} If used outside of a TodoProvider
 */
export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
} 