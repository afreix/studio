
"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import type { Event } from '@/types';
import { Activity } from 'lucide-react';

interface EventListItemProps {
  event: Event;
}

export function EventListItem({ event }: EventListItemProps) {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(() => {
    // This ensures format() runs only on the client, after initial hydration
    setFormattedDate(format(event.ts, "MMM d, yyyy 'at' h:mm a"));
  }, [event.ts]); // event.ts is a Date object, re-run if it changes

  return (
    <li className="flex items-start space-x-3 p-3 bg-card-foreground/5 rounded-md">
      <Activity className="h-5 w-5 text-accent mt-1" />
      <div>
        <p className="text-sm font-medium text-foreground">
          <span className="font-semibold capitalize">{event.source}:</span> {event.type.replace(/_/g, ' ')}
        </p>
        <p className="text-xs text-muted-foreground">
          {formattedDate !== null ? formattedDate : 'Processing date...'}
        </p>
        {/* Uncomment below if you want to display the payload */}
        {/* <pre className="text-xs text-muted-foreground mt-1 bg-background p-1 rounded-md overflow-x-auto">{JSON.stringify(event.payload, null, 2)}</pre> */}
      </div>
    </li>
  );
}
