
"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckSquare, ShieldCheck, MessageSquare, Dumbbell, Settings, Workflow } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/builds', label: 'Builds', icon: ShieldCheck },
  { href: '/chat', label: 'Chat', icon: MessageSquare },
  { href: '/practice', label: 'Practice', icon: Dumbbell },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4 justify-center">
        <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Workflow className="h-7 w-7 text-primary" />
          <h1 className={cn(
            "text-xl font-semibold tracking-tight text-foreground whitespace-nowrap",
            "group-data-[collapsible=icon]:hidden"
            )}>
            PersonalOps
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className="w-full justify-start"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <Link href="/settings" legacyBehavior passHref>
            <SidebarMenuButton tooltip="Settings" className="w-full justify-start">
                <Settings className="h-5 w-5" />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
            </SidebarMenuButton>
         </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
