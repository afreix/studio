import { SidebarInset } from "@/components/ui/sidebar";
import { TasksKanbanPageContent } from "@/components/tasks/tasks-kanban-page";
import { PageHeader } from "@/components/layout/page-header";

export default function TasksPage() {
  return (
    <SidebarInset>
      <PageHeader title="Tasks Kanban" />
      <main className="flex-1">
        <TasksKanbanPageContent />
      </main>
    </SidebarInset>
  );
}
