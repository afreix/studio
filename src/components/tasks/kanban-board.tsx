
import type { Task, TaskStatus } from '@/types';
import { TaskCard } from '@/components/tasks/task-card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface KanbanBoardProps {
  tasks: Task[];
}

const columns: { title: string; status: TaskStatus }[] = [
  { title: 'To Do', status: 'TODO' },
  { title: 'In Progress', status: 'IN_PROGRESS' },
  { title: 'Done', status: 'DONE' },
];

export function KanbanBoard({ tasks }: KanbanBoardProps) {
  return (
    <ScrollArea className="w-full h-full pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 min-w-[800px] md:min-w-full">
            {columns.map(column => (
            <div key={column.status} className="bg-card-foreground/5 p-4 rounded-lg shadow-sm flex-1">
                <h3 className="text-lg font-semibold mb-4 text-foreground">{column.title}</h3>
                <div className="space-y-3 h-[calc(100vh-20rem)] overflow-y-auto pr-1"> {/* Adjust height as needed */}
                {tasks
                    .filter(task => task.status === column.status)
                    .map(task => (
                    <TaskCard key={task.id} task={task} />
                    ))}
                {tasks.filter(task => task.status === column.status).length === 0 && (
                    <p className="text-sm text-muted-foreground italic">No tasks here.</p>
                )}
                </div>
            </div>
            ))}
        </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
