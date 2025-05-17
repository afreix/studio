
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 md:p-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
      </div>
      {/* Placeholder for potential actions */}
    </div>
  );
}
