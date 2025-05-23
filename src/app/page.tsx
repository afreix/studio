import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardPageContent } from "@/components/dashboard/dashboard-page";
import { PageHeader } from "@/components/layout/page-header";

export default function DashboardPage() {
  return (
    <SidebarInset>
      <PageHeader title="Dashboard" />
      <main className="flex-1 p-4 md:p-6">
        <DashboardPageContent />
      </main>
    </SidebarInset>
  );
}
