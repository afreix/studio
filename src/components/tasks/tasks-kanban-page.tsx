
"use client";

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { KanbanBoard } from "@/components/tasks/kanban-board";
import { NewTaskDialog } from "@/components/tasks/new-task-dialog";
import { mockTasks } from "@/lib/mock-data";
import type { Task, TaskDomain } from "@/types";

export function TasksKanbanPageContent() {
  const [activeTab, setActiveTab] = useState<TaskDomain>("dev");
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
    const createdTask: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
      status: 'TODO',
    };
    setTasks(prevTasks => [createdTask, ...prevTasks]);
  };
  
  const devTasks = tasks.filter(task => task.domain === 'dev');
  const lifeTasks = tasks.filter(task => task.domain === 'life');

  return (
    <div className="flex flex-col h-full p-4 md:p-6">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TaskDomain)} className="flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="dev">Development</TabsTrigger>
            <TabsTrigger value="life">Life Admin</TabsTrigger>
          </TabsList>
          <Button onClick={() => setIsNewTaskDialogOpen(true)} size="sm" className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
        <TabsContent value="dev" className="flex-grow mt-0">
          <KanbanBoard tasks={devTasks} />
        </TabsContent>
        <TabsContent value="life" className="flex-grow mt-0">
          <KanbanBoard tasks={lifeTasks} />
        </TabsContent>
      </Tabs>
      <NewTaskDialog
        isOpen={isNewTaskDialogOpen}
        onClose={() => setIsNewTaskDialogOpen(false)}
        onSave={handleAddTask}
        defaultDomain={activeTab}
      />
    </div>
  );
}
