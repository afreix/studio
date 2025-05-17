
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { BuildStatus, BuildState } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { CheckCircle2, XCircle, Loader2, ExternalLink } from 'lucide-react';

interface BuildsTableProps {
  builds: BuildStatus[];
}

const getStateIcon = (state: BuildState) => {
  switch (state) {
    case 'SUCCESS':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'FAILURE':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'PENDING':
      return <Loader2 className="h-4 w-4 text-yellow-500 animate-spin" />;
    default:
      return null;
  }
};

const getStateBadgeVariant = (state: BuildState): "default" | "secondary" | "destructive" | "outline" => {
  switch (state) {
    case 'SUCCESS':
      return 'outline'; 
    case 'FAILURE':
      return 'destructive';
    case 'PENDING':
      return 'secondary';
    default:
      return 'default';
  }
}

export function BuildsTable({ builds }: BuildsTableProps) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">State</TableHead>
              <TableHead>Commit SHA</TableHead>
              <TableHead>Repository</TableHead>
              <TableHead>Workflow</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {builds.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                  No builds match your criteria.
                </TableCell>
              </TableRow>
            ) : (
              builds.map((build) => (
                <TableRow key={build.id} className="hover:bg-muted/50">
                  <TableCell>
                    <Badge variant={getStateBadgeVariant(build.state)} className="capitalize text-xs">
                      <span className="mr-1.5">{getStateIcon(build.state)}</span>
                      {build.state.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{build.commitSha.substring(0, 7)}</TableCell>
                  <TableCell>{build.repoName || 'N/A'}</TableCell>
                  <TableCell>{build.workflowName || 'N/A'}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDistanceToNow(build.createdAt, { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={build.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
                      View <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

// Need to import Card components if not globally available
import { Card, CardContent } from "@/components/ui/card";
