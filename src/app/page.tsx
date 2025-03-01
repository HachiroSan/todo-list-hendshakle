'use client';

import { TodoProvider } from "@/contexts/TodoContext";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";

export default function Home() {
  return (
    <TodoProvider>
      <main className="container mx-auto py-8 px-4 space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Todo List</h1>
        <div className="flex flex-col items-center gap-8">
          <TodoForm />
          <TodoList />
        </div>
      </main>
    </TodoProvider>
  );
}
