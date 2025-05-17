import { SidebarInset } from "@/components/ui/sidebar";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

export default function PracticePage() {
  return (
    <SidebarInset>
      <PageHeader title="Practice Sessions" />
      <main className="flex-1 p-4 md:p-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Dumbbell className="h-6 w-6 mr-2 text-primary" />
              Practice Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This section is currently under development.
            </p>
            <p className="mt-2">
              Future features for tracking practice sessions will be available here.
            </p>
          </CardContent>
        </Card>
      </main>
    </SidebarInset>
  );
}
