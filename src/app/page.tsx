'use client';

import { TodoProvider } from "@/contexts/TodoContext";
import { TodoForm } from "@/components/TodoForm";
import { TodoList } from "@/components/TodoList";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <TodoProvider>
      <div className="min-h-screen flex flex-col">
        <header className="container mx-auto py-4 px-4 flex justify-end">
          <ThemeToggle />
        </header>
        <main className="container mx-auto py-8 px-4 space-y-8 flex-1">
          <h1 className="text-4xl font-bold text-center mb-8">Todo List</h1>
          <div className="flex flex-col items-center gap-8">
            <TodoForm />
            <TodoList />
          </div>
        </main>
        <footer className="py-6 text-center text-xs text-muted-foreground">
          <a 
            href="https://github.com/HachiroSan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            Made with ❤️ by Farhad
          </a>
        </footer>
      </div>
    </TodoProvider>
  );
}
