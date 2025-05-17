
"use client";

import { useState } from 'react';
import { mockBuilds } from '@/lib/mock-data';
import type { BuildStatus, BuildState } from '@/types';
import { BuildsTable } from '@/components/builds/builds-table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input';

export function BuildsPageContent() {
  const [builds, setBuilds] = useState<BuildStatus[]>(mockBuilds);
  const [filterState, setFilterState] = useState<BuildState | 'ALL'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuilds = builds
    .filter(build => filterState === 'ALL' || build.state === filterState)
    .filter(build => 
      build.commitSha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (build.repoName && build.repoName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (build.workflowName && build.workflowName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input 
          placeholder="Search by SHA, repo, or workflow..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={filterState} onValueChange={(value) => setFilterState(value as BuildState | 'ALL')}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by state" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All States</SelectItem>
            <SelectItem value="SUCCESS">Success</SelectItem>
            <SelectItem value="FAILURE">Failure</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <BuildsTable builds={filteredBuilds} />
    </div>
  );
}
