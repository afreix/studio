import { SidebarInset } from "@/components/ui/sidebar";
import { BuildsPageContent } from "@/components/builds/builds-page";
import { PageHeader } from "@/components/layout/page-header";

export default function BuildsPage() {
  return (
    <SidebarInset>
      <PageHeader title="Builds Status" />
      <main className="flex-1 p-4 md:p-6">
        <BuildsPageContent />
      </main>
    </SidebarInset>
  );
}
