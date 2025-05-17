
import type { Task } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, CalendarDays } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const getStatusVariant = (status: Task['status']) => {
    switch (status) {
      case 'TODO': return 'secondary';
      case 'IN_PROGRESS': return 'default';
      case 'DONE': return 'outline'; // Using outline for a less prominent "done"
      default: return 'default';
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 bg-card">
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base font-semibold leading-tight">{task.title}</CardTitle>
          <Badge variant={getStatusVariant(task.status)} className="text-xs capitalize whitespace-nowrap">
            {task.status.replace('_', ' ').toLowerCase()}
          </Badge>
        </div>
      </CardHeader>
      {task.description && (
        <CardContent className="py-2 px-4">
          <CardDescription className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </CardDescription>
        </CardContent>
      )}
      <CardFooter className="text-xs text-muted-foreground pt-2 pb-3 px-4 flex justify-between items-center">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Created {formatDistanceToNow(task.createdAt, { addSuffix: true })}</span>
        </div>
        {task.dueAt && (
          <div className="flex items-center gap-1">
            <CalendarDays className="h-3 w-3" />
            <span>Due {format(task.dueAt, 'MMM d')}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
