'use client';

import { useTodo } from "@/contexts/TodoContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export function TodoList() {
  const { todos, removeTodo } = useTodo();

  const handleRemove = (id: string, activity: string) => {
    removeTodo(id);
    toast.success("Todo removed", {
      description: `Removed "${activity}" from your todo list`,
    });
  };

  if (todos.length === 0) {
    return (
      <Card className="w-full max-w-xl">
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No todos yet. Add one above!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Todos</CardTitle>
        <Badge variant="secondary">{todos.length} items</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="space-y-1">
              <h3 className="font-medium">{todo.activity}</h3>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline">${todo.price.toFixed(2)}</Badge>
                <Badge>{todo.type}</Badge>
                {todo.bookingRequired && (
                  <Badge variant="destructive">Booking Required</Badge>
                )}
                <Badge variant="secondary">
                  Accessibility: {todo.accessibility.toFixed(2)}
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleRemove(todo.id, todo.activity)}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 